import { combineReducers } from 'redux'
import counter from './counter'
import orderTab from './homeOrderMenu'

export default combineReducers({
  counter,
  orderTab
})
