import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text } from '@tarojs/components';
import './orderSuc.less';
import api from './../../service/api';

type PageStateProps = {
  openid: string;
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  name: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
  state: PageState;
}

@connect(({ user }) => ({
  openid: user.openid,
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '小红',
    };
  }
  componentWillMount() {
    const { openid } = this.props;
    const { orderId } = this.$router.params;
    api.get('order/detail', { orderId, openid }).then(res => {
      console.log(res.data);
    });
  }
  render() {
    return (
      <View className="Index">
        <Text>支付成功！</Text>
      </View>
    );
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>;
