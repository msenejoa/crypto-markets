import { ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN} from '../constants'
const initialState = {
  view: 'home',
  userCoinList: [],
  coinList: []
  //error: false
}

export default function userInfoReducer (state = initialState, action) {

  switch (action.type) {
    case HOME:
      console.log('youre here');
      return {
        ...state,
        view: 'home'
      }
    case COIN:
      console.log('youre in coin view');
      return {
        ...state,
        view: 'coin'
      }
    default:
      return state
  }
}
