import { ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN} from '../constants'
import {REHYDRATE} from 'redux-persist/constants'



export default function persistedState (state = {}, action) {

  switch (action.type) {
    case REHYDRATE:
      console.log(action.payload)
      var incoming = action.payload.userInfo
      if (incoming)
        return {
          ...state,
          ...incoming
        }
    default:
      return state
  }
}
