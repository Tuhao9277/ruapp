import Taro from '@tarojs/taro';
import { SAVE_OPENID, SAVE_USER_INFO, LOGOUT } from './../constants/user';
import { lsReadStr, lsRemove } from '../utils/index';

const INITIAL_STATE = {
  openid: lsReadStr('openid'),
  status: !!lsReadStr('openid'),
  userInfo: {
    account: 0,
    username: '',
  },
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SAVE_USER_INFO: {
      const { data } = payload.data;
      return {
        ...state,
        userInfo: data,
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
