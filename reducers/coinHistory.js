import { FETCHING_COIN_HISTORY_SUCCESS, CHANGE_COIN_HISTORY_SUCCESS } from '../constants'
const initialState = {
  Data: [],
  time: '1d',
  change: ''
  //isLoaded: false,
  //name: "",
  //symbol: ""
  //error: false
}

export default function coinsReducer (state = initialState, action) {

  switch (action.type) {
    case FETCHING_COIN_HISTORY_SUCCESS:
      return {
        ...state,
        Data: action.Data,
        time: action.time,
        change: action.change
        //name: action.name,
        //symbol: action.symbol
      }
    case CHANGE_COIN_HISTORY_SUCCESS:
      return {
        ...state,
        time: action.time
      }
    default:
      return state
  }
}
