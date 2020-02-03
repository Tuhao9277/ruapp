import { ComponentClass } from 'react';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import './productItem.less';
import productAction from '../actions/product';
import addIcon from './../images/add-active.png';
import minusIcon from './../images/minus-active.png';

interface K {}
type PageStateProps = {
  product: [];
};

type PageDispatchProps = {};

type PageOwnProps = {
  chooseCount: number;
  idx: number;
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
}))
class ProductItem extends Taro.Component {
  navigateToItem(id: string) {
    Taro.navigateTo({
      url: `/pages/productDisplay/productDisplay?id=${id}`,
    });
  }
  addSelectItem(id) {
    productAction.addSelectItem({ id });
  }
  minusSelectItem(id) {
    productAction.minusSelectItem({ id });
  }
  render() {
    const { title, price, imageUrl, productId, idx, desc, chooseCount } = this.props;
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
          <View className="selectContent">
            {chooseCount > 0 && (
              <Image
                style="width:24px;height:24px"
                src={minusIcon}
                mode="scaleToFill"
                onClick={() => {
                  this.minusSelectItem(idx);
                }}
              />
            )}
            {chooseCount > 0 && <View className="count">{chooseCount}</View>}
            <Image
              style="width:24px;height:24px"
              mode="scaleToFill"
              src={addIcon}
              onClick={() => {
                this.addSelectItem(idx);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default ProductItem as ComponentClass<PageOwnProps, PageState>;
