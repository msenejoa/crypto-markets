import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE } from '../constants'
const initialState = {
  coins: [],
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
    default:
      return state
  }
}
