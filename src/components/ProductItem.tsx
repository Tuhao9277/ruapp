import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './productItem.less';

interface K {
  productId: string;
  title: string;
  imageUrl: string;
  price: number;
}
interface T {
  current: number;
}
export default class ProductItem extends Taro.Component<K, T> {
  navigateToItem(id: string) {
    Taro.navigateTo({
      url: `/pages/productDisplay/productDisplay?id=${id}`,
    });
  }
  render() {
    const { title, price, imageUrl, productId } = this.props;
    return (
      <View className="productItemWrapper">
        <Image
          style="width: 100px;height: 100px"
          src={`https://www.starbucks.com.cn/${imageUrl}`}
          onClick={() => this.navigateToItem(productId)}
        />
        <View className="productItemRight">
          <Text className="productItemTitle">{title}</Text>
          <Text className="productItemPrice">¥{price}</Text>
        </View>
      </View>
    );
  }
}
