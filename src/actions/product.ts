import { bindActionCreators } from 'redux';
import { GET_CATEGORY_LIST, CHANGE_KEY, ADD_SELECT_ITEM, MINUS_SELECT_ITEM, CLEAR_CAR } from '../constants/list'
import store from '../store';
import { createApiAction, createAction } from './index';
import api from '../service/api';

// 请求api
const getMenuList = createApiAction(GET_CATEGORY_LIST, () => api.get('product/list'));
const changeMenuKey = createAction(CHANGE_KEY);
const addSelectItem = createAction(ADD_SELECT_ITEM);
const minusSelectItem = createAction(MINUS_SELECT_ITEM);
const clearCar = createAction(CLEAR_CAR);

export default bindActionCreators(
  {
    addSelectItem,
    minusSelectItem,
    getMenuList,
    changeMenuKey,
    clearCar,
  },
  store.dispatch,
);
