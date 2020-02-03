import { bindActionCreators } from 'redux'
import store from '../store'
import { createApiAction, createAction } from './index'
import api from '../service/api'
import { REGISTER, SAVE_OPENID,SAVE_USER_INFO,LOGOUT,GET_USER_ADDRESS,CHANGE_CURRENT_ADDR } from '../constants/user'

// 请求api
export const getUserInfo = createApiAction(SAVE_USER_INFO, (params) => api.get('user/info',params))
export const register = createApiAction(REGISTER, (params) => api.post('register',params))
export const login = createAction(SAVE_OPENID)
export const logout = createApiAction(LOGOUT, () => api.get('logout'))
const getUserAddress= createApiAction(GET_USER_ADDRESS, (params) => api.get('rec/list',params))
const changeCurrentAddr= createAction(CHANGE_CURRENT_ADDR)
export default bindActionCreators({
  register,
  login,
  getUserInfo,
  getUserAddress,
  changeCurrentAddr,
  logout,
}, store.dispatch)
