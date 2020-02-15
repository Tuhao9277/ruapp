import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtIcon, AtButton, AtFloatLayout, AtRadio, AtInput } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { formatterTime } from './../../utils';
import './order.less';
import ANavBar from './../../components/ANavBar';
import userAction from './../../actions/authAction';
import api from './../../service/api';
import productAction from './../../actions/product';

type PageStateProps = {};

type PageDispatchProps = {};
interface OrderListItem {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  chooseCount: number;
}
interface Adderess {
  recId: string;
  buyerId: string;
  recName: string;
  recTelephone: string;
  recAddress: string;
}
type PageOwnProps = {
  currentOrder: {
    chooseList: OrderListItem[];
    totalPrice: number;
  };
  chooseList: OrderListItem[];
  account: number;
  openid: string;
  addressList: [];
  currentAddress: Adderess;
  buyerId: string;
};

type PageState = {
  fee: number;
  coupon: number;
  orderId: string;
  openPay: boolean;
  payMethod: string;
  payLoading: boolean;
  prePayLoading: boolean;
  psInfo: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Order {
  props: IProps;
  state: PageState;
}

@connect(({ order, user }) => ({
  currentOrder: order.currentOrder,
  chooseList: order.currentOrder.chooseList,
  account: user.userInfo.account,
  addressList: user.userInfo.addressList,
  currentAddress: user.currentAddress,
  buyerId: user.buyerId,
  openid: user.openid,
}))
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fee: 0,
      coupon: 0,
      openPay: false,
      payMethod: 'rupay',
      payLoading: false,
      orderId: '',
      prePayLoading: false,
      psInfo: '',
    };
    userAction.getUserInfo({ openid: props.openid });
    userAction.getUserAddress({ buyerId: props.buyerId });
  }

  //跳转到添加地址页
  handleToAddAddr() {
    Taro.navigateTo({
      url: '/pages/address/addressForm',
    });
  }
  // 更改支付方式
  handleChangePayMethod(value) {
    this.setState({
      payMethod: value,
    });
  }
  // 支付
  goToPay() {
    const { orderId } = this.state;
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
        Taro.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1000,
        }).then(() => {
          setTimeout(() => {
            Taro.redirectTo({
              url: `/pages/orderSuc/orderSuc?orderId=${orderId}`,
            });
          }, 1000);
        });
      }
    });
  }
  // 创建订单
  handlePayDisplay() {
    this.setState({
      prePayLoading: true,
    });
    const { openid, chooseList, currentAddress } = this.props;
    const { psInfo } = this.state;
    const items = chooseList.map(item => ({
      productId: item.id,
      productQuantity: item.chooseCount,
    }));
    const params = {
      recId: currentAddress.recId,
      openid,
      items,
      psInfo,
    };
    api.post('order/create', params).then(res => {
      productAction.clearCar({});
      this.setState({
        prePayLoading: false,
      });
      if (res.data.code === 0) {
        this.setState((prevState: PageState) => ({
          orderId: res.data.data.orderId,
          openPay: !prevState.openPay,
        }));
      }
    });
  }
  // 控制关闭订单页的回调
  handleClosePayMethod() {
    const { orderId } = this.state;
    Taro.redirectTo({
      url: `/pages/orderSuc/orderSuc?orderId=${orderId}`,
    });
  }
  handleToUpdateAddr() {
    Taro.navigateTo({
      url: '/pages/address/addressUpdateForm',
    });
  }
  handleChangeRemark(value) {
    this.setState({
      psInfo: value,
    });
  }
  // 渲染订单商品
  renderOrderProduct() {
    const { chooseList } = this.props.currentOrder;
    return chooseList.map(({ id, icon, name, description, price, chooseCount }) => {
      return (
        <View className="productItemWrapper" key={id}>
          <Image className="foodOrderImg" mode="scaleToFill" src={icon} />
          <View className="foodOrderRight">
            <Text className="foodOrderName">{name}</Text>
            <Text className="foodOrderDesc two-line">{description}</Text>
            <View className="foodOrderPrice">
              <Text>×{chooseCount}</Text>
              <Text>
                ¥<Text className="foodOrderPriceHighLight">{price}</Text>
              </Text>
            </View>
          </View>
        </View>
      );
    });
  }
  render() {
    const { currentOrder, account, currentAddress } = this.props;
    const { totalPrice } = currentOrder;
    return (
      <View>
        <ANavBar />
        <View className="dd-padding orderWrapper">
          <Text className="orderTitle">创建订单</Text>
          <View>
            <Text className="lastTime">约{formatterTime(Date.now() + 30 * 60 * 1000)}后送达</Text>
          </View>
          {currentAddress.recId ? (
            <View className="orderUserInfoWrapper" onClick={this.handleToUpdateAddr.bind(this)}>
              <View className="userInfoLeft">
                <Text className="userName">
                  {currentAddress.recName}
                  <Text className="userPhone">{currentAddress.recTelephone}</Text>
                </Text>
                <View className="userAddr">
                  <AtIcon value="map-pin" size="18" color="#fff" />
                  <Text className="userAddrText">{currentAddress.recAddress}</Text>
                </View>
              </View>
              <View className="userInfoRight">
                <AtIcon value="chevron-right" size="24" color="#fff" />
              </View>
            </View>
          ) : (
            <View className="noAddress">
              当前用户暂无收货地址，请先
              <Text className="noAddressLink" onClick={this.handleToAddAddr.bind(this)}>
                添加收货地址
              </Text>
            </View>
          )}
          <View className="dd-padding order">
            <View className="dd-padding">{this.renderOrderProduct()}</View>
            <View className="orderBottom">
              <View style="display:flex;justify-content:space-between">
                <Text className="feeTip">配送费</Text>
                <Text>
                  ¥ <Text className="fee"> {this.state.fee}</Text>
                </Text>
              </View>
              <Text className="totalPrice">
                ¥ <Text>{totalPrice + this.state.fee}</Text>
              </Text>
            </View>
            <View className="remark">
              <AtInput
                name="value"
                title="订单备注"
                type="text"
                placeholder="订单备注（选填）"
                value={this.state.psInfo}
                onChange={this.handleChangeRemark.bind(this)}
              />
            </View>
          </View>
          <View className="couponWrapper">
            <View className="couponTopWrapper">
              <Text className="coupon">优惠券</Text>
              <Text className="couponColor">
                -¥<Text className="couponAmount">{this.state.coupon}</Text>
              </Text>
            </View>
            <Text className="couponTip">新人特惠券</Text>
          </View>
        </View>
        <AtButton
          disabled={!currentAddress.recId}
          className="shopBtn"
          loading={this.state.prePayLoading}
          type="primary"
          onClick={this.handlePayDisplay.bind(this)}
        >
          需支付：¥{totalPrice + this.state.fee - this.state.coupon}
        </AtButton>
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
            onClick={() => this.goToPay()}
          >
            立即支付
          </AtButton>
        </AtFloatLayout>
      </View>
    );
  }
}
export default Order as ComponentClass<PageOwnProps, PageState>;
