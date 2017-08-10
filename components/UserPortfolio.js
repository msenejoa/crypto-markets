import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';



export default class UserPortfolio extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isLoaded: false
        };
      }

      returnCoinIndex(coinlist, userCoinlist, index, newList){
            let name = userCoinlist[index].name;
            let symbol = userCoinlist[index].symbol;
            //let holding = userCoinlist[index].holding;
            let holding = 1
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
              console.log(newList)
              if (newList.length == userCoinlist.length){
                console.log(newList)
                console.log(this.state)
                console.log(index)
                if (index+ 1 == newList.length)
                  {console.log('here')}
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
        console.log(list)
        console.log(this.props.persistedState.rehydrated)
        console.log(this.state.isLoaded)
        if (this.props.persistedState.rehydrated && !this.state.isLoaded){
          //console.log(newList)
          this.props.callbackParent(list);
          this.setState({
            isLoaded: true
          })
        }
      }

      render(){


        var coinInfo = this.props.coinInfo.coins
        var rehydrated =this.props.persistedState.rehydrated
        var userList = this.props.userInfo.userCoinList;
        var newList = []
        if (rehydrated && userList.length > 0){
          //var newList = []
          userList.map((value, index)=>{
            this.isLoaded(coinInfo, userList, index, newList);
            }
          );
        }
        //this.setTotal()
        var sumValueBTC = newList.reduce((s, a) => s + a.price_btc, 0);
        var sumValueUSD = newList.reduce((s, a) => s + a.price_usd, 0);
        var sumChangeBTC = newList.reduce((s, a) => s + a.change_btc, 0);
        var sumChangeUSD = newList.reduce((s, a) => s + a.change_usd, 0);
        var totalChange = (sumChangeUSD/sumValueUSD)* 100;

        console.log(newList)

        //this.updatePortfolio(newList)
        //this.setTotal(sumValueBTC, sumValueUSD)
        //console.log(sumValueBTC)

      return (


        <View style={styles.container}>

      <TouchableHighlight onPress={() => console.log(this.state)}>
        <Text style={styles.text}>Print Object</Text>
      </TouchableHighlight>
          <Text style={styles.textPrice}>${sumValueUSD.toFixed(2)}</Text>
          <Text style={styles.textPercentage}>{totalChange.toFixed(2)}%</Text>
          <Text style={styles.textChange}>({sumChangeUSD.toFixed(2)})</Text>
        </View>



      );
    }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    //paddingTop:20,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    //height: 50,
    //alignItems: 'center'
    justifyContent: 'center',
    },
  textPrice: {
    //flex: 1,
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 35,
    textAlign: 'center'
    },
  textChange: {
    //flex: 1,
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 16,
    textAlign: 'center'
    },
  textPercentage: {
    //flex: 1,
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 20,
    textAlign: 'center'
    }
});


