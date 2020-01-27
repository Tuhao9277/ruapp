import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { ScrollView, View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import banner1 from './../../images/offers@2x.png';
import './index.less';
import HomeMenu from './HomeMenu';
// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion
interface OrderMenuK {
  title: string;
  rowKey: string;
}
type PageStateProps = {
  orderMenu: [];
  exploreMenu: [];
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(({ orderTab }) => ({
  orderMenu: orderTab.orderMenu,
  exploreMenu: orderTab.exploreMenu,
}))
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  navigateToOrder = (tabName: string) => {
    console.log(tabName);
  };
  navigateToExplore = (tabName: string) => {
    console.log(tabName);
  };
  renderOrderTab = () => {
    const { orderMenu } = this.props;
    return orderMenu.map((item: OrderMenuK) => {
      const cls = 'orderTabIcon ' + item.rowKey;
      const name = item.title;

      return (
        <View key={cls} className="orderTabItem" onClick={() => this.navigateToOrder(item.rowKey)}>
          <View className="flexWrapper">
            <View className={cls} />
            <View className="orderTabname">{name}</View>
          </View>
        </View>
      );
    });
  };
  renderExploreTab = () => {
    const { exploreMenu } = this.props;
    return exploreMenu.map((item: OrderMenuK) => {
      const cls = 'exploreTabIcon ' + item.rowKey;
      const name = item.title;

      return (
        <View
          key={cls}
          className="exploreTabItem"
          onClick={() => this.navigateToExplore(item.rowKey)}
        >
          <View className="flexWrapper">
            <View className={cls} />
            <View className="exploreTabname">{name}</View>
          </View>
        </View>
      );
    });
  };
  config: Config = {
    navigationBarTitleText: 'STARBUCKS',
  };
  render() {
    return (
      <View className="index">
        <View className="homeHeader">
          <View className="welcomeTip">
            早上好,<Text>Mamoru</Text>
          </View>
          <View className="welcomeSubTip">
            <Text>人生得意须尽欢，莫使☕️空对月</Text>
          </View>
        </View>
        <Swiper
          className="homeSwiper"
          indicatorColor="#fff"
          indicatorActiveColor="#296144"
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className="demo-text-1">
              <Image style="width: 100%;height: 100%" src={banner1} mode="aspectFit" />
            </View>
          </SwiperItem>
        </Swiper>
        <View className="homeOrder">
          <View className="homeTitle">
            <Text>What are you ordering?</Text>
          </View>
          <ScrollView scrollX className="orderTabs">
            {this.renderOrderTab()}
          </ScrollView>
        </View>
        <View className="homeExplore">
          <View className="homeTitle">
            <Text>Explore</Text>
          </View>
          <Text className="homeSubTitle">All our services</Text>
          <View className="exploreTabs">{this.renderExploreTab()}</View>
        </View>
        <View className="homeMenu">
          <HomeMenu />
        </View>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>;
