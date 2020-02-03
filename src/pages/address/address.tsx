import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './address.less';
import ANavBar from '../../components/ANavBar';
import { AtButton } from 'taro-ui'

type PageStateProps = {};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  name: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Address {
  props: IProps;
  state: PageState;
}

class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '小红',
    };
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  config: Config = {
    navigationBarTitleText: '我的收货地址',
  };
  render() {
    return (
      <View className="Address">
        <ANavBar />
        <AtButton>新增收货地址</AtButton>
      </View>
    );
  }
}
export default Address as ComponentClass<PageOwnProps, PageState>;
