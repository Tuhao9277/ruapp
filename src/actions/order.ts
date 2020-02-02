import { bindActionCreators } from 'redux';
import { GET_ORDER_LIST,SAVE_ORDER_DATA} from '../constants/list'
import store from '../store';
import { createApiAction, createAction } from './index';
import api from '../service/api';

// 请求api
const getorderList = createApiAction(GET_ORDER_LIST, (params) => api.get('order/list',params));
const saveOrderData = createAction(SAVE_ORDER_DATA)

export default bindActionCreators(
  {
    getorderList,
    saveOrderData
  },
  store.dispatch,
);
