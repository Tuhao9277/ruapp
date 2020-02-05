import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtCard } from 'taro-ui'
import './orderList.less';
import orderAction from '../../actions/order';
import { formattedTime } from './../../utils'
import { PayStatus, OrderStatus } from './../../const/status'

type PageStateProps = {
  openid: string;
  orderList: [];
};
interface IorderItem {
  orderId: string;
  buyerName: string;
  orderPhone: string;
  buyerAddress: string;
  orderAmount: number;
  orderStatus: number;
  payStatus: number;
  createTime: number;
}
type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface OrderList {
  props: IProps;
  state: PageState;
}
@connect(({ user, order }) => ({
  openid: user.openid,

  orderList: order.orderList,
}))
class OrderList extends Component {
  constructor(props) {
    super(props);
    if (props.openid) {
      this.getOrderList();
    }
  }

  getOrderList(page = 0, size = 10) {
    const params = {
      openid: this.props.openid,
      page,
      size,
    };
    orderAction.getorderList(params);
  }
  handleRouterToOrderDetail(orderId: string) {
    Taro.navigateTo({
      url: `/pages/orderSuc/orderSuc?orderId=${orderId}`,
    });
  }
  renderOrderList() {
    const { orderList } = this.props;
    return orderList.map((item: IorderItem) => {
      const { createTime, orderAmount, orderStatus, payStatus } = item;
      return (
        <AtCard
          onClick={() => this.handleRouterToOrderDetail(item.orderId)}
          key={item.orderId}
          className="orderItemWrapper"
          note={formattedTime(createTime)}
          extra={item.buyerAddress}
          title={`订单号：${item.orderId}`}
        >
          <View className="orderInfo">
            <Text className={payStatus === 0 ? 'orderPayTip' : ''}>{PayStatus[payStatus]}</Text>
            <Text className={orderStatus === 2 ? 'orderCancel' : ''}>
              {OrderStatus[orderStatus]}
            </Text>
          </View>
          {`共${orderAmount}元商品`}
        </AtCard>
      );
    });
  }
  render() {
    const {orderList} = this.props
    return (
      <View className="orderListWrapper">
        <Text className="dd-padding">订单</Text>
        {!orderList.length ? (
          <Text className="emptyOrderTip">当前没有订单，快去下单吧</Text>
        ) : (
          this.renderOrderList()
        )}
      </View>
    );
  }
}
export default OrderList as ComponentClass<PageOwnProps, PageState>;
