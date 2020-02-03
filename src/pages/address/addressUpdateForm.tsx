import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtRadio } from 'taro-ui';
import './address.less';
import userAction from '../../actions/authAction';
import ANavBar from './../../components/ANavBar'

type PageStateProps = {
  addressList:[],
  currentAddress:{}
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  currentAddr: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
  state: PageState;
}
@connect(({ user }) => ({
  currentAddress: user.currentAddress,
  addressList: user.addressList,
}))
class Index extends Component {
  constructor(props) {
    super(props);
    const currentAddr = props.currentAddress.recId
    this.state = {
      currentAddr,
    };
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  renderOptions(){
    const {addressList} = this.props
    return addressList.map(({recId, recName, recTelephone, recAddress})=>({
        label: recName + recTelephone + recAddress,
        value: recId,
    }))
  }
  handleChangecurrentAddr(value){
    const {addressList} = this.props
    this.setState({
      currentAddr:value
    })
    addressList.forEach(item=>{
      if(item.recId === value){
        userAction.changeCurrentAddr(item)
        return
      }
    })
  }
  render() {
    return (
      <View className="Index">
        <ANavBar />
        <Text>修改收货地址</Text>
        <AtRadio
          options={this.renderOptions()}
          value={this.state.currentAddr}
          onClick={this.handleChangecurrentAddr.bind(this)}
        />
      </View>
    );
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>;
