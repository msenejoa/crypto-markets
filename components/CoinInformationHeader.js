import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch } from 'react-native';


export default class CoinInformationHeader extends React.Component {

      state = {
        switchValue: true
      }

      clickFunction() {
        this.setState({switchValue: !this.state.switchValue});
      };

      changeFunction(value){
        if (this.props.coinData.time === '1h'){
          return this.props.coinInfo.coinInfo[0].percent_change_1h;
        }
        if (this.props.coinData.time === '1d'){
          return this.props.coinInfo.coinInfo[0].percent_change_24h;
        }
        if (this.props.coinData.time === '1w'){
          return this.props.coinInfo.coinInfo[0].percent_change_7d;
        }
        else {
          return value;
        }
      };

      render(){

      var price_btc = this.props.coinInfo.coinInfo[0].price_btc;
      var price_usd = this.props.coinInfo.coinInfo[0].price_usd;

      change = this.props.coinData.change;

      this.changeFunction(this.props.coinData.time)


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

          <Text style={styles.text}> {this.changeFunction(change)} %</Text>

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


