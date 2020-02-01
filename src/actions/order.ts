import { bindActionCreators } from 'redux';
import { GET_ORDER_LIST} from '../constants/list'
import store from '../store';
import { createApiAction } from './index';
import api from '../service/api';

// 请求api
const getorderList = createApiAction(GET_ORDER_LIST, (params) => api.get('order/list',params));
export default bindActionCreators(
  {
    getorderList,
  },
  store.dispatch,
);
