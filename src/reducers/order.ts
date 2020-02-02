import { GET_ORDER_LIST,SAVE_ORDER_DATA } from '../constants/list';

const INITIAL_STATE = {
  orderList: [],
  currentOrder:{}
};

export default function order(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SAVE_ORDER_DATA :{
      return {
        ...state,
        currentOrder:payload
      }
    }
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
