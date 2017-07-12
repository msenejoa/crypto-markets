import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, FETCHING_COIN_INFO_SUCCESS, FETCHING_COIN_HISTORY_SUCCESS } from './constants';
import Converter from './components/graphs/dateConverter';


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

export function fetchCoinInfoFromAPI(name) {
  //(name) => dispatch(fetchCoinHistoryFromAPI(name));
  //console.log(name.marketCurrency);
  console.log('anything');
  return (dispatch) => {
    dispatch(fetchCoinHistoryFromAPI(name.marketCurrency))
    dispatch(getCoins())
    fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-' + name.marketCurrency)
    .then(data => data.json())
    .then(json => {
      console.log('json:', json)
      dispatch(getCoinInfoSuccess(json.result, name.name, name.marketCurrency))

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

export function fetchCoinHistoryFromAPI(name) {
  //console.log(name.marketCurrency);X
  return (dispatch) => {
    //dispatch(getCoins())
    fetch('https://min-api.cryptocompare.com/data/histominute?fsym=' + name + '&tsym=USD&limit=100&aggregate=1&e=CCCAGG')
    .then(data => data.json())
    .then(json => {
      //console.log(json.Data[1])
      var newData = Converter(json.Data);
      console.log(newData)
      //console.log('json:', json)
      //dispatch(getCoinHistorySuccess(json.Data))
      dispatch(getCoinHistorySuccess(newData))
    })

    .catch(err => dispatch(getCoinsFailure(err)))
  }
}

export function getCoinHistorySuccess(Data) {
  console.log(Data)
  return {
    type: FETCHING_COIN_HISTORY_SUCCESS,
    Data
  }
}

