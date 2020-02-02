import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import Index from './pages/index';

import store from './store';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config: Config = {
    pages: [
      'pages/index/index',
      'pages/pay/pay',
      'pages/login/login',
      'pages/my/my',
      'pages/register/register',
      'pages/productDisplay/productDisplay',
      'pages/menu/menu',
      'pages/shopBar/shopBar',
      'pages/order/order',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#296144',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      list: [
        {
          text: '首页',
          iconPath: './images/home.png',
          selectedIconPath: './images/home-active.png',
          pagePath: 'pages/index/index',
        },
        {
          text: '星礼卡',
          iconPath: './images/pay.png',
          selectedIconPath: './images/pay-active.png',
          pagePath: 'pages/pay/pay',
        },
        {
          text: '菜单',
          iconPath: './images/coffee.png',
          selectedIconPath: './images/coffee-active.png',
          pagePath: 'pages/menu/menu',
        },
        {
          text: '我的',
          iconPath: './images/me.png',
          selectedIconPath: './images/me-active.png',
          pagePath: 'pages/my/my',
        },
      ],
    },
  };
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
