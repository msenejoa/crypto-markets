import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet, ScrollView } from 'react-native';
import CoinInformation from './components/CoinInformation';

import Graphs from './components/graph';

import SmallGraph from './components/SmallGraph';

import Header from './components/Header';

import CoinInformationStatistics from './components/CoinInformationStatistics';


import { connect } from 'react-redux';
import { fetchCoinsFromAPI, fetchCoinInfoFromAPI, fetchCoinHistoryFromAPI, changeCoinHistorySuccess, fetchHomeView, fetchCoinListFromAPI, fetchInitialData, fetchCoinView } from './actions';

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
    props.getCoinList();
    props.getCoinInfo(props.coinInfo, props.coinData.time);

  };

  //getInitialData();
  console.log(props)

  return (

    <View style={mainContainer}>

    <Header
      symbol = {props.coinInfo.symbol}
      callbackHomeView = {() => {props.getHomeView(); props.getCoinList();}}
      callbackParent = {() => {props.getHomeView(); props.onInitialization(props.coinInfo, props.coinData.time);}}
      userInfo= {props.userInfo}
      change = {props.coinData.change}
    />


 {/*
      <TouchableHighlight style={button} onPress={() => props.getCoinList()}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>
*/}
      <TouchableHighlight style={button} onPress={() => props.getCoins()}>
        <Text style={buttonText}>Get List</Text>
      </TouchableHighlight>
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
      {isLoaded ? <Graphs
          coinData = {props.coinData}
          coinInfo = {props.coinInfo}
          callbackParent={(time) => props.getCoinHistory(props.coinInfo.symbol, time)}
          /> : null}

      {isLoaded && (props.userInfo.view != 'home') &&

      <CoinInformationStatistics
          coinInfo = {props.coinInfo.coinInfo[0]}/>

      }

{/*
      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getCoinHistory(props.coinInfo, props.coinData.time)}>
        <Text style={buttonText}>Print history</Text>
      </TouchableHighlight>
    */}


{
        coins.length ? (
          coins.map((coin, i) => {
            return <View key={i} >
              <CoinInformation
                callbackParent={(coin) => {props.getCoinInfo(coin, props.coinData.time); props.getCoinView();}}
                symbol = {coin.symbol}
                name = {coin.name}
                difference ={coin.percent_change_24h}
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
    textAlign: 'center',
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
  }
})



function mapStateToProps (state) {
  return {
    coinInfo: state.coinInfo,
    coins: state.coins,
    coinData: state.coinData,
    userInfo: state.userInfo

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
    getCoinList: () => dispatch(fetchCoinListFromAPI())

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex)
