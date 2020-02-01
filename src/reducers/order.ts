import { GET_ORDER_LIST } from '../constants/list';

const INITIAL_STATE = {
  orderList: [],
};

export default function order(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_ORDER_LIST: {
      const { data } = payload.data;
      return {
        ...state,
        orderList: data,
      };
    }
    default:
      return state;
  }
}
