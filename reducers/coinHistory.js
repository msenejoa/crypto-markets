import { FETCHING_COIN_HISTORY_SUCCESS } from '../constants'
const initialState = {
  Data: [],
  //isLoaded: false,
  //name: "",
  //symbol: ""
  //error: false
}

export default function coinsReducer (state = initialState, action) {
  console.log(action.Data)
  switch (action.type) {
    case FETCHING_COIN_HISTORY_SUCCESS:
      return {
        ...state,
        Data: action.Data
        //name: action.name,
        //symbol: action.symbol
      }
    default:
      return state
  }
}
