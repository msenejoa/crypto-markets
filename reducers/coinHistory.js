import { FETCHING_COIN_HISTORY_SUCCESS, CHANGE_COIN_HISTORY_SUCCESS, FETCHING_COIN_HISTORY_FAILURE, ETCHING_COIN_HISTORY, FETCHING_COIN_HISTORY } from '../constants'
const initialState = {
  Data: [],
  time: '1d',
  change: '',
  loaded: false,
  error: false
}

export default function coinsReducer (state = initialState, action) {

  switch (action.type) {
    case FETCHING_COIN_HISTORY_SUCCESS:
      return {
        ...state,
        Data: action.Data,
        time: action.time,
        change: action.change,
        error: false,
        loaded: true
      }
    case FETCHING_COIN_HISTORY:
      return{
        ... state, 
        loaded: false
      }
    case CHANGE_COIN_HISTORY_SUCCESS:
      return {
        ...state,
        time: action.time,
        error: false
      }
    case FETCHING_COIN_HISTORY_FAILURE:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
