import { ComponentClass } from 'react';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import './productItem.less';
import productAction from '../actions/product';
import addIcon from './../images/add-active.png';
import add from './../images/add.png';
import minusIcon from './../images/minus-active.png';

interface K {}
type PageStateProps = {
  product: [];
};

type PageDispatchProps = {};

type PageOwnProps = {
  outIndex: number;
  chooseCount: number;
  idx: number;
  productId: string;
  title: string;
  desc?: string;
  imageUrl: string;
  stock: number;
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
  addSelectItem(id, outIndex) {
    productAction.addSelectItem({ id, outIndex });
  }
  minusSelectItem(id, outIndex) {
    productAction.minusSelectItem({ id, outIndex });
  }
  render() {
    const {
      title,
      price,
      imageUrl,
      productId,
      idx,
      desc,
      chooseCount,
      outIndex,
      stock,
    } = this.props;
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
          <Text className="foodDesc">库存：{stock}件</Text>
          <View className="foodPrice">
            ¥ <Text className="foodPriceHighLight">{price}</Text>
          </View>
          {stock ? (
            <View className="selectContent">
              {chooseCount > 0 && (
                <Image
                  style="width:24px;height:24px"
                  src={minusIcon}
                  mode="scaleToFill"
                  onClick={() => {
                    this.minusSelectItem(idx, outIndex);
                  }}
                />
              )}
              {chooseCount > 0 && <View className="count">{chooseCount}</View>}
              <Image
                style="width:24px;height:24px"
                mode="scaleToFill"
                src={addIcon}
                onClick={() => {
                  this.addSelectItem(idx, outIndex);
                }}
              />
            </View>
          ) : (
            <Image
              style="width:24px;height:24px"
              mode="scaleToFill"
              src={add}
            />
          )}
        </View>
      </View>
    );
  }
}
export default ProductItem as ComponentClass<PageOwnProps, PageState>;
