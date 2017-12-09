import { FETCHING_COIN_INFO_SUCCESS, FETCHING_COIN_HISTORY_FAILURE, COIN } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  coinInfo: [{price_btc: 0, price_usd: 0}],
  isLoaded: false,
  name: '',
  symbol: '',
  error: false
}

export default function coinsReducer (state = initialState, action) {

  switch (action.type) {
    case FETCHING_COIN_INFO_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        coinInfo: action.data,
        name: action.name,
        symbol: action.symbol
      }
    case FETCHING_COIN_HISTORY_FAILURE:
      return {
        ...state,
        error: true,
      }    
    case COIN:
      return {
        isLoaded: false,
      }
    default:
      return state
  }
}
