import Taro from '@tarojs/taro';
import {
  SAVE_OPENID,
  SAVE_USER_INFO,
  LOGOUT,
  GET_USER_ADDRESS,
  CHANGE_CURRENT_ADDR,
} from './../constants/user';
import { lsReadStr, lsRemove, lsSave } from '../utils/index';

const INITIAL_STATE = {
  openid: lsReadStr('openid'),
  status: !!lsReadStr('openid'),
  buyerId: lsReadStr('buyerId'),
  userInfo: {
    account: 0,
    username: '',
    buyerId: '',
  },
  addressList: [],
  currentAddress: {
    recId: '',
    buyerId: '',
    recName: '',
    recTelephone: '',
    recAddress: '',
  },
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SAVE_USER_INFO: {
      const { data } = payload.data;
      lsSave('buyerId', data.buyerId);
      return {
        ...state,
        userInfo: data,
        buyerId: data.buyerId,
      };
    }
    case GET_USER_ADDRESS: {
      Taro.hideLoading();
      const { data } = payload.data;
      return {
        ...state,
        addressList: data,
        currentAddress: data[0] ||INITIAL_STATE.currentAddress,
      };
    }
    case CHANGE_CURRENT_ADDR: {
      return {
        ...state,
        currentAddress: payload,
      };
    }
    case SAVE_OPENID: {
      return {
        ...state,
        openid: payload,
        status: true,
      };
    }
    case LOGOUT: {
      Taro.showToast({
        title: '登出成功',
        icon: 'none',
      });
      lsRemove('openid');
      return {
        ...state,
        ...INITIAL_STATE,
        openid: '',
        status: false,
      };
    }
    default:
      return state;
  }
}
