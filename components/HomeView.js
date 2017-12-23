import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableHighlight } from 'react-native';

import UserPortfolio from './UserPortfolio';
import MarketCapInfo from './MarketCapInfo';
import CoinInformation from './CoinInformation';



export default class HomeView extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          persistedState: false,
          refreshing: false
        };
      }

      componentWillMount(){
        this.setState({ refreshing: !this.props.coinInfo.marketCapLoaded})
      }

      componentWillReceiveProps(nextProps){
        console.log(nextProps.coinInfo.marketCapLoaded)
        if (nextProps.coinInfo.marketCapLoaded == this.state.refreshing) {
          this.setState({refreshing: !nextProps.coinInfo.marketCapLoaded})
        }
      }

      onRefresh(){
        //this.setState({refreshing:true})
        //setTimeout(()=>this.setState({refreshing:false}), 700)
        this.props.callbackParent()

      }

      render(){

      return (
        <ScrollView
          refreshControl = {
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              />
          }>
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


          {(this.props.coinInfo) ?
            <View>
              <Text style = {styles.textHeader}>coins</Text>
              <View style={styles.bottomBorder}/>
            </View>
            : null
            }

          {
                  (this.props.userInfo.userCoinList.length > 0 && this.props.coinInfo) && (
                    this.props.userInfo.userCoinList.map((coin, i) => {
                      if (coin.name.length > 0){
                        return <View key={i} >
                          <CoinInformation
                            callbackParent={(coin) => this.props.callbackCoinInformation(coin)}
                            symbol = {coin.symbol}
                            name = {coin.name}
                            difference ={coin.change_percent}
                            holding = {coin.holding}
                            totalUSD = {coin.price_usd}/>
                        </View>}
                    })
                  )
                }


                {
                (this.props.userInfo.userCoinList.length == 0) && (
                <TouchableHighlight onPress={() => {this.props.getSearchView(); this.props.getCoins()}}>
                  <Text style={styles.text}>you have no coins in your portfolio {"\n"} add some coins</Text>
                </TouchableHighlight>)
                }



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
  },
  textHeader: {
    textAlign: 'left',
    fontSize: 28,
    color: '#ffffff',
    paddingTop: 15,
    paddingLeft: 7,
    fontFamily: 'HelveticaNeue-Thin'
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});


