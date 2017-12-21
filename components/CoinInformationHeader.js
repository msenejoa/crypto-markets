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
          loaded: false,
          active: false
        };
      }

      componentWillReceiveProps(nextProps){
        let obj = this.props.coinInfo.coinInfo[0];
        let rehydrated = this.props.rehydrated;
        if (rehydrated & nextProps.coinInfo.isLoaded & !this.state.isLoaded & !nextProps.coinData.error) {
          this.onLoad()
        }
        if (nextProps.active != this.state.active){
          this.setState({
            active: nextProps.active
            }
          )}

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
          loaded: true
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
        let price_btc = this.props.coinInfo.coinInfo[0].price_btc;
        let price_usd =this.props.coinInfo.coinInfo[0].price_usd;
        let hour = this.props.coinInfo.coinInfo[0].percent_change_1h;
        let day = this.props.coinInfo.coinInfo[0].percent_change_24h;
        let week = this.props.coinInfo.coinInfo[0].percent_change_7d;
        this.changeFunction(this.props.coinData.time)
        this.setState({
          price_btc: price_btc,
          price_usd: price_usd,
          hour: hour,
          day: day,
          week: week,
          isLoaded: true
        });
      }

      render(){
        let { price_btc, price_usd, switchValue } = this.state
        let change = this.props.coinData.change;
        //console.log(this.props)
        let colorGains = change > 0 ? '#03C9A9' : '#D64541';


        return (
          <View style={styles.container}>
            <Text style={styles.text}> {this.props.coinInfo.name}</Text>
            <TouchableHighlight
              onPress = {() => this.clickFunction()}>
                    {!this.props.active ?
                    <Text style={styles.textPrice}>
                          {!switchValue? this.state.price_btc + ' BTC':'$' + this.state.price_usd}
                    </Text>:
                    <Text style={styles.textPrice}>
                          ${this.props.price}
                    </Text>
                    }                   

            </TouchableHighlight>

              {!this.props.active ?
                    <Text style={styles.text}> {this.changeFunction(change)} %</Text>:
                    <Text style={styles.text}>
                          {this.props.date}
                    </Text>
                    }    


            




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


