import { combineReducers } from 'redux'
import user from './user'
import orderTab from './homeOrderMenu'

export default combineReducers({
  user,
  orderTab
})
