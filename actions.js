import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, FETCHING_COIN_INFO_SUCCESS, FETCHING_COIN_HISTORY_SUCCESS } from './constants';
import Converter from './components/graphs/dateConverter';
import translate from './components/graphs/timelineConverter';

/*
export function fetchCoinsFromAPI() {
  return (dispatch) => {
    dispatch(getCoins())
    fetch('https://bittrex.com/api/v1.1/public/getmarkets')
    .then(data => data.json())
    .then(json => {
      console.log('json:', json)
      dispatch(getCoinsSuccess(json.result))
    })
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}
*/
export function fetchCoinsFromAPI() {
  return (dispatch) => {
    dispatch(getCoins())
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
    .then(data => data.json())
    .then(json => {
      dispatch(getCoinsSuccess(json))
    })
    .catch(err => dispatch(getCoinsFailure(err)))
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
/*
export function fetchCoinInfoFromAPI(name) {
  console.log('anything');
  return (dispatch) => {
    dispatch(fetchCoinHistoryFromAPI(name.symbol))
    dispatch(getCoins())
    fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-' + name.symbol)
    .then(data => data.json())
    .then(json => {
      console.log('json:', json)
      console.log(name)
      dispatch(getCoinInfoSuccess(json.result, name.name, name.symbol))

    })
*/

export function fetchCoinInfoFromAPI(name) {
  console.log(name.name);
  return (dispatch) => {
    dispatch(fetchCoinHistoryFromAPI(name.symbol))
    dispatch(getCoins())
    fetch('https://api.coinmarketcap.com/v1/ticker/' + name.name)
    .then(data => data.json())
    .then(json => {
      dispatch(getCoinInfoSuccess(json, name.name, name.symbol))

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
/*
export function fetchCoinHistoryFromAPI(name) {
  return (dispatch) => {
    //dispatch(getCoins())
    fetch('https://min-api.cryptocompare.com/data/histominute?fsym=' + name + '&tsym=USD&limit=100&aggregate=1&e=CCCAGG')
    .then(data => data.json())
    .then(json => {
      var newData = Converter(json.Data);
      //dispatch(getCoinHistorySuccess(json.Data))
      dispatch(getCoinHistorySuccess(newData))
    })

    .catch(err => dispatch(getCoinsFailure(err)))
  }
}

*/
export function fetchCoinHistoryFromAPI(name) {
  return (dispatch) => {
    //dispatch(getCoins())
    var timeline = translate('1d');

    fetch('https://min-api.cryptocompare.com/data/' + timeline.time + '?fsym=' + name + '&tsym=USD&limit=' + timeline.limit + '&aggregate='+ timeline.agg + '&e=CCCAGG')
    .then(data => data.json())
    .then(json => {
      //var newData, change = Converter(json.Data);
      var newData = Converter(json.Data);
      var change = newData.change;
      var timeseries = newData.data;
      //dispatch(getCoinHistorySuccess(json.Data))
      console.log(change);
      var time = '1d';
      //var change = 4;
      dispatch(getCoinHistorySuccess(timeseries, time, change))
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

export function changeCoinHistorySuccess(time) {
  return {
    type: CHANGE_COIN_HISTORY_SUCCESS,
    time
  }
}

