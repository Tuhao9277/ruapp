import { GET_ORDER_LIST, SAVE_ORDER_DATA, ORDER_DETAIL } from '../constants/list';

export interface DetailList {
  detailId: string;
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productIcon: string;
}
export interface OrderDetail {
  orderId: string;
  buyerName: string;
  orderPhone: string;
  buyerAddress: string;
  orderAmount: number;
  orderStatus: number;
  payStatus: number;
  buyerOpenid: string;
  orderDetailList: DetailList[];
  createTime: string;
}
interface State {
  orderList: [];
  currentOrder: {};
  currentOrderDetail: OrderDetail;
}
const INITIAL_STATE: State = {
  orderList: [],
  currentOrder: {},
  currentOrderDetail: {
    orderId: '',
    buyerName: '',
    orderPhone: '',
    buyerAddress: '',
    orderAmount: 0,
    orderStatus: 0,
    payStatus: 0,
    buyerOpenid: '',
    orderDetailList: [],
  },
};

export default function order(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SAVE_ORDER_DATA: {
      return {
        ...state,
        currentOrder: payload,
      };
    }
    case ORDER_DETAIL: {
      const { data } = payload.data;
      return {
        ...state,
        currentOrderDetail: data,
      };
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
