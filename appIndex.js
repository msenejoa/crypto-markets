import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet, ScrollView } from 'react-native';
import CoinInformation from './components/CoinInformation';

import Graphs from './components/graph';

import SmallGraph from './components/SmallGraph';

import Header from './components/Header';


import { connect } from 'react-redux';
import { fetchCoinsFromAPI, fetchCoinInfoFromAPI, fetchCoinHistoryFromAPI, changeCoinHistorySuccess, fetchHomeView } from './actions';

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

  //getInitialData();


  return (

    <View style={mainContainer}>
    <Header
      callbackParent = {() => props.getCoinInfo(props.coinInfo, props.coinData.time)}
    />

          {/*
      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getHomeView()}>
        <Text style={buttonText}>ReturnHomeView</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getCoinHistory(props.coins.coins[0].symbol, props.coinData.time)}>
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

      <ScrollView>


      {!isFetching &&
      <TouchableHighlight style={button} onPress={() => props.getCoins()}>
        <Text style={buttonText}>Load Coins</Text>
      </TouchableHighlight>
    }
      {
        isFetching && <Text>Loading</Text>
      }
      {isLoaded ? <Graphs
          coinData = {props.coinData}
          coinInfo = {props.coinInfo}
          callbackParent={(time) => props.getCoinHistory(props.coinInfo.symbol, time)}
          /> : null}
{/*
      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getCoinHistory(props.coinInfo, props.coinData.time)}>
        <Text style={buttonText}>Print history</Text>
      </TouchableHighlight>
    */}

</ScrollView>

      <ScrollView>
      {
        coins.length ? (
          coins.map((coin, i) => {
            return <View key={i} >
              <CoinInformation
                callbackParent={(coin) => props.getCoinInfo(coin, props.coinData.time)}
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
    marginTop: 0
  },
  container: {
    marginTop: 20,
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
    getCoinInfo: (name, time) => dispatch(fetchCoinInfoFromAPI(name, time)),
    getCoinHistory: (name, time) => dispatch(fetchCoinHistoryFromAPI(name, time)),
//    updateGetCoinHistory: (name, time) =>dispatch(changeCoinHistorySuccess(name, time))
    getHomeView: () => dispatch(fetchHomeView()),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex)
