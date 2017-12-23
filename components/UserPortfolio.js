import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';



export default class UserPortfolio extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          userList: [],
          rehydrated: false,
          coins: [],
          sumChangeUSD: 0
        };
      }

      returnCoinIndex(coinlist, userCoinlist, index, newList){
            let name = userCoinlist[index].name;
            let symbol = userCoinlist[index].symbol;
            //let holding = userCoinlist[index].holding;
            let holding = userCoinlist[index].holding
            var i = coinlist.findIndex(item => item.name === userCoinlist[index].name);
            if (i >= 0){
              let price_btc = coinlist[i].price_btc
              let total_btc = price_btc * holding
              let price_usd = coinlist[i].price_usd
              let total_usd = price_usd * holding
              let change_percent = (coinlist[i].percent_change_24h)/100
              let change_usd = change_percent * total_usd
              let change_btc = change_percent * total_btc

              let coin = {
                name: name,
                symbol: symbol,
                holding: holding,
                price_btc: total_btc,
                price_usd: total_usd,
                change_percent: change_percent,
                change_usd: change_usd,
                change_btc: change_btc
              }

              newList[index] = coin

              if (newList.length == userCoinlist.length){

                if (index+ 1 == newList.length)
                  {}
                  this.updatePortfolio(newList)
              }
            }
          }
      setTotal(btc, usd){
        this.setState({
          total_btc: btc,
          total_usd: usd
        })
      }

      isLoaded(coinlist, userCoinlist, index, newList){
          if ((coinlist.length > 0) && (userCoinlist.length > 0)){
            this.returnCoinIndex(coinlist, userCoinlist, index, newList)
            }
          }

      updatePortfolio(list){
        if (this.props.persistedState.rehydrated && !this.state.isLoaded){
          this.props.callbackParent(list);
          this.setState({
            isLoaded: true
          })
        }
      }

      componentWillReceiveProps(nextprops){
        if (this.props.coinInfo){
          this.setState({coins: nextprops.coinInfo.coins})
        }
        let coinInfo = this.state.coins;
        let rehydrated =this.props.persistedState.rehydrated;
        let userList = this.props.userInfo.userCoinList;
        let newList = []
        if (rehydrated && userList.length > 0){
          userList.map((value, index)=>{
            this.isLoaded(coinInfo, userList, index, newList);
            }
          );
        }
        let sumChangeUSD = newList.reduce((s, a) => s + a.change_usd, 0);
        this.setState({
          userList: newList,
          rehydrated: this.props.persistedState.rehydrated,
          sumChangeUSD: sumChangeUSD
        })
      }

      render(){

        var newList = this.state.userList;
        var sumValueBTC = newList.reduce((s, a) => s + a.price_btc, 0);
        var sumValueUSD = newList.reduce((s, a) => s + a.price_usd, 0);
        var sumChangeBTC = newList.reduce((s, a) => s + a.change_btc, 0);
        var sumChangeUSD = newList.reduce((s, a) => s + a.change_usd, 0);
        var totalChange = (sumChangeUSD/sumValueUSD)* 100;
        var color =  totalChange > 0 ? '#03C9A9' : '#D64541';
        var colorChange = function() {
            return {
              color: color
              };
            };


      return (


        <View style={styles.container}>
          <Text style={styles.textPrice}>${sumValueUSD.toFixed(2)}</Text>
          <Text style={styles.textPercentage}>{totalChange.toFixed(2)}%</Text>
          <Text style={[styles.textChange, colorChange()]}>({this.state.sumChangeUSD.toFixed(2)})</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    },
  text: {
    color: 'white'
  },
  textPrice: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 35,
    textAlign: 'center'
    },
  textChange: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 18,
    textAlign: 'center'
    },
  textPercentage: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 20,
    textAlign: 'center'
    }
});


