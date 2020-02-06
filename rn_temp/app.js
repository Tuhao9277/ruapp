import { Provider as TCRNProvider } from '@tarojs/components-rn';
import TaroRouter from '@tarojs/taro-router-rn';
import imagesMeActivePng from '././images/me-active.png';
import imagesMePng from '././images/me.png';
import imagesOrderActivePng from '././images/order-active.png';
import imagesOrderPng from '././images/order.png';
import imagesCoffeeActivePng from '././images/coffee-active.png';
import imagesCoffeePng from '././images/coffee.png';
import imagesHomeActivePng from '././images/home-active.png';
import imagesHomePng from '././images/home.png';
import pagesAddressAddressIndexes from './pages/address/addressIndexes';
import pagesAddressAddressUpdateForm from './pages/address/addressUpdateForm';
import pagesAddressAddressForm from './pages/address/addressForm';
import pagesAddressAddress from './pages/address/address';
import pagesOrderSucOrderSuc from './pages/orderSuc/orderSuc';
import pagesOrderListOrderList from './pages/orderList/orderList';
import pagesOrderOrder from './pages/order/order';
import pagesShopBarShopBar from './pages/shopBar/shopBar';
import pagesMenuMenu from './pages/menu/menu';
import pagesProductDisplayProductDisplay from './pages/productDisplay/productDisplay';
import pagesRegisterRegister from './pages/register/register';
import pagesMyMy from './pages/my/my';
import pagesLoginLogin from './pages/login/login';
import pagesPayPay from './pages/pay/pay';
import pagesIndexIndex from './pages/index/index';
import Taro from '@tarojs/taro-rn';
import React from 'react';
import { Component } from "@tarojs/taro-rn";
import { Provider } from "@tarojs/taro-redux-rn";

import store from "./store/index";
import appStyleSheet from "./app_styles";
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var _styleSheet = appStyleSheet;
let App = class App extends Component {
  constructor() {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    super(...arguments);
    Taro._$app = this;
  }
  componentDidMount() {
    this.componentDidShow();
  }
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>
                  
                <TCRNProvider>
                  <RootStack />
                </TCRNProvider>
                </Provider>;
  }

  componentWillUnmount() {
    this.componentDidHide && this.componentDidHide();
  }

};
App.config = {
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#296144',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    list: [{
      text: '首页',
      iconPath: imagesHomePng,
      selectedIconPath: imagesHomeActivePng,

      pagePath: 'pages/index/index'
    },
    // {
    //   text: '星礼卡',
    //   iconPath: './images/pay.png',
    //   selectedIconPath: './images/pay-active.png',
    //   pagePath: 'pages/pay/pay',
    // },
    {
      text: '菜单',
      iconPath: imagesCoffeePng,
      selectedIconPath: imagesCoffeeActivePng,

      pagePath: 'pages/menu/menu'
    }, {
      text: '订单',
      iconPath: imagesOrderPng,
      selectedIconPath: imagesOrderActivePng,

      pagePath: 'pages/orderList/orderList'
    }, {
      text: '我的',
      iconPath: imagesMePng,
      selectedIconPath: imagesMeActivePng,

      pagePath: 'pages/my/my'
    }]
  }
};
const RootStack = TaroRouter.initRouter([['pages/index/index', pagesIndexIndex], ['pages/pay/pay', pagesPayPay], ['pages/login/login', pagesLoginLogin], ['pages/my/my', pagesMyMy], ['pages/register/register', pagesRegisterRegister], ['pages/productDisplay/productDisplay', pagesProductDisplayProductDisplay], ['pages/menu/menu', pagesMenuMenu], ['pages/shopBar/shopBar', pagesShopBarShopBar], ['pages/order/order', pagesOrderOrder], ['pages/orderList/orderList', pagesOrderListOrderList], ['pages/orderSuc/orderSuc', pagesOrderSucOrderSuc], ['pages/address/address', pagesAddressAddress], ['pages/address/addressForm', pagesAddressAddressForm], ['pages/address/addressUpdateForm', pagesAddressAddressUpdateForm], ['pages/address/addressIndexes', pagesAddressAddressIndexes]], Taro, App.config);
Taro.initNativeApi(Taro);
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});
export default App;