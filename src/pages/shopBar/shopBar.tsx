import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtNavBar, AtButton, AtNoticebar } from 'taro-ui';
import './ShopBar.less';
import { Ifood } from '../menu/menu';
import { IproductList } from './../../reducers/productList';
import ProductItem from './../../components/ProductItem';
import orderAction from './../../actions/order';

type PageStateProps = {
  shopCarData: IproductList[];
};
type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ShopBar {
  props: IProps;
  state: PageState;
}
@connect(({ product }) => ({
  shopCarData: product.shopCarData,
}))
class ShopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {}

  getTotalPrice() {
    const shopCarData = this.props.shopCarData || [];
    let totalPrice = 0;
    let dotNum = 0;
    const chooseList: Ifood[] = [];
    for (let i = 0; i < shopCarData.length; i++) {
      const spus = shopCarData[i].spus || [];
      for (let j = 0; j < spus.length; j++) {
        const chooseCount = spus[j].chooseCount;
        if (chooseCount > 0) {
          dotNum += chooseCount;
          spus[j].index = j;
          spus[j].outIndex = i;
          chooseList.push(spus[j]);
          totalPrice += spus[j].price * chooseCount;
        }
      }
    }
    return {
      dotNum,
      totalPrice,
      chooseList,
    };
  }
  renderTabsPane(chooseList) {
    return chooseList.map((food: Ifood, idx) => {
      return (
        <View key={food.id} className="foodItem">
          <ProductItem
            chooseCount={food.chooseCount}
            idx={idx}
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
  handleRouterTo(data: {}) {
    orderAction.saveOrderData(data);
    Taro.navigateTo({
      url: `/pages/order/order`,
    });
  }

  hanldeRouterBack() {
    Taro.navigateBack();
  }

  render() {
    const data = this.getTotalPrice();
    return (
      <View className="ShopBar">
        <AtNavBar
          onClickLeftIcon={this.hanldeRouterBack.bind(this)}
          color="#000"
          leftIconType="chevron-left"
        />
        <Text className="dd-padding">购物车({data.dotNum})</Text>
        <AtNoticebar className="dd-padding shopBarNotice" icon="volume-plus">
          点单满80免配送费，再送买一张送一礼券
        </AtNoticebar>
        <View className="dd-padding shopProductWrapper">{this.renderTabsPane(data.chooseList)}</View>
        {!!data.dotNum && (
          <AtButton className="shopBtn" type="primary" onClick={() => this.handleRouterTo(data)}>
            结算：¥{data.totalPrice}
          </AtButton>
        )}
      </View>
    );
  }
}
export default ShopBar as ComponentClass<PageOwnProps, PageState>;
