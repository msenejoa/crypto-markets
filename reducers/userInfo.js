import { ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME } from '../constants'
const initialState = {
  view: '',
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
    default:
      return state
  }
}
