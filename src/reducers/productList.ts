import {
  GET_CATEGORY_LIST,
  ADD_SELECT_ITEM,
  MINUS_SELECT_ITEM,
  CLEAR_CAR,
} from './../constants/list';
import { CHANGE_KEY } from '../constants/list';
import { Ifood } from './../pages/menu/menu';

export interface IproductList {
  name: string;
  type: number;
  spus: Ifood[];
}
interface State {
  productCategory: [];
  activeKey: number;
  shopCarData: IproductList[];
  totalCount: number;
  gussusLike: [];
}
const INITIAL_STATE: State = {
  productCategory: [],
  activeKey: 0,
  totalCount: 0,
  shopCarData: [],
  gussusLike: [],
};
const dealWithSelectItem = (state: State, { id, outIndex }, type) => {
  const listData = state.shopCarData;
  const leftIndex = state.activeKey;
  const productId = id;
  const list = listData;
  const currentItem = list[outIndex || leftIndex];
  // 找到外层左边的list列表
  // 对当前点击的加一 或减一
  if (type === ADD_SELECT_ITEM) {
    if (currentItem['spus'][productId].chooseCount) {
      currentItem['spus'][productId].chooseCount++;
    } else {
      currentItem['spus'][productId].chooseCount = 1;
    }
  } else {
    currentItem['spus'][productId].chooseCount--;
  }
  const _listData = JSON.parse(JSON.stringify(listData));
  return _listData;
};
const addListItem = (state, payload) => ({
  ...state,
  totalCount: ++state.totalCount,
  shopCarData: dealWithSelectItem(state, payload, ADD_SELECT_ITEM),
});

const minusListItem = (state, payload) => ({
  ...state,
  totalCount: --state.totalCount,
  shopCarData: dealWithSelectItem(state, payload, MINUS_SELECT_ITEM),
});
const clearCar = state => {
  const shopCarData = []
  return { ...state, shopCarData};
};

export default function product(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case CHANGE_KEY: {
      return {
        ...state,
        activeKey: payload,
      };
    }
    case GET_CATEGORY_LIST: {
      const { data } = payload;
      const productList = data.data;
      const productCategory = productList.map(item => {
        return { title: item.name };
      });
      const shopCarData = productList.map(item => {
        return { name: item.name, type: item.type, spus: item.foods };
      });
      return {
        ...state,
        productCategory,
        shopCarData,
        gussusLike: shopCarData[0].spus,
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
