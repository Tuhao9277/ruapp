import {
  GET_CATEGORY_LIST,
  ADD_SELECT_ITEM,
  MINUS_SELECT_ITEM,
  CLEAR_CAR,
} from './../constants/list';
import { CHANGE_KEY } from '../constants/list';

export interface IproductList {
  name: string;
  type: number;
  foods: [];
}
interface State {
  productList: IproductList[];
  productCategory: [];
  activeKey: number;
  shopCarData: {};
}
const INITIAL_STATE: State = {
  productList: [],
  productCategory: [],
  activeKey: 0,
  shopCarData: {},
};
const dealWithSelectItem = (state, action, type) => {
  const listData = state.listData;
  // 找到外层左边的list列表
  const list = listData.food_spu_tags || [];
  // 对当前点击的加一 或减一
  const currentItem = list[action.outIndex || state.currentLeftIndex];
  if (type === ADD_SELECT_ITEM) {
    currentItem.spus[action.obj.index].chooseCount++;
  } else {
    currentItem.spus[action.obj.index].chooseCount--;
  }
  const _listData = JSON.parse(JSON.stringify(listData));
  return _listData;
};
const addListItem = (state, payload) => ({
  ...state,
  listData: dealWithSelectItem(state, payload, ADD_SELECT_ITEM),
});

const minusListItem = (state, payload) => ({
  ...state,
  listData: dealWithSelectItem(state, payload, MINUS_SELECT_ITEM),
});
const clearCar = state => {
  const listData = state.listData;
  // 找到外层，左边list列表
  const list = listData.food_spu_tags || [];

  for (let i = 0; i < list.length; i++) {
    const spus = list[i].spus || [];
    for (let j = 0; j < spus.length; j++) {
      spus[j].chooseCount = 0;
    }
  }
  return { ...state, listData: JSON.parse(JSON.stringify(listData)) };
};

export default function product(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case CHANGE_KEY: {
      return {
        ...state,
        activeKey: payload,
        productItemList: state.productList[payload].foods,
      };
    }
    case GET_CATEGORY_LIST: {
      const { data } = payload;
      const productList = data.data;
      const productCategory = productList.map(item => {
        return { title: item.name };
      });
      return {
        ...state,
        productList,
        productCategory,
      };
    }
    case ADD_SELECT_ITEM:
      return addListItem(state, payload);
    case MINUS_SELECT_ITEM:
      return minusListItem(state, payload);
    case CLEAR_CAR:
      return clearCar(state);
    default:
      return state;
  }
}
