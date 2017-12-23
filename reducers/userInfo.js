import { ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN, SEARCH, COINLIST, USERCOINLIST, FETCHING_COIN_LIST } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'


const initialState = {
  view: 'home',
  userCoinList: [],
  coinList: [],
  rehydrated: false,
  coinListLoaded: true
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
        coinList: action.data,
        coinListLoaded: true
      }
    case USERCOINLIST:
      return {
        ...state,
        userCoinList: action.data
      }
    case FETCHING_COIN_LIST:
      return {
        ...state,
        coinListLoaded: false
      }
      /*
    case REHYDRATE:
      return {
        ...state,
        rehydrated: true
      }*/
    default:
      return state
  }
}
