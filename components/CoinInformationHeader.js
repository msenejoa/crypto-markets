import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';


export default class CoinInformationHeader extends React.Component {

      render(){
      return (

        <View style={styles.container}>

          <Text style={styles.textHeader}> {this.props.coinInfo.symbol} </Text>
          <Text style={styles.text}> {this.props.coinInfo.name}</Text>
          <Text style={styles.textPrice}> {this.props.coinInfo.coinInfo[0].price_btc} BTC</Text>
          <Text style={styles.text}> {this.props.coinData.change} %</Text>

        </View>

      );
    }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'space-between',
//justifyContent: 'center',
    //height: 50,
    //alignItems: 'center'
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
  text: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  }
});


