import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtTabs, AtTabsPane, AtFab, AtNoticebar, AtBadge, AtCard } from 'taro-ui';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { IproductList } from './../../reducers/productList';
import './menu.less';
import menuAction from '../../actions/product';
import orderAction from '../../actions/order';
import ProductItem from './../../components/ProductItem';
import shopPackageImg from './../../images/shopPackage.png';
import { OrderStatus, PayStatus } from './../../const/status';
import { formattedTime } from '../../utils/index';

export interface Ifood {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  chooseCount: number;
  index: number;
  outIndex: number;
}
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

type PageStateProps = {
  openid: string;
  shopCarData: [];
  productCategory: [];
  orderList: [];
  totalCount: number;
  activeKey: number;
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  current: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Menu {
  props: IProps;
  state: PageState;
}
@connect(({ product, user, order }) => ({
  openid: user.openid,
  shopCarData: product.shopCarData,
  totalCount: product.totalCount,
  productCategory: product.productCategory,
  activeKey: product.activeKey,
  orderList: order.orderList,
}))
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    if (props.openid) {
      this.getOrderList();
    }
    if (!props.shopCarData.length) {
      menuAction.getMenuList();
    }
  }
  handleClick(value) {
    menuAction.changeMenuKey(value);
  }
  handleTopClick(current) {
    this.setState({
      current,
    });
  }
  handleRouterToShopBar() {
    Taro.navigateTo({
      url: '/pages/shopBar/shopBar',
    });
  }
  handleRouterToOrderDetail(orderId: string) {
    Taro.navigateTo({
      url: `/pages/orderSuc/orderSuc?orderId=${orderId}`,
    });
  }
  getOrderList(page = 0, size = 10) {
    const params = {
      openid: this.props.openid,
      page,
      size,
    };
    orderAction.getorderList(params);
  }
  renderTabsPane() {
    const { shopCarData, activeKey } = this.props;
    return shopCarData.map((item: IproductList, index) => {
      return (
        <AtTabsPane
          className="tabsMenu"
          key={item.type}
          tabDirection="vertical"
          current={activeKey}
          index={index}
        >
          <View className="listItem">
            {item.spus.map((food: Ifood, idx) => {
              food.outIndex = index
              if (food.chooseCount === undefined) {
                food.chooseCount = 0;
              }
              if(food.index === undefined){
                food.index = idx;
              }
              return (
                <View key={food.id} className="foodItem">
                  <ProductItem
                    outIndex={food.outIndex}
                    chooseCount={food.chooseCount}
                    idx={food.index}
                    title={food.name}
                    desc={food.description}
                    price={food.price}
                    imageUrl={food.icon}
                    productId={food.id}
                  />
                </View>
              );
            })}
          </View>
        </AtTabsPane>
      );
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
  config: Config = {
    navigationBarTitleText: '菜单',
  };

  render() {
    const tabList = [{ title: '菜单' }, { title: '推荐' }, { title: '订单' }];
    const { productCategory, activeKey, orderList, totalCount } = this.props;
    return (
      <View className="homeMenuWrapper">
        <AtTabs
          className="menuTabWrapper"
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleTopClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View style="height:100%;padding:10px 0;text-align: left;">
              <AtTabs
                current={activeKey}
                scroll
                height="600px"
                tabDirection="vertical"
                tabList={productCategory}
                onClick={this.handleClick.bind(this)}
              >
                {this.renderTabsPane()}
              </AtTabs>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style="padding:10px;text-align: center;">{}</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View className="dd-padding orderListWrapper">
              {!orderList.length ? <Text className="emptyOrderTip">当前没有订单，快去下单吧</Text> : this.renderOrderList()}
            </View>
          </AtTabsPane>
        </AtTabs>
        <View className="postShopBar">
          <AtFab onClick={this.handleRouterToShopBar.bind(this)}>
            <AtBadge value={totalCount} maxValue={99}>
              <Image style="width:35px;height:35px" src={shopPackageImg} mode="aspectFill" />
            </AtBadge>
          </AtFab>
        </View>
        <AtNoticebar className="dd-padding noticeBar" icon="volume-plus">
          点单满80免配送费，再送买一张送一礼券
        </AtNoticebar>
      </View>
    );
  }
}
export default Menu as ComponentClass<PageOwnProps, PageState>;
