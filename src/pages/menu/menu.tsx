import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtTabs, AtTabsPane, AtCard } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { IproductList } from './../../reducers/productList';
import './menu.less';
import menuAction from '../../actions/product';
import orderAction from '../../actions/order';
import ProductItem from './../../components/ProductItem';
import { OrderStatus, PayStatus } from './../../const/status';
import { formattedTime } from '../../utils/index';
import ShopBar from '../shopBar/shopBar';
import MenuList from '../menuList/menuList';

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

  handleTopClick(current) {
    this.setState({
      current,
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
              food.outIndex = index;
              if (food.chooseCount === undefined) {
                food.chooseCount = 0;
              }
              if (food.index === undefined) {
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
    return orderList.map(
      ({ orderId, createTime, buyerAddress, orderAmount, orderStatus, payStatus }) => {
        return (
          <AtCard
            onClick={() => this.handleRouterToOrderDetail(orderId)}
            key={orderId}
            className="orderItemWrapper"
            note={formattedTime(createTime)}
            extra={buyerAddress}
            title={`订单号：${orderId}`}
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
      },
    );
  }
  config: Config = {
    navigationBarTitleText: '菜单',
  };

  render() {
    const tabList = [{ title: '菜单' }, { title: '购物车' }, { title: '推荐' }];
    const { productCategory, activeKey, shopCarData } = this.props;
    return (
      <View className="homeMenuWrapper">
        <AtTabs
          className="menuTabWrapper"
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleTopClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <MenuList
              shopCarData={shopCarData}
              productCategory={productCategory}
              activeKey={activeKey}
            />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <ShopBar />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
export default Menu as ComponentClass<PageOwnProps, PageState>;
