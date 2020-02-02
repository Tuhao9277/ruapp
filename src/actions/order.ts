import { bindActionCreators } from 'redux';
import { GET_ORDER_LIST,SAVE_ORDER_DATA,CREATE_ORDER_LIST,ORDER_DETAIL} from '../constants/list'
import store from '../store';
import { createApiAction, createAction } from './index';
import api from '../service/api';

// 请求api
const getorderList = createApiAction(GET_ORDER_LIST, (params) => api.get('order/list',params));
const saveOrderData = createAction(SAVE_ORDER_DATA)
const createorderList = createApiAction(CREATE_ORDER_LIST, (params) => api.post('order/create',params));
const orderDetail = createApiAction(ORDER_DETAIL, (params) => api.get('order/detail',params));

export default bindActionCreators(
  {
    getorderList,
    saveOrderData,
    createorderList,
    orderDetail
  },
  store.dispatch,
);
