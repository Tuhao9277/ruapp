import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { IproductList } from './../../reducers/productList';
import './menu.less';
import getMenu from '../../actions/homeList';
import ProductItem from './../../components/ProductItem';

interface Ifood {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

type PageStateProps = {
  productList: [];
  productCategory: [];
  activeKey: number;
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  current: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Menu {
  props: IProps;
  state: PageState;
}
@connect(({ product }) => ({
  productList: product.productList,
  productCategory: product.productCategory,
  activeKey: product.activeKey,
}))
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
    }
    getMenu.getMenuList();
  }
  handleClick(value) {
    getMenu.changeMenuKey(value);
  }
  handleTopClick(current){
    this.setState({
      current
    })
  }
  renderTabsPane() {
    const { productList, activeKey } = this.props;
    return productList.map((item: IproductList, index) => {
      return (
        <AtTabsPane
          className="tabsMenu"
          key={item.type}
          tabDirection="vertical"
          current={activeKey}
          index={index}
        >
          <View className="listItem">
            {item.foods.map((food: Ifood) => {
              return (
                <View key={food.id} className="foodItem">
                  <ProductItem
                    title={food.name}
                    desc={food.description}
                    price={food.price}
                    imageUrl={food.icon}
                    productId={food.id}
                  />
                </View>
              );
            })}
          </View>
        </AtTabsPane>
      );
    });
  }
  config: Config = {
    navigationBarTitleText: '菜单',
  };

  render() {
    const tabList = [{ title: '菜单' }, { title: '推荐' }, { title: '订单' }];
    const { productCategory, activeKey } = this.props;
    return (
      <View className="homeMenuWrapper">
        <AtTabs
          className="menuTabWrapper"
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleTopClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View style="height:100%;padding:10px 0;text-align: left;">
              <AtTabs
                current={activeKey}
                scroll
                height="600px"
                tabDirection="vertical"
                tabList={productCategory}
                onClick={this.handleClick.bind(this)}
              >
                {this.renderTabsPane()}
              </AtTabs>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style="padding:10px;text-align: center;">{}</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style="padding:10px;text-align: center;">标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
export default Menu as ComponentClass<PageOwnProps, PageState>;
