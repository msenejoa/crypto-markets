import { ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN, SEARCH, COINLIST } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'


const initialState = {
  view: 'home',
  userCoinList: [],
  coinList: []
  //error: false
}

export default function userInfoReducer (state = initialState, action) {

  switch (action.type) {
    case HOME:
      return {
        ...state,
        view: 'home'
      }
    case COIN:
      return {
        ...state,
        view: 'coin'
      }
    case SEARCH:
      return {
        ...state,
        view: 'search'
      }
    case COINLIST:
      return {
        ...state,
        coinList: action.data
      }
    default:
      return state
  }
}
