import Taro from '@tarojs/taro';
import { AtNavBar } from 'taro-ui'
import './AtHeader.less';

interface K {
  [key: string]: string;

}
interface T {
  [key: string]: string;
}
export default class ANavBar extends Taro.Component<K, T> {

  hanldeRouterBack() {
    Taro.navigateBack();
  }
  render() {
    return (
      <AtNavBar
        onClickLeftIcon={this.hanldeRouterBack.bind(this)}
        color="#000"
        leftIconType="chevron-left"
      />
    );
  }
}
