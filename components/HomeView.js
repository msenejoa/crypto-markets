import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import UserPortfolio from './UserPortfolio';
import MarketCapInfo from './MarketCapInfo';



export default class HomeView extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          persistedState: false
        };
      }

      componentWillReceiveProps(){
        console.log('homeview');
        console.log(this.props.persistedState.rehydrated);
        //if this.props.persistedState.rehydrated;
      }



      render(){
      console.log(this.props)

      return (
        <ScrollView>
          <UserPortfolio
              userInfo = {this.props.userInfo}
              coinInfo = {this.props.coinInfo}
              persistedState = {this.props.persistedState}
              callbackParent = {(list) => {this.props.callbackUserPortfolio(list)}}
          />

          <MarketCapInfo
            coins = {this.props.coinInfo}
            isLoaded = {this.props.persistedState.rehydrated}
            callbackParent = {() => {this.props.callbackMarketCap()}}
          />
        </ScrollView>
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
  text: {
    textAlign: 'center',
    //paddingTop: 5,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'
  }
});


