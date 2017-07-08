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
    buttonText
  } = styles

  const { coins, isFetching } = props.coins;
  const { coinInfo, isLoaded, name } = props.coinInfo;
  const { coinData } = props.coinData;


  return (
    <View style={container}>

    {
      !isLoaded ?
        <Text style={text}>CryptoMarkets</Text> :
        <View>
          <Text style={text}> {props.coinInfo.name} </Text>
          <Text style={text}> {props.coinInfo.symbol}</Text>
          <Text style={text}> {props.coinInfo.coinInfo.Last} </Text>
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
      {isLoaded ? <Graphs/> : null}

      <TouchableHighlight style={button} onPress={() => console.log(props)}>
        <Text style={buttonText}>Print Object</Text>
      </TouchableHighlight>

      <TouchableHighlight style={button} onPress={() => props.getCoinHistory()}>
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
  container: {
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    textAlign: 'center'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
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
    getCoinHistory: () => dispatch(fetchCoinHistoryFromAPI())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex)
