import { bindActionCreators } from 'redux'
import store from '../store'
import { createApiAction, createAction } from './index'
import api from '../service/api'
import { REGISTER, SAVE_OPENID } from '../constants/user'

// 请求api
export const register = createApiAction(REGISTER, (params) => api.post('register',params))
export const login = createAction(SAVE_OPENID)
export const logout = createApiAction(REGISTER, () => api.get('logout'))

export default bindActionCreators({
  register,
  login
}, store.dispatch)
