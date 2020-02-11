import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { IproductList } from './../../reducers/productList';
import './menu.less';
import menuAction from '../../actions/product';
import orderAction from '../../actions/order';
import ShopBar from '../shopBar/shopBar';
import MenuList from '../menuList/menuList';

export interface Ifood {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  chooseCount: number;
  stock: number;
  index: number;
  outIndex: number;
}

type PageStateProps = {
  openid: string;
  shopCarData: IproductList[];
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
@connect(({ product, user }) => ({
  openid: user.openid,
  shopCarData: product.shopCarData,
  totalCount: product.totalCount,
  productCategory: product.productCategory,
  activeKey: product.activeKey,
}))
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    if (!props.shopCarData.length) {
      menuAction.getMenuList();
    }
  }
  componentDidShow(){
    menuAction.dealWithShopCar({});
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
  config: Config = {
    navigationBarTitleText: '菜单',
  };

  render() {
    const tabList = [{ title: '菜单' }, { title: '购物车' }];
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
        </AtTabs>
      </View>
    );
  }
}
export default Menu as ComponentClass<PageOwnProps, PageState>;
