import { bindActionCreators } from 'redux'
import {
  GET_CATEGORY_LIST,
} from '../constants/list'
import store from '../store'
import { createApiAction } from './index'
import api from '../service/api'

// 请求api
export const list = createApiAction(GET_CATEGORY_LIST, () => api.get('category/list'))
export default bindActionCreators({
  list,
}, store.dispatch)
