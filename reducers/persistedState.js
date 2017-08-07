import { ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN} from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  rehydrated: false
  }

export default function persistedState (state = initialState, action) {

  switch (action.type) {
    case REHYDRATE:
      console.log(action.payload)
      var incoming = action.payload.userInfo
      if (incoming)
        return {
          ...state,
          ...incoming,
          rehydrated: true
        }
    default:
      return state
  }
}
