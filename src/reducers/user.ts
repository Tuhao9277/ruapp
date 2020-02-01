import { SAVE_OPENID, SAVE_USER_INFO } from './../constants/user';
import { lsReadStr } from '../utils/index';

const INITIAL_STATE = {
  openid: lsReadStr('openid'),
  status: !!lsReadStr('openid'),
  userInfo:{}
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SAVE_USER_INFO:{
      const {data} = payload.data
      return {
        ...state,
        userInfo:data

      }
    }
    case SAVE_OPENID: {
      return {
        ...state,
        openid: payload,
        status: true,
      };
    }
    default:
      return state;
  }
}
