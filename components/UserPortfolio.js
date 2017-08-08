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

              newList[index] = coin
              if ((index + 1) == userCoinlist.length){
                console.log(newList)
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

      componentDidMount(){
        //this.props.callbackParent(this.newList)
        console.log('true dude')
      }

      render(){


        var coinInfo = this.props.coinInfo.coins
        var rehydrated =this.props.persistedState.rehydrated
        var userList = this.props.userInfo.userCoinList;
        var newList = []
        if (rehydrated && userList.length > 0){
          var newList = []
          userList.map((value, index)=>
          this.isLoaded(coinInfo, userList, index, newList)
            );
        }
        //this.setTotal()
        var sumValueBTC = newList.reduce((s, a) => s + a.price_btc, 0);
        var sumValueUSD = newList.reduce((s, a) => s + a.price_usd, 0);

        console.log(this.state)
        //this.setTotal(sumValueBTC, sumValueUSD)
        console.log(sumValueBTC)

      return (


        <View style={styles.container}>
        {/*
      <TouchableHighlight onPress={() => console.log('pressed')}>
        <Text style={styles.text}>Print Object</Text>
      </TouchableHighlight>
*/}
          <Text style={styles.textPrice}>${sumValueUSD.toFixed(2)}</Text>
          <Text style={styles.textPercentage}>change%</Text>
          <Text style={styles.textChange}>(-12.6)</Text>
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
    fontSize: 20,
    textAlign: 'center'
    },
  textPercentage: {
    //flex: 1,
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 18,
    textAlign: 'center'
    }
});


