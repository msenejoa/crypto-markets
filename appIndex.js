import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet, ScrollView } from 'react-native';
import CoinInformation from './components/CoinInformation';

import Graphs from './components/graph';

import SmallGraph from './components/SmallGraph';

import Header from './components/Header';

import CoinInformationStatistics from './components/CoinInformationStatistics';
import MarketCapInfo from './components/MarketCapInfo';

import SearchView from './components/SearchView';

import UserPortfolio from './components/UserPortfolio';

import UserHolding from './components/UserHolding'

import HomeView from './components/HomeView'


import { connect } from 'react-redux';
import { fetchCoinsFromAPI, fetchCoinInfoFromAPI, fetchCoinHistoryFromAPI, changeCoinHistorySuccess, fetchHomeView, fetchCoinListFromAPI, fetchInitialData, fetchCoinView, fetchMarketCapFromAPI, getSearchView, addCoinToUserList, removeCoinfromUserList, updateUserCoinList, forceRehydrate } from './actions';

let styles


const AppIndex = (props) => {

  const {
    container,
    text,
    button,
    buttonText,
    mainContainer,
    textHeader,
    textPrice
  } = styles


  const { coins, isFetching } = props.coins;
  const { coinInfo, isLoaded, name } = props.coinInfo;
  const { coinData, time, change } = props.coinData;
  const { view } = props.userInfo;

  function getInitialData () {
    props.getCoinInfo(props.coinInfo, props.coinData.time);
  };


  return (

    <View style={mainContainer}>
      <Header
        persistedState = {props.persistedState}
        symbol = {props.coinInfo.symbol}
        callbackHomeView = {() => {props.getHomeView(); props.getCoinList(props.userInfo.userCoinList);}}
        callbackSearchView = {() => {props.getSearchView(); props.forceRehydrate()}}
        callbackParent = {() => {props.onInitialization(props.coinInfo, props.coinData.time, props.userInfo.userCoinList)}}
        callbackRemoveCoin = {() => {props.removeCoinFromList(props.userInfo.userCoinList, props.coinInfo)}}
        userInfo= {props.userInfo}
        change = {props.coinData.change}
        coinInfo = {props.coinInfo}
        addCoin = {() => props.addCoinToList(props.userInfo.userCoinList, props.coinInfo)}/>
        {
        props.userInfo.view == 'home' &&
        <HomeView
          userInfo = {props.userInfo}
          coinInfo = {props.coins}
          persistedState = {props.persistedState}
          callbackUserPortfolio = {(list) => {props.updateUserList(list)}}
          callbackMarketCap = {() => {props.getCoinList(props.userInfo.userCoinList)}}
          callbackCoinInformation = {(coin) => {props.getCoinInfo(coin, props.coinData.time); props.getCoinView();}}
          callbackParent = {() => {props.onInitialization(props.coinInfo, props.coinData.time, props.userInfo.userCoinList)}}/>
        }
        {
        props.userInfo.view == 'search' &&
          <SearchView
            data = {props.userInfo.coinList}
            callbackParent ={(coin) => {props.getCoinInfo(coin, props.coinData.time); props.getCoinView();}}
            callbackGetCoins = {() => {props.getCoins(); console.log('pressed')}}/>
        }
        <ScrollView >
      {
        isFetching && <Text>Loading</Text>
      }
      {
      isLoaded && (props.userInfo.view == 'coin') ? <Graphs
        rehydrated = {props.persistedState.rehydrated}
        coinData = {props.coinData}
        coinInfo = {props.coinInfo}
        callbackParent={(time) => props.getCoinHistory(props.coinInfo.symbol, time)}/> : null
      }
      {
      isLoaded && (props.userInfo.view == 'coin') &&
      <CoinInformationStatistics
          coinInfo = {props.coinInfo.coinInfo[0]}
          loaded = {props.coinInfo.isLoaded}
          rehydrated = {props.persistedState.rehydrated}/>
      }
      {
      props.userInfo.view == 'coin' &&
      <UserHolding
        holding={props.userInfo.userCoinList}
        coinInfo={props.coinInfo}
        rehydrated={props.persistedState.rehydrated}
        updateUserList={(list) => {props.updateUserList(list)}}/>
      }
      </ScrollView>
    </View>
  )
}

styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000000',
    marginTop: 0,
    flex: 1
  },
  bodyContainer: {
    paddingTop: 50
  },
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    textAlign: 'center',
    height: 60,
    paddingTop: 10,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  },
  textHeader: {
    textAlign: 'left',
    fontSize: 28,
    color: '#ffffff',
    paddingTop: 15,
    fontFamily: 'HelveticaNeue-Thin'
  },
  textPrice: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
    paddingTop: 18,
    fontFamily: 'HelveticaNeue-Thin'
  },
  button: {
    height: 60,
    //paddingTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 7
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',

  },
  textHeader: {
    textAlign: 'left',
    fontSize: 24,
    paddingLeft: 10,
    color: 'white',
    paddingTop: 20,
    fontFamily: 'HelveticaNeue-Thin'
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
})



function mapStateToProps (state) {
  return {
    coinInfo: state.coinInfo,
    coins: state.coins,
    coinData: state.coinData,
    userInfo: state.userInfo,
    persistedState: state.persistedState

  }
}


function mapDispatchToProps (dispatch) {
  return {
    getCoins: () => dispatch(fetchCoinsFromAPI()),
    onInitialization:(name, time) => dispatch(fetchInitialData(name, time)),
    getCoinInfo: (name, time) => dispatch(fetchCoinInfoFromAPI(name, time)),
    getCoinHistory: (name, time) => dispatch(fetchCoinHistoryFromAPI(name, time)),
    getHomeView: () => dispatch(fetchHomeView()),
    getCoinView: () => dispatch(fetchCoinView()),
    getCoinList: (list) => dispatch(fetchCoinListFromAPI(list)),
    getMarketCap: () => dispatch(fetchMarketCapFromAPI()),
    getSearchView: () => dispatch(getSearchView()),
    addCoinToList: (list, coin) => dispatch(addCoinToUserList(list, coin)),
    removeCoinFromList: (list, coin) => dispatch(removeCoinfromUserList(list, coin)),
    updateUserList: (list) => dispatch(updateUserCoinList(list)),
    forceRehydrate: () => dispatch(forceRehydrate())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex)
