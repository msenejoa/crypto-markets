import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, MARKETCAP } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  coins: [{
    symbol: '',
    name: ''
  }],
  marketCap: {},
  isFetching: false,
  error: false
}

export default function coinsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COINS:
      return {
        ...state,
        coins: [],
        isFetching: true
      }
    case FETCHING_COINS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        coins: action.data
      }
    case FETCHING_COINS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case MARKETCAP:
      return {
        ...state,
        marketCap: action.data
      }
    default:
      return state
  }
}
