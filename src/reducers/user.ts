import { SAVE_OPENID } from "./../constants/user"

const INITIAL_STATE = {
  openid: '',
  status:false
}

export default function user (state = INITIAL_STATE, {type,payload}) {
  switch (type) {
    case SAVE_OPENID: {

      return {
        ...state,
        openid:payload,
        status:true
      }
    }
     default:
       return state
  }
}
