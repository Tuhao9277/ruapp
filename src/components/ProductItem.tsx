import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.less'

interface K {
  title: string;
  imageUrl: string;
  price: number;
}
interface T {
  current: number;
}
export default class ProductItem extends Taro.Component<K, T> {
  render() {
    const { title, price, imageUrl } = this.props;
    return (
      <View className="productItemWrapper">
          <Image style='width: 100px;height: 100px' src={`https://www.starbucks.com.cn/${imageUrl}`} />
        <View className="productItemRight">
          <Text>{title}</Text>
          <Text>{price}</Text>
        </View>
      </View>
    );
  }
}
