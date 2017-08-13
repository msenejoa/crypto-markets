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


import { connect } from 'react-redux';
import { fetchCoinsFromAPI, fetchCoinInfoFromAPI, fetchCoinHistoryFromAPI, changeCoinHistorySuccess, fetchHomeView, fetchCoinListFromAPI, fetchInitialData, fetchCoinView, fetchMarketCapFromAPI, getSearchView, addCoinToUserList, removeCoinfromUserList, updateUserCoinList } from './actions';

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
      symbol = {props.coinInfo.symbol}
      callbackHomeView = {() => {props.getHomeView(); props.getCoinList(props.userInfo.userCoinList);}}
      callbackSearchView = {() => props.getSearchView()}
      callbackParent = {() => {props.onInitialization(props.coinInfo, props.coinData.time, props.userInfo.userCoinList)}}
      callbackRemoveCoin = {() => {props.removeCoinFromList(props.userInfo.userCoinList, props.coinInfo)}}
      userInfo= {props.userInfo}
      change = {props.coinData.change}
      coinInfo = {props.coinInfo}
      addCoin = {() => props.addCoinToList(props.userInfo.userCoinList, props.coinInfo)}
    />


    {/*
*/}

{ props.userInfo.view == 'search' &&
    <SearchView
      data = {props.userInfo.coinList}
      callbackParent ={(coin) => {props.getCoinInfo(coin, props.coinData.time); props.getCoinView();}}
      callbackGetCoins = {() => {props.getCoins(); console.log('pressed')}}
    />
}
       {/*

      <TouchableHighlight style={button} onPress={() => props.getCoins()}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>Get List</Text>
      </TouchableHighlight>

      */}
{/*
      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>DEFAULT</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getCoinInfo(props.coinInfo, props.coinData.time)}>
        <Text style={buttonText}>DEFAULT</Text>
      </TouchableHighlight>
 */}

    {
      !isLoaded &&
        <Text style={text}>CryptoMarkets</Text>

      }


      {/*
      <Text style = {text}> Always view</Text>
*/}

      <ScrollView >
{ props.userInfo.view == 'home' &&
    <UserPortfolio
      userInfo = {props.userInfo}
      coinInfo = {props.coins}
      persistedState = {props.persistedState}
      callbackParent = {(list) => {props.updateUserList(list)}}
    />
}

{/*

      {!isFetching &&

      <TouchableHighlight style={button} onPress={() => props.getCoins()}>
        <Text style={buttonText}>Load Coins</Text>
      </TouchableHighlight>
    }
*/}

      {
        isFetching && <Text>Loading</Text>
      }
      {isLoaded && (props.userInfo.view == 'coin') ? <Graphs
          coinData = {props.coinData}
          coinInfo = {props.coinInfo}
          callbackParent={(time) => props.getCoinHistory(props.coinInfo.symbol, time)}
          /> : null}

      {isLoaded && (props.userInfo.view == 'coin') &&

      <CoinInformationStatistics
          coinInfo = {props.coinInfo.coinInfo[0]}/>

      }
      { (props.userInfo.view == 'home') &&
      <MarketCapInfo
        coins = {props.coins}
        isLoaded = {props.persistedState.rehydrated}
        callbackParent = {() => {props.getCoinList(props.userInfo.userCoinList)}}
      />

}{props.userInfo.view == 'coin' &&
<UserHolding />
}

{/*
      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getCoinHistory(props.coinInfo, props.coinData.time)}>
        <Text style={buttonText}>Print history</Text>
      </TouchableHighlight>
    */}

{(coins.length && props.userInfo.view == 'home') ?
  <View>
  <Text style = {styles.textHeader}>coins</Text>
  <View style={styles.bottomBorder}/>
</View>


: null}
{
        (coins.length && props.userInfo.view == 'home') ? (
          props.userInfo.userCoinList.map((coin, i) => {
            return <View key={i} >
              <CoinInformation
                callbackParent={(coin) => {props.getCoinInfo(coin, props.coinData.time); props.getCoinView();}}
                symbol = {coin.symbol}
                name = {coin.name}
                difference ={coin.change_percent}
                holding = {coin.holding}
                totalUSD = {coin.price_usd}
              />



            </View>
          })
        ) : null
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#336E7B'
  },
  buttonText: {
    color: 'white'
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
//    updateGetCoinHistory: (name, time) =>dispatch(changeCoinHistorySuccess(name, time))
    getHomeView: () => dispatch(fetchHomeView()),
    getCoinView: () => dispatch(fetchCoinView()),
    getCoinList: (list) => dispatch(fetchCoinListFromAPI(list)),
    getMarketCap: () => dispatch(fetchMarketCapFromAPI()),
    getSearchView: () => dispatch(getSearchView()),
    addCoinToList: (list, coin) => dispatch(addCoinToUserList(list, coin)),
    removeCoinFromList: (list, coin) => dispatch(removeCoinfromUserList(list, coin)),
    updateUserList: (list) => dispatch(updateUserCoinList(list))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex)
