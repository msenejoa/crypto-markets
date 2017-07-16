import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch } from 'react-native';


export default class CoinInformationHeader extends React.Component {

      state = {
        switchValue: true
      }

      clickFunction() {
        console.log('functioning');
        this.setState({switchValue: !this.state.switchValue});
        console.log(this.state)
      };

      render(){

      var price_btc = this.props.coinInfo.coinInfo[0].price_btc;
      var price_usd = this.props.coinInfo.coinInfo[0].price_usd;

      return (

        <View style={styles.container}>

          <Text style={styles.textHeader}> {this.props.coinInfo.symbol} </Text>
          <Text style={styles.text}> {this.props.coinInfo.name}</Text>
          <TouchableHighlight
            onPress = {() => this.clickFunction()}>
            <Text style={styles.textPrice}>
              {!this.state.switchValue?price_btc + ' BTC':'$' + price_usd}
            </Text>
          </TouchableHighlight>
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


