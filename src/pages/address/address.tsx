import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text } from '@tarojs/components';
import { AtButton, AtIcon } from 'taro-ui';
import './address.less';
import ANavBar from '../../components/ANavBar';
import userAction from '../../actions/authAction';

type PageStateProps = {
  addressList: [];
  buyerId: string;
  openid: string;
};

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
@connect(({ user }) => ({
  addressList: user.addressList,
  buyerId: user.buyerId,
  openid: user.openid,
}))
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '小红',
    };
  }
  componentDidMount() {
    Taro.showLoading({
      title:'加载中'
    })
      const params = { buyerId: this.props.buyerId };
      userAction.getUserAddress(params);
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  handleToNewAddr() {
    Taro.navigateTo({
      url: '/pages/address/addressForm',
    });
  }
  handleToUpdateAddr(idx) {
    Taro.navigateTo({
      url: `/pages/address/addressForm?idx=${idx}`,
    });
  }
  renderAddress() {
    const { addressList } = this.props;
    return addressList.map(({ recId, recName, recTelephone, recAddress },index) => {
      return (
        <View key={recId} className="addressItemWrapper">
          <View className="addressItemLeftWrapper">
            <View className="addressItemTopWrapper">
              <Text className="addressName">{recName}</Text>
              <Text className="addressTel">{recTelephone}</Text>
            </View>
            <Text className="addressWrapper">{recAddress}</Text>
          </View>
          <AtIcon value="edit" size="20" color="#999" onClick={() => this.handleToUpdateAddr(index)} />
        </View>
      );
    });
  }
  config: Config = {
    navigationBarTitleText: '我的收货地址',
  };
  render() {
    return (
      <View className="dd-padding Address">
        <ANavBar />
        <Text className="dd-padding AddressFormTitle">我的收货地址</Text>
        {this.renderAddress()}
        <AtButton type="primary" onClick={this.handleToNewAddr.bind(this)}>
          新增收货地址
        </AtButton>
      </View>
    );
  }
}
export default Address as ComponentClass<PageOwnProps, PageState>;
