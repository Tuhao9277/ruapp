import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import ProductItem from '../../components/ProductItem';
import gussusLike from './../../static/gussusLike.json';

interface ProductListItem {
  title: string;
  body: string;
  id: string;
  productId: string;
  preview: string;
  url: string;
  popular: string;
  price: number;
}
interface K {}
interface T {
  current: number;
}
export default class HomeMenu extends Taro.Component<K, T> {
  constructor(props) {
    super(...props);
    this.state = {
      current: 0,
    };
  }
  handleClick(value) {
    this.setState({
      current: value,
    });
  }
  renderGussLike() {
    return Object.values(gussusLike).map((item: ProductListItem) => {
      return (
        <ProductItem
          key={item.id}
          productId={item.productId}
          imageUrl={item.preview}
          title={item.title}
          price={item.price}
        />
      );
    });
  }
  render() {
    const tabList = [{ title: '猜你喜欢' }, { title: '热门' }, { title: '商品' }];
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0}>
          <View style="padding:10px 0;text-align: left;">{this.renderGussLike()}</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style="padding:10px;text-align: center;">标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style="padding:10px;text-align: center;">标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
    );
  }
}
