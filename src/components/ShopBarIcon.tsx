import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtFab, AtBadge, AtNoticebar } from 'taro-ui';
import './AtHeader.less';
import shopPackageImg from './../images/shopPackage.png';
import './shopBarIcon.less';

interface K {
  totalCount: number;
}
interface T {
  [key: string]: string;
}
class ShopBarIcon extends Taro.Component<K, T> {
  handleRouterToShopBar() {
    Taro.navigateTo({
      url: '/pages/shopBar/shopBar',
    });
  }
  render() {
    const { totalCount } = this.props;
    return (
      <View>
        <View className="postShopBar">
          <AtFab onClick={this.handleRouterToShopBar.bind(this)}>
            <AtBadge value={totalCount} maxValue={99}>
              <Image style="width:35px;height:35px" src={shopPackageImg} mode="aspectFill" />
            </AtBadge>
          </AtFab>
        </View>
        <AtNoticebar className="noticeBar" icon="volume-plus">
          点单满80免配送费，再送买一张送一礼券
        </AtNoticebar>
      </View>
    );
  }
}

export default ShopBarIcon;
