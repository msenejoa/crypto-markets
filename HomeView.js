 import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CoinInformationHeader extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          switchValue: true,
          price: 0,
          price_btc: 0,
          price_usd: 0,
          rehydrated: false,
          isLoaded: false,
          hour: 0,
          day: 0,
          week: 0,
        };
      }

      componentWillReceiveProps(){
        let obj = this.props.coinInfo.coinInfo[0];


        let rehydrated = this.props.rehydrated;
        if (rehydrated){
          let obj = this.props.coinInfo.coinInfo[0];
            if (typeof obj != 'undefined'){
          this.onLoad()
          } else {this.setState({ price: 0, price_btc: 0, price_usd: 0})}
        }
      }

      componentWillUnmount(){
        this.setState({
          switchValue: true,
          price: 0,
          price_btc: 0,
          price_usd: 0,
          rehydrated: false,
          isLoaded: false,
          hour: 0,
          day: 0,
          week: 0,
        })
      }


      clickFunction() {
        this.setState({switchValue: !this.state.switchValue});
      };

      changeFunction(value){
        if (this.props.coinData.time === '1h'){
          return this.state.hour;
        }
        if (this.props.coinData.time === '1d'){
          return this.state.day;
        }
        if (this.props.coinData.time === '1w'){
          return this.state.week;
        }
        else {
          return value;
        }
      };

      onLoad(){
        //console.log(this.props.coinInfo.coinInfo[0])
        let price_btc = this.props.coinInfo.coinInfo[0].price_btc;
        let price_usd =this.props.coinInfo.coinInfo[0].price_usd;
        let hour = this.props.coinInfo.coinInfo[0].percent_change_1h;
        let day = this.props.coinInfo.coinInfo[0].percent_change_24h;
        let week = this.props.coinInfo.coinInfo[0].percent_change_7d;
        this.setState({
          price_btc: price_btc,
          price_usd: price_usd,
          hour: hour,
          day: day,
          week: week,
        });
      }

      render(){
//      price_btc = (this.props.coinInfo.coinInfo[0].price_btc || 0);

      var price_btc = this.state.price_btc;
      //var price_btc = (this.props.coinInfo.coinInfo[0].price_btc.length > 0) ? this.props.coinInfo.coinInfo[0].price_btc: 0;
      var price_usd = this.state.price_usd;

      //var price_usd = this.props.coinInfo.coinInfo[0].price_usd;
      change = this.props.coinData.change;

      this.changeFunction(this.props.coinData.time)
      var colorGains = change > 0 ? '#03C9A9' : '#D64541';

      return (
        <View style={styles.container}>
          <Text style={styles.text}> {this.props.coinInfo.name}</Text>
          <TouchableHighlight
            onPress = {() => this.clickFunction()}>
                  <Text style={styles.textPrice}>
                        {!this.state.switchValue? price_btc + ' BTC':'$' + price_usd}
                  </Text>
          </TouchableHighlight>
          <Text style={styles.text}> {this.changeFunction(change)} %</Text>
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


