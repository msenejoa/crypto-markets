import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';



export default class UserPortfolio extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          total_btc: 0,
          total_usd: 0};
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

              let coin = {
                name: name,
                symbol: symbol,
                holding: holding,
                price_btc: total_btc,
                price_usd: total_usd
              }
              //console.log(coin)
              //console.log(newList)
              newList[index] = coin
              if ((index + 1) == userCoinlist.length){
                console.log(newList)
                //var sumValueBTC = newList.reduce((s, a) => s + a.price_btc, 0);
                //var sumValueUSD = newList.reduce((s, a) => s + a.price_usd, 0);

                //console.log(sumValueUSD)
                //this.setTotal(sumValueBTC, sumValueUSD)
                //this.props.callbackParent(newList)
              }

              //return newList
              //console.log(userCoins)

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

      componentDidMount(){
        //this.props.callbackParent(this.newList)
        console.log('true dude')
      }

      render(){

        //console.log(this.props.userInfo.userCoinList)
        //console.log(this.props.coinInfo.coins)
        var coinInfo = this.props.coinInfo.coins
        var rehydrated =this.props.persistedState.rehydrated
        console.log(rehydrated)
        //var index = coinInfo.findIndex(item => item.name === userList[0].name);
        //console.log(index)
        var userList = this.props.userInfo.userCoinList;
        var newList = []
        if (rehydrated && userList.length > 0){
          var newList = []
          userList.map((value, index)=>
          this.isLoaded(coinInfo, userList, index, newList)

            )
        }
        //this.setTotal()
        var sumValueUSD = newList.reduce((s, a) => s + a.price_usd, 0);
        var sumValueUSD = newList.reduce((s, a) => s + a.price_usd, 0);


        console.log(sumValueUSD)
        //console.log(userList)
        //console.log(coinInfo)
          //var index = coinInfo.findIndex(item => item.name === userList[0].name);
          //var price_btc = coinInfo[index].price_btc;
          //var price_usd = coinInfo[index].price_btc;
          //console.log(index)
          //console.log(this.returnCoinIndex(coinInfo, userList))
          //console.log(price_usd)
          //let index = coinInfo.findIndex(item => item.name === userList[0].name);

        //console.log(coinInfo.indexOf(userList[0]))
      return (


        <View style={styles.container}>
        {/*
      <TouchableHighlight onPress={() => console.log('pressed')}>
        <Text style={styles.text}>Print Object</Text>
      </TouchableHighlight>
*/}
          <Text style={styles.text}>${sumValueUSD}</Text>

        </View>



      );
    }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    paddingTop:20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    //height: 50,
    //alignItems: 'center'
    },
  text: {
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 18
    }
});


