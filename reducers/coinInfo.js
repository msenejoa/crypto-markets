import { FETCHING_COIN_INFO_SUCCESS } from '../constants'
const initialState = {
  coinInfo: [],
  isLoaded: false,
  name: "",
  symbol: ""
  //error: false
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
