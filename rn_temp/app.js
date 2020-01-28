import { Provider as TCRNProvider } from '@tarojs/components-rn';
import TaroRouter from '@tarojs/taro-router-rn';
import imagesMeActivePng from '././images/me-active.png';
import imagesMePng from '././images/me.png';
import imagesPayActivePng from '././images/pay-active.png';
import imagesPayPng from '././images/pay.png';
import imagesHomeActivePng from '././images/home-active.png';
import imagesHomePng from '././images/home.png';
import pagesRegisterRegister from './pages/register/register';
import pagesMyMy from './pages/my/my';
import pagesLoginLogin from './pages/login/login';
import pagesPayPay from './pages/pay/pay';
import pagesIndexIndex from './pages/index/index';
import Taro from '@tarojs/taro-rn';
import React from 'react';
import { Component } from "@tarojs/taro-rn";
import { Provider } from "@tarojs/taro-redux-rn";

import configStore from "./store/index";
import appStyleSheet from "./app_styles";
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var _styleSheet = appStyleSheet;
const store = configStore();
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
      text: 'Home',
      iconPath: imagesHomePng,
      selectedIconPath: imagesHomeActivePng,

      pagePath: 'pages/index/index'
    }, {
      text: 'Pay',
      iconPath: imagesPayPng,
      selectedIconPath: imagesPayActivePng,

      pagePath: 'pages/pay/pay'
    }, {
      text: 'Me',
      iconPath: imagesMePng,
      selectedIconPath: imagesMeActivePng,

      pagePath: 'pages/my/my'
    }]
  }
};
const RootStack = TaroRouter.initRouter([['pages/index/index', pagesIndexIndex], ['pages/pay/pay', pagesPayPay], ['pages/login/login', pagesLoginLogin], ['pages/my/my', pagesMyMy], ['pages/register/register', pagesRegisterRegister]], Taro, App.config);
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