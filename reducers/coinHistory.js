import { FETCHING_COIN_HISTORY_SUCCESS, CHANGE_COIN_HISTORY_SUCCESS } from '../constants'
const initialState = {
  Data: [],
  time: '1d',
  change: ''
}

export default function coinsReducer (state = initialState, action) {

  switch (action.type) {
    case FETCHING_COIN_HISTORY_SUCCESS:
      return {
        ...state,
        Data: action.Data,
        time: action.time,
        change: action.change
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
