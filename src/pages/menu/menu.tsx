import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtTabs, AtTabsPane, AtFab, AtFloatLayout, AtNoticebar, AtBadge, AtCard } from 'taro-ui';
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

interface Ifood {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
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
  productList: [];
  productCategory: [];
  orderList: [];
  activeKey: number;
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  current: number;
  isopenShopBar: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Menu {
  props: IProps;
  state: PageState;
}
@connect(({ product, user, order }) => ({
  openid: user.openid,
  productList: product.productList,
  productCategory: product.productCategory,
  activeKey: product.activeKey,
  orderList: order.orderList,
}))
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
      isopenShopBar: false,
    };
    this.getOrderList();
    menuAction.getMenuList();
  }
  handleClick(value) {
    menuAction.changeMenuKey(value);
  }
  handleTopClick(current) {
    this.setState({
      current,
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
  handleDisplayShopBar() {
    this.setState((prevState: PageState) => ({
      isopenShopBar: !prevState.isopenShopBar,
    }));
  }
  renderTabsPane() {
    const { productList, activeKey } = this.props;
    return productList.map((item: IproductList, index) => {
      return (
        <AtTabsPane
          className="tabsMenu"
          key={item.type}
          tabDirection="vertical"
          current={activeKey}
          index={index}
        >
          <View className="listItem">
            {item.foods.map((food: Ifood) => {
              return (
                <View key={food.id} className="foodItem">
                  <ProductItem
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
          key={item.orderId}
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
    const { isopenShopBar } = this.state;
    const tabList = [{ title: '菜单' }, { title: '推荐' }, { title: '订单' }];
    const { productCategory, activeKey, orderList } = this.props;
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
              {!orderList.length ? <Text>当前没有订单，快去下单吧</Text> : this.renderOrderList()}
            </View>
          </AtTabsPane>
        </AtTabs>
        <View className="postShopBar">
          <AtFab onClick={this.handleDisplayShopBar.bind(this)}>
            <AtBadge value={6} maxValue={99}>
              <Image style="width:35px;height:35px" src={shopPackageImg} mode="aspectFill" />
            </AtBadge>
          </AtFab>
        </View>
        <AtNoticebar className="dd-padding noticeBar" icon="volume-plus">
          点单满80免配送费，再送买一张送一礼券
        </AtNoticebar>
        <AtFloatLayout
          isOpened={isopenShopBar}
          title="这是个标题"
          onClose={this.handleDisplayShopBar.bind(this)}
        >
          这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
          随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
        </AtFloatLayout>
      </View>
    );
  }
}
export default Menu as ComponentClass<PageOwnProps, PageState>;
