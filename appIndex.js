import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet, ScrollView } from 'react-native';
import CoinInformation from './components/CoinInformation';

import Graphs from './components/graph';


import { connect } from 'react-redux';
import { fetchCoinsFromAPI, fetchCoinInfoFromAPI, fetchCoinHistoryFromAPI } from './actions';

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
  const { coinData } = props.coinData;


  return (
    <View style={mainContainer}>

    {
      !isLoaded ?
        <Text style={text}>CryptoMarkets</Text> :
        <View>
          <Text style={textHeader}> {props.coinInfo.name} </Text>
          <Text style={text}> {props.coinInfo.symbol}</Text>
          <Text style={textPrice}> {props.coinInfo.coinInfo.Last} BTC</Text>
        </View>
      }
      <ScrollView>
      {!isFetching &&
      <TouchableHighlight style={button} onPress={() => props.getCoins()}>
        <Text style={buttonText}>Load Coins</Text>
      </TouchableHighlight>
    }
      {
        isFetching && <Text>Loading</Text>
      }
      {isLoaded ? <Graphs graphing = {props.coinData.Data} /> : null}

      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getCoinHistory(props.coinInfo.symbol)}>
        <Text style={buttonText}>Print history</Text>
      </TouchableHighlight>

</ScrollView>
      <ScrollView>
      {
        coins.length ? (
          coins.map((coin, i) => {
            return <View key={i} >
              <CoinInformation
                callbackParent={(coin) => props.getCoinInfo(coin)}
                marketCurrency = {coin.MarketCurrency}
                name = {coin.MarketCurrencyLong}
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
    marginTop: 18
  },
  container: {
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  },
  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    paddingTop: 10,
    fontFamily: 'HelveticaNeue-Thin'
  },
  textPrice: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
    paddingTop: 22,
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
    coinData: state.coinData

  }
}


function mapDispatchToProps (dispatch) {
  return {

    getCoins: () => dispatch(fetchCoinsFromAPI()),
    getCoinInfo: (name) => dispatch(fetchCoinInfoFromAPI(name)),
    getCoinHistory: (name) => dispatch(fetchCoinHistoryFromAPI(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex)
