import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './loginTip.less';


class LoginTip extends Component {
  constructor(props) {
    super(props);
  }
  navigateToLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/login',
    });
  };
  render() {
    return (
      <View className="myWrapper">
        <Text>登录星巴克App享受更多精彩服务</Text>
        <Text style="color:#35a56b" onClick={() => this.navigateToLogin()}>
          立即登录
        </Text>
      </View>
    );
  }
}
export default LoginTip as ComponentClass;
