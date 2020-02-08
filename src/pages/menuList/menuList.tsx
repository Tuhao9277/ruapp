import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import './menuList.less';
import { IproductList } from './../../reducers/productList';
import { Ifood } from '../menu/menu';
import ProductItem from './../../components/ProductItem';
import menuAction from '../../actions/product';

type PageStateProps = {
  activeKey: number;
  shopCarData: IproductList[];
  productCategory: [];
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
  state: PageState;
}

class Index extends Component {
  constructor(props) {
    super(props);
  }
  renderTabsPane() {
    const { shopCarData, activeKey } = this.props;
    return shopCarData.map((item: IproductList, index) => {
      return (
        <AtTabsPane
          className="tabsMenu"
          key={item.type}
          tabDirection="vertical"
          current={activeKey}
          index={index}
        >
          <View className="listItem">
            {item.spus.map((food: Ifood) => {
              return (
                <View key={food.id} className="foodItem">
                  <ProductItem
                    stock={food.stock}
                    outIndex={food.outIndex}
                    chooseCount={food.chooseCount}
                    idx={food.index}
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
  handleClick(value) {
    menuAction.changeMenuKey(value);
  }
  render() {
    const { activeKey, productCategory } = this.props;
    return (
      <View style="height:100%">
        <AtTabs
          current={activeKey}
          height="100vh"
          tabDirection="vertical"
          tabList={productCategory}
          onClick={this.handleClick.bind(this)}
        >
          {this.renderTabsPane()}
        </AtTabs>
      </View>
    );
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>;
