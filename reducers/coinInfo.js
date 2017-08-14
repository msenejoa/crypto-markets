import { FETCHING_COIN_INFO_SUCCESS } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  coinInfo: [],
  isLoaded: false,
  name: '',
  symbol: ''
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

    default:
      return state
  }
}
