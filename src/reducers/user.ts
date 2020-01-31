import { SAVE_OPENID } from './../constants/user';
import { lsReadStr } from '../utils/index';

const INITIAL_STATE = {
  openid: lsReadStr('openid'),
  status: !!lsReadStr('openid'),
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
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
