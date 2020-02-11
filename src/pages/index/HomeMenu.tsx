import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import ProductItem from '../../components/ProductItem';
import { Ifood } from '../menu/menu'

interface K {
  gussusLike: [];
}
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
    const { gussusLike } = this.props;
    if (gussusLike && gussusLike.length)
      return gussusLike[0].spus.map((food: Ifood, idx) => {
        return (
          <ProductItem
            stock={food.stock}
            chooseCount={food.chooseCount}
            key={food.id}
            outIndex={0}
            idx={food.index}
            title={food.name}
            desc={food.description}
            price={food.price}
            imageUrl={food.icon}
            productId={food.id}
          />
        );
      });
  }
  render() {
    const tabList = [{ title: '猜你喜欢' }];
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0}>
          <View className="gussusLikeWrapper">{this.renderGussLike()}</View>
        </AtTabsPane>
        {/* <AtTabsPane current={this.state.current} index={1}>
          <View style="padding:10px;text-align: center;">{}</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style="padding:10px;text-align: center;">标签页三的内容</View>
        </AtTabsPane> */}
      </AtTabs>
    );
  }
}
