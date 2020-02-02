import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { formatterTime } from './../../utils';
import './order.less';
import ANavBar from './../../components/ANavBar';
import { AtIcon } from 'taro-ui';

type PageStateProps = {};

type PageDispatchProps = {};

type PageOwnProps = {
  currentOrder: {};
};

type PageState = {
  name: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Order {
  props: IProps;
  state: PageState;
}

@connect(({ order }) => ({
  currentOrder: order.currentOrder,
}))
class Order extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <ANavBar />
        <View className="dd-padding orderWrapper">
          <Text>创建订单</Text>
          <View>
            <Text className="lastTime">约{formatterTime(Date.now() + 30 * 60 * 1000)}后送达</Text>
          </View>
          <View className="userInfoWrapper">
            <View className="userInfoLeft">
              <Text className="userName">
                儒先生<Text className="userPhone">13888888888</Text>
              </Text>
              <View className="userAddr">
                <AtIcon value="map-pin" size="18" color="#fff" />
                <Text className="userAddrText">望京街道，望京西园三区3单元1001室</Text>
              </View>
            </View>
            <View className="userInfoRight">
              <AtIcon value="chevron-right" size="24" color="#fff" />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Order as ComponentClass<PageOwnProps, PageState>;
