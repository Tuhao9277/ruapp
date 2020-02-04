import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtNavBar, AtButton, AtModal, AtFloatLayout, AtRadio, AtIcon } from 'taro-ui';
import { View, Text, Image } from '@tarojs/components';
import './orderSuc.less';
import orderAction from './../../actions/order';
import { PayStatus, OrderStatus } from '../../const/status';
import { OrderDetail } from './../../reducers/order';
import courierImg from './../../images/courier.png';
import api from './../../service/api';
import userAction from './../../actions/authAction';
import productAction from './../../actions/product';

import { formattedTime } from '../../utils/index';

type PageStateProps = {
  openid: string;
  currentOrder: OrderDetail;
  account: number;
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  isOopenModal: boolean;
  openPay: boolean;
  payLoading: boolean;
  payMethod: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
  state: PageState;
}

@connect(({ user, order }) => ({
  openid: user.openid,
  account: user.userInfo.account,
  currentOrder: order.currentOrderDetail,
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOopenModal: false,
      payLoading: false,
      openPay: false,
      payMethod: 'rupay',
    };
    userAction.getUserInfo({ openid: props.openid });
  }
  componentWillMount() {
    this.getOrderDetail();
  }
  getOrderDetail() {
    const { openid } = this.props;
    const { orderId } = this.$router.params;
    const params = { openid, orderId };
    orderAction.orderDetail(params);
  }
  hanldeRouterBack() {
    Taro.navigateBack();
  }
  renderDetailList(orderDetailList) {
    return orderDetailList.map(
      ({ productIcon, orderId, productName, productPrice, productQuantity }) => {
        return (
          <View className="productItemWrapper" key={orderId}>
            <Image className="foodOrderImg" mode="scaleToFill" src={productIcon} />
            <View className="foodOrderRight">
              <Text className="foodOrderName">{productName}</Text>
              <View className="foodOrderPrice">
                <Text>×{productQuantity}</Text>
                <Text>
                  ¥<Text className="foodOrderPriceHighLight">{productPrice}</Text>
                </Text>
              </View>
            </View>
          </View>
        );
      },
    );
  }
  showCancelOrderModal() {
    this.setState({
      isOopenModal: true,
    });
  }
  handleCancelOrder(orderId) {
    Taro.showLoading({
      title: '加载中',
    });
    const { openid } = this.props;

    const params = { openid, orderId };
    api.post('order/cancel', params).then(res => {
      if (res.data.code === 0) {
        Taro.hideLoading();
        this.handleCancel();
        Taro.showToast({
          title: '取消成功',
          icon: 'success',
        });
        this.getOrderDetail();
      }
    });
  }
  handleCancel() {
    this.setState({
      isOopenModal: false,
    });
  }
  handleClosePayMethod() {
    this.setState(prevState => ({
      openPay: !prevState.openPay,
    }));
  }
  handleChangePayMethod(value) {
    this.setState({
      payMethod: value,
    });
  }
  goToPay(orderId) {
    const { openid } = this.props;
    this.setState({
      payLoading: true,
    });
    if (this.state.payMethod !== 'rupay') {
      this.setState({
        payLoading: false,
      });
      Taro.showToast({
        title: '暂未开放',
        icon: 'none',
      });
      return;
    }
    const params = {
      openid,
      orderId,
    };
    api.post('order/pay', params).then(res => {
      this.setState({
        payLoading: false,
      });
      if (res.data.code === 0) {
        productAction.clearCar({});
        Taro.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1000,
        }).then(() => {
          setTimeout(() => {
            Taro.navigateBack();
          }, 1000);
        });
      }
    });
  }
  render() {
    const { currentOrder, account } = this.props;
    const {
      orderId,
      buyerName,
      buyerAddress,
      orderAmount,
      orderStatus,
      payStatus,
      orderDetailList,
      createTime,
    } = currentOrder;
    return (
      <View className="dd-padding orderResultWrapper">
        <AtNavBar
          onClickLeftIcon={this.hanldeRouterBack.bind(this)}
          color="#000"
          leftIconType="chevron-left"
        />
        <View>
          <View>
            <View className="detailTopWrapper">
              <Image src={courierImg} className="detailTopImg" mode="scaleToFill" />
              <View className="detailTopRightWrapper">
                <Text className="payStatusWrapper">{PayStatus[payStatus]}</Text>
                <Text className="orderStatusWrapper">{OrderStatus[orderStatus]}</Text>
                {payStatus === 1 && orderStatus === 0 && (
                  <View className="recallBtn">
                    <AtButton
                      onClick={() => this.showCancelOrderModal()}
                      circle
                      size="small"
                      customStyle={{ color: '#999' }}
                    >
                      申请退款
                    </AtButton>
                  </View>
                )}
                {payStatus === 0 && orderStatus === 0 && (
                  <View className="recallBtn">
                    <AtButton
                      onClick={() => this.handleClosePayMethod()}
                      circle
                      size="small"
                      type="secondary"
                    >
                      去支付
                    </AtButton>
                    <AtButton
                      onClick={() => this.showCancelOrderModal()}
                      circle
                      size="small"
                      customStyle={{ color: '#999' }}
                    >
                      取消订单
                    </AtButton>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <AtModal
          isOpened={this.state.isOopenModal}
          title="确定取消订单吗"
          cancelText="我再想想"
          confirmText="确定"
          onClose={this.handleCancel.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          onConfirm={() => this.handleCancelOrder(orderId)}
        />
        <View className="orderResultUserInfoWrapper">
          <View className="userInfoLeft">
            <Text className="userName">
              {buyerName}
              {/* <Text className="userPhone">13888888888</Text> */}
            </Text>
            <View className="userAddr">
              <AtIcon value="map-pin" size="18" />
              <Text className="userAddrText">{buyerAddress}</Text>
            </View>
          </View>
        </View>

        <View className="dd-padding detailContentWrapper">
          {this.renderDetailList(orderDetailList)}
          <View className="detailContentBottomWrapper">
            <View className="feeWrapper">
              <Text className="feeTip">配送费</Text>
              <Text>
                ¥ <Text className="fee">0</Text>
              </Text>
            </View>
            <Text className="totalPrice">
              ¥<Text className="orderAmoutWrapper">{orderAmount}</Text>
            </Text>
            <View className="couponResultWrapper">
              <View className="couponTopWrapper">
                <Text className="coupon">优惠券</Text>
                <Text className="couponColor">
                  -¥<Text className="couponAmount">0</Text>
                </Text>
              </View>
              <Text className="couponTip">无可用优惠券</Text>
            </View>
          </View>
          <View className="realPriceWrapper">
            <Text>
              实付：¥ <Text className="realPriceHighLight">{orderAmount}</Text>
            </Text>
          </View>
        </View>
        <View className="orderResultUserInfoWrapper">
          <View className="userInfoLeft">
            <Text className="userName">订单信息</Text>
            <View className="userOrderInfoWrapper">
              <Text className="orderIdWrapper">
                <View>订单号：</View> <View>{orderId}</View>
              </Text>
              <Text className="orderIdWrapper">
                <View>下单时间：</View>
                <View>{formattedTime(createTime)}</View>
              </Text>
            </View>
          </View>
        </View>
        <AtFloatLayout
          isOpened={this.state.openPay}
          title="请选择支付方式"
          onClose={this.handleClosePayMethod.bind(this)}
        >
          <AtRadio
            options={[
              { label: '支付宝', value: 'alipay' },
              { label: '微信支付', value: 'wechat' },
              { label: `儒币支付（余额：${account}）`, value: 'rupay' },
            ]}
            value={this.state.payMethod}
            onClick={this.handleChangePayMethod.bind(this)}
          />
          <AtButton
            loading={this.state.payLoading}
            className="shopBtn"
            type="primary"
            onClick={() => this.goToPay(orderId)}
          >
            立即支付
          </AtButton>
        </AtFloatLayout>
      </View>
    );
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>;
