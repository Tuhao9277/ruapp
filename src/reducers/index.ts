import { combineReducers } from 'redux'
import user from './user'
import orderTab from './homeOrderMenu'
import product from './productList'
import order from './order'

export default combineReducers({
  user,
  orderTab,
  product,
  order
})
