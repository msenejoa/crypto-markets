import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';




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

      console.log(change)

      var colorGains = change > 0 ? '#03C9A9' : '#D64541';


      return (



        <View style={styles.container}>

          <Text style={styles.text}> {this.props.coinInfo.name}</Text>
          <TouchableHighlight
            onPress = {() => this.clickFunction()}>
            <Text style={styles.textPrice}>
              {!this.state.switchValue?price_btc + ' BTC':'$' + price_usd}
            </Text>
          </TouchableHighlight>

          <Text style={styles.text}> {this.changeFunction(change)} %</Text>

{/*
      <Ionicons name="ios-add-circle-outline" size={32} color="green" />
      <Ionicons name="ios-checkmark-circle" size={32} color="green" />
      <Ionicons name="ios-list-outline" size={32} color="green" />
*/}


        </View>

      );
    }
}

const styles = StyleSheet.create({
  containerTop: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {

  },
  containerTopLeft: {
    flex:3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10
  },
  containerTopCenter:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerTopRight: {
    flex:3,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 28,
    color: '#ffffff',
    //paddingTop: 15,
    fontFamily: 'HelveticaNeue-Thin'
  },
  textPrice: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
    paddingTop: 5,
    fontFamily: 'HelveticaNeue-Thin'
  },
  text: {
    textAlign: 'center',
    //paddingTop: 5,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  }
});


