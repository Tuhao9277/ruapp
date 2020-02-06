import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtActionSheet, AtActionSheetItem, AtModal } from 'taro-ui';
import './address.less';
import ANavBar from './../../components/ANavBar';
import api from './../../service/api';
import userAction from '../../actions/authAction';

type PageStateProps = {
  addressList: string;
  buyerId: string;
};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  recAddress: string;
  recName: string;
  recTelephone: string;
  city: string;
  recId: string;
  isShowIndexes: boolean;
  isOopenModal: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface AddressForm {
  props: IProps;
  state: PageState;
}
@connect(({ user }) => ({
  addressList: user.addressList,
  buyerId: user.buyerId,
}))
class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recAddress: '',
      recName: '',
      recTelephone: '',
      city: '',
      recId: '',
      isShowIndexes: false,
      isOopenModal: false,
    };
    const { idx } = this.$router.params;
    if (idx) {
      const { recAddress, recName, recTelephone, recId } = props.addressList[idx];
      this.setState({
        recId,
        recAddress,
        recName,
        recTelephone,
      });
    }
  }

  onSubmit(event) {
    const { buyerId } = this.props;
    Taro.showLoading({
      title: '请稍候...',
    });
    const { city, recId } = this.state;
    const { recAddress, recName, recTelephone } = event.detail.value;
    const params = {
      recId,
      buyerId,
      recAddress: city + recAddress,
      recName,
      recTelephone,
    };
    api.post('rec/save', params).then(res => {
      Taro.hideLoading();
      if (res.data.code === 0) {
        Taro.navigateBack();
        userAction.getUserAddress({ buyerId });
      }
    });
  }
  handleChangeAddress(value) {
    this.setState({
      recAddress: value,
    });
  }
  handleChangeName(value) {
    this.setState({
      recName: value,
    });
  }
  handleChangeTel(value) {
    this.setState({
      recTelephone: value,
    });
  }
  handleShowIndexes() {
    this.setState(prevState => ({
      isShowIndexes: !prevState.isShowIndexes,
    }));
  }
  handleChangeCity(event) {
    this.setState({
      city: event.target.innerText,
    });
  }
  handleDelAddr() {
    this.setState(prevState => ({
      isOopenModal: !prevState.isOopenModal,
    }));
  }
  handleCancelAddr(recId) {
    Taro.showLoading({
      title: '加载中',
    });
    api.post('rec/del', { recId }).then(res => {
      const { buyerId } = this.props;
      if (res.data.code === 0) {
        Taro.hideLoading();
        Taro.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 1500,
        });
        setTimeout(()=>{
          Taro.navigateBack()
          userAction.getUserAddress({ buyerId });
        },1500)
      }
    });
  }
  render() {
    const { idx } = this.$router.params;
    return (
      <View className="AddressForm">
        <ANavBar />
        <Text className="AddressFormTitle">新增/更新收货地址</Text>
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          {idx === undefined && (
            <AtInput
              name="preAddress"
              editable={false}
              onClick={this.handleShowIndexes.bind(this)}
              title="收货地址"
              type="text"
              placeholder="点击选择"
              value={this.state.city}
              onChange={this.handleChangeCity.bind(this)}
            />
          )}
          <AtInput
            name="recAddress"
            title="门牌号"
            type="text"
            placeholder="详细地址，例3号楼10层1001室"
            value={this.state.recAddress}
            onChange={this.handleChangeAddress.bind(this)}
          />
          <AtInput
            maxLength="20"
            name="recName"
            title="联系人"
            type="text"
            placeholder="请填写收货人姓名"
            value={this.state.recName}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            name="recTelephone"
            title="手机号"
            maxLength="11"
            type="text"
            placeholder="请填写收货人手机号"
            value={this.state.recTelephone}
            onChange={this.handleChangeTel.bind(this)}
          />
          <AtButton type="primary" formType="submit">
            保存
          </AtButton>
          {idx !== undefined && (
            <AtButton type="primary" className="recDelAddr" onClick={this.handleDelAddr.bind(this)}>
              删除
            </AtButton>
          )}
        </AtForm>
        <AtActionSheet
          isOpened={this.state.isShowIndexes}
          onClose={this.handleShowIndexes.bind(this)}
          cancelText="取消"
          title="目前只支持三个城市"
        >
          <AtActionSheetItem onClick={this.handleChangeCity.bind(this)}>北京市</AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleChangeCity.bind(this)}>淄博市</AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleChangeCity.bind(this)}>济南市</AtActionSheetItem>
        </AtActionSheet>
        <AtModal
          isOpened={this.state.isOopenModal}
          title="确定取消该地址吗"
          cancelText="我再想想"
          confirmText="确定"
          onClose={this.handleDelAddr.bind(this)}
          onCancel={this.handleDelAddr.bind(this)}
          onConfirm={() => this.handleCancelAddr(this.state.recId)}
        />
      </View>
    );
  }
}
export default AddressForm as ComponentClass<PageOwnProps, PageState>;
