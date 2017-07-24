import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, MARKETCAP } from '../constants'
const initialState = {
  coins: [{
    symbol: 'BTC',
    name: 'bitcoin'
  }],
  marketCap: {},
  isFetching: false,
  error: false
}

export default function coinsReducer (state = initialState, action) {
  console.log('000000000000001111101010101010')
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
