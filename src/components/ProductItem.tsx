import { ComponentClass } from 'react';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import './productItem.less';
import productAction from '../actions/product';

interface K {}
type PageStateProps = {
  product: [];
  chooseCount: number;
};

type PageDispatchProps = {};

type PageOwnProps = {
  productId: string;
  title: string;
  desc?: string;
  imageUrl: string;
  price: number;
};

type PageState = {
  current: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ProductItem {
  props: IProps;
  state: PageState;
}
@connect(({ product }) => ({
  product: product.shopCarData,
  chooseCount: 0,
}))
class ProductItem extends Taro.Component {
  navigateToItem(id: string) {
    Taro.navigateTo({
      url: `/pages/productDisplay/productDisplay?id=${id}`,
    });
  }
  addSelectItem(id) {
    productAction.addSelectItem(id);
  }
  minusSelectItem(id) {
    productAction.minusSelectItem(id);
  }
  render() {
    const { title, price, imageUrl, productId, desc, chooseCount } = this.props;
    return (
      <View className="productItemWrapper">
        <Image
          className="foodImg"
          mode="scaleToFill"
          src={imageUrl}
          onClick={() => this.navigateToItem(productId)}
        />
        <View className="foodRight">
          <Text className="foodName">{title}</Text>
          <Text className="foodDesc two-line">{desc}</Text>
          <View className="foodPrice">
            ¥ <Text className="foodPriceHighLight">{price}</Text>
          </View>
          <View className="select-content">
            {chooseCount > 0 && (
              <View
                onClick={() => {
                  this.minusSelectItem(productId);
                }}
                className="minus"
              ></View>
            )}
            {chooseCount > 0 && <View className="count">{chooseCount}</View>}
            <View
              onClick={() => {
                this.addSelectItem(productId);
              }}
              className="plus"
            ></View>
          </View>
        </View>

      </View>
    );
  }
}
export default ProductItem as ComponentClass<PageOwnProps, PageState>;
