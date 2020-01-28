import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './AtHeader.less';

interface K {
  title: string;
}
interface T {
  [key: string]: string;
}
export default class AtHeader extends Taro.Component<K, T> {
  render() {
    const { title } = this.props;
    return (
      <View className="dd-padding AtHeaderWrapper">
        <Text>{title}</Text>
      </View>
    );
  }
}
