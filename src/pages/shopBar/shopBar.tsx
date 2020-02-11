import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtButton, AtNoticebar } from 'taro-ui';
import './ShopBar.less';
import { Ifood } from '../menu/menu';
import { IproductList, ShopCarInfo } from '../../reducers/productList';
import ProductItem from '../../components/ProductItem';
import productAction from '../../actions/product';
import orderAction from '../../actions/order';
import ANavBar from '../../components/ANavBar';

type PageStateProps = {
  status: boolean;
  totalCount: number;
  shopCarData: IproductList[];
  shopCarInfo: ShopCarInfo;
};
type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  totalPrice: number;
  chooseList: Ifood[];
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ShopBar {
  props: IProps;
  state: PageState;
}
@connect(({ user, product }) => ({
  status: user.status,
  shopCarData: product.shopCarData,
  totalCount: product.totalCount,
  shopCarInfo: product.shopCarInfo,
}))
class ShopBar extends Component {
  renderTabsPane() {
    const { chooseList } = this.props.shopCarInfo;
    return chooseList.map((food: Ifood) => {
      return (
        <View key={food.id} className="foodItem">
          <ProductItem
            stock={food.stock}
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
    });
  }

  handleRouterTo() {
    if (!this.props.status) {
      Taro.navigateTo({
        url: `/pages/login/login`,
      });
      return;
    }
    orderAction.saveOrderData(this.props.shopCarInfo);
    Taro.navigateTo({
      url: `/pages/order/order`,
    });
  }

  hanldeRouterBack() {
    Taro.navigateBack();
  }

  render() {
    const { shopCarInfo, totalCount } = this.props;
    const { totalPrice } = shopCarInfo;
    return (
      <View className="ShopBar">
        {this.$router.path !== '/pages/menu/menu' && <ANavBar />}
        <Text className="dd-padding">购物车({totalCount})</Text>
        <AtNoticebar className="dd-padding shopBarNotice" icon="volume-plus">
          点单满80免配送费，再送买一送一礼券
        </AtNoticebar>
        <View className="dd-padding shopProductWrapper">{this.renderTabsPane()}</View>
        {!!totalPrice && (
          <AtButton className="cartBtn" type="primary" onClick={() => this.handleRouterTo()}>
            结算：¥{totalPrice}
          </AtButton>
        )}
      </View>
    );
  }
}
export default ShopBar as ComponentClass<PageOwnProps, PageState>;
