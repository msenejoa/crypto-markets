import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';



export default class UserPortfolio extends React.Component {
      render(){

        //console.log(this.props.userInfo.userCoinList)
        //console.log(this.props.coinInfo.coins)
        var coinInfo = this.props.coinInfo.coins
        //var index = coinInfo.findIndex(item => item.name === userList[0].name);
        //console.log(index)
        var userList = this.props.userInfo.userCoinList;
       // console.log(userList)
       // console.log(coinInfo)
        if (coinInfo.length > 0 && userList.length > 0){
          console.log(coinInfo[0])
          console.log(userList[0])
          let index = coinInfo.findIndex(item => item.name === userList[0].name);
          console.log(index)
        }
          //let index = coinInfo.findIndex(item => item.name === userList[0].name);

        //console.log(coinInfo.indexOf(userList[0]))
      return (


        <View style={styles.container}>

          <Text style={styles.text}>Some  loud af text</Text>

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


