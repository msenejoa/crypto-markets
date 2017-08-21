import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, FETCHING_COIN_INFO_SUCCESS, FETCHING_COIN_HISTORY_SUCCESS, CHANGE_COIN_HISTORY_SUCCESS, ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN, MARKETCAP, SEARCH, COINLIST, USERCOINLIST, FETCHING_COIN_HISTORY_FAILURE, FORCE_REHYDRATE } from './constants';
import Converter from './components/graphs/dateConverter';
import translate from './components/graphs/timelineConverter';


export function fetchInitialData(name, time, list) {
  return (dispatch) => {
    dispatch(fetchCoinInfoFromAPI(name, time))
    dispatch(fetchCoinListFromAPI())
    dispatch(fetchMarketCapFromAPI())
    dispatch(fetchHomeView())
    dispatch(fetchCoinListFromAPI(list))
  }
}


export function fetchCoinsFromAPI() {
  return (dispatch) => {
    var newList = []
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=150')
    .then(data => data.json())
    .then(data => data.map((i, f) => newList.push({name: i.name, symbol: i.symbol, key: f})))
    .then(() => dispatch(fetchCoinList(newList)))
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}

export function updateUserCoinList(list) {
  return {
    type: USERCOINLIST,
    data: list
  }
}

export function addCoinToUserList(list, coin) {
  return (dispatch) => {
    dispatch(forceRehydrate())
    var newUserCoinList = []
    newUserCoinList = list
    newUserCoinList.push({name: coin.name, symbol: coin.symbol, holding: 0, price_btc: 0, price_usd: 0})
    //console.log(newUserCoinList)
    dispatch(addUserCoinList(newUserCoinList))
  }
}

export function removeCoinfromUserList(list, coin){
  return(dispatch) => {
    coinRemoved = list.filter(coins => coins.name !== coin.name )
    dispatch(removeCoin(coinRemoved))
  }
}


export function fetchCoinListFromAPI(list=[]) {
  return (dispatch) => {
    var newMap = []
    list.map((i, f) => {
      let name = i.name;
      name = name.replace(/\s+/g, '-').toLowerCase();

      fetch('https://api.coinmarketcap.com/v1/ticker/' + name)
      .then(data=> data.json())
      .then(data=>newMap.push(data[0]))
      .then( () => (newMap.length == list.length)? dispatch(getCoinsSuccess(newMap)):null )
    })
  }
}

export function fetchHomeView() {
  return {
    type: HOME
  }
}

export function fetchMarketCap(data) {
  return {
    type: MARKETCAP,
    data,
  }
}

export function fetchCoinList(data) {
  return {
    type: COINLIST,
    data,
  }
}

export function addUserCoinList(data){
  return{
  type: USERCOINLIST,
  data,
  }
}

export function removeCoin(data){
  return{
  type: USERCOINLIST,
  data,
  }
}

export function fetchCoinView() {
  return {
    type: COIN
  }
}

export function forceRehydrate(){
  return{
    type: FORCE_REHYDRATE
  }
}

export function getHomeView() {
  return {
    type: HOME
  }
}

export function getSearchView() {
  return {
    type: SEARCH
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
  console.log(name)
  return (dispatch) => {

    //dispatch(getCoins())
    let coinName = name.name
    let coinLowerCase = coinName.replace(/\s+/g, '-').toLowerCase();
    fetch('https://api.coinmarketcap.com/v1/ticker/' + coinLowerCase)
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
    if (name === 'MIOTA'){ name = 'IOT'}
    fetch('https://min-api.cryptocompare.com/data/' + timeline.time + '?fsym=' + name + '&tsym=USD&limit=' + timeline.limit + '&aggregate='+ timeline.agg + '&e=CCCAGG')
    .then(data => data.json())
    .then(json => {
      var newData = Converter(json.Data);
      var change = newData.change;
      var timeseries = newData.data;
      dispatch(getCoinHistorySuccess(timeseries, time, change));
    })
    .catch(err => dispatch(getCoinHistoryFailure(err)))
  }
}

export function getCoinHistoryFailure(){
  return {
    type: FETCHING_COIN_HISTORY_FAILURE
  }
}

export function fetchMarketCapFromAPI() {
  return (dispatch) => {
    fetch('https://api.coinmarketcap.com/v1/global/')
    .then(data => data.json())
    .then(json => {
    dispatch(fetchMarketCap(json))
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


