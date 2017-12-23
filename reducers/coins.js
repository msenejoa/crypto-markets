import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, MARKETCAP, FETCHING_MARKETCAP } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  coins: [{
    symbol: '',
    name: ''
  }],
  marketCap: {},
  marketCapLoaded: false,
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

    case FETCHING_MARKETCAP:
      return {
        ...state,
        marketCapLoaded: false
      }

    case MARKETCAP:
      return {
        ...state,
        marketCap: action.data,
        marketCapLoaded: true
      }
    default:
      return state
  }
}
