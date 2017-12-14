import { ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN, FORCE_REHYDRATE} from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  rehydrated: false
  }

export default function persistedState (state = initialState, action) {

  switch (action.type) {
    case REHYDRATE:
      var incoming = action.payload.userInfo
      if (incoming)
        return {
          ...state,
          ...incoming,
          rehydrated: true
        }
    case FORCE_REHYDRATE:
      return {
        rehydrated: true
      }
    default:
      return state
  }
}
