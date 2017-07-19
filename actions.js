import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, FETCHING_COIN_INFO_SUCCESS, FETCHING_COIN_HISTORY_SUCCESS, CHANGE_COIN_HISTORY_SUCCESS, ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME } from './constants';
import Converter from './components/graphs/dateConverter';
import translate from './components/graphs/timelineConverter';


export function fetchCoinsFromAPI() {
  return (dispatch) => {
    dispatch(getCoins())
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=25')
    .then(data => data.json())
    .then(json => {
      dispatch(getCoinsSuccess(json))
    })
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}

export function fetchHomeView() {
  return {
    type: HOME
  }
}


export function getHomeView() {
  return {
    type: HOME
  }
}

export function getCoins() {
  return {
    type: FETCHING_COINS
  }
}

export function getCoinsSuccess(data) {
  return {
    type: FETCHING_COINS_SUCCESS,
    data,
  }
}

export function getCoinsFailure() {
  return {
    type: FETCHING_COINS_FAILURE
  }
}


export function fetchCoinInfoFromAPI(name, time) {
  return (dispatch) => {
    console.log("this is your input " + name)
    //dispatch(fetchCoinHistoryFromAPI(name.symbol, time))
    dispatch(getCoins())
    fetch('https://api.coinmarketcap.com/v1/ticker/' + name.name)
    .then(data => data.json())
    .then(json => {
      dispatch(getCoinInfoSuccess(json, name.name, name.symbol))
      dispatch(fetchCoinHistoryFromAPI(name.symbol, time))

    })
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}

export function getCoinInfoSuccess(data, name, symbol) {
  return {
    type: FETCHING_COIN_INFO_SUCCESS,
    data,
    name,
    symbol
  }
}

export function fetchCoinHistoryFromAPI(name, time) {
  return (dispatch) => {
    var timeline = translate(time);
    fetch('https://min-api.cryptocompare.com/data/' + timeline.time + '?fsym=' + name + '&tsym=USD&limit=' + timeline.limit + '&aggregate='+ timeline.agg + '&e=CCCAGG')
    .then(data => data.json())
    .then(json => {
      var newData = Converter(json.Data);
      var change = newData.change;
      var timeseries = newData.data;
      dispatch(getCoinHistorySuccess(timeseries, time, change));
    })
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}


export function getCoinHistorySuccess(Data, time, change) {
  return {
    type: FETCHING_COIN_HISTORY_SUCCESS,
    Data,
    time,
    change
  }
}


