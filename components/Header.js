
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist'


import Ionicons from 'react-native-vector-icons/Ionicons';

import configureStore from '../configureStore'
import { createPersistor } from 'redux-persist'


class Header extends Component {
  componentDidMount (){
    this.props.callbackParent()
  }


  checkList (userList, name){
    if (userList.filter(item=> item.name == name).length != 0 ){

      return true;
    };
  }

  pushList(object) {
    let newList = [];
    object.forEach((value)=> newList.push(value));
    return newList
  }

  render() {

    var gains = this.props.change;
    var colorGains = gains > 0 ? '#03C9A9' : '#D64541';

    var userCoinList = this.props.userInfo.userCoinList;
    var coinName = this.props.coinInfo.name;

    var inList = false;
    inList = this.checkList(userCoinList, coinName)
;


    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>

          <View style={styles.containerTopLeft}>
          {(this.props.userInfo.view != 'home') &&
                <TouchableHighlight
                  onPress = {()=> {this.props.callbackHomeView()}}
                  >
                  <Ionicons name="ios-arrow-back" size={32} color={colorGains}/>
                </TouchableHighlight>
    }
          </View>

          <View style={styles.containerTopCenter}>
          {(this.props.userInfo.view == 'coin') &&
            <Text style={styles.textHeader}>{this.props.symbol}</Text>
          }
          {(this.props.userInfo.view == 'search') &&
            <Text style={styles.textHeader}>search coin</Text>
          }
          {(this.props.userInfo.view == 'home') &&
            <Text style={styles.textHeader}>portfolio</Text>
          }
          </View>

          <View style={styles.containerTopRight}>

          { (this.props.userInfo.view == 'coin' && !inList) &&
                <TouchableHighlight
                  onPress = {()=> {}}
                  >
                  <Ionicons name="ios-add-circle-outline" size={32} color={colorGains} onPress={()=> this.props.addCoin()}/>
                </TouchableHighlight>
          }

          {   (this.props.userInfo.view == 'coin' && inList) &&
                <TouchableHighlight
                  onPress = {()=> {this.props.callbackRemoveCoin()}}
                  >
                  <Ionicons name="ios-checkmark-circle" size={32} color={colorGains}/>
                </TouchableHighlight>
          }

              { (this.props.userInfo.view == 'home') &&

                <TouchableHighlight
                  onPress = {()=> {this.props.callbackSearchView()}}
                  >
                  <Ionicons name="ios-search-outline" size={32} color={colorGains}/>
                </TouchableHighlight>
}
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerTop: {
    flexDirection: 'row',
    paddingTop:20,
    paddingBottom: 3,
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
    fontFamily: 'HelveticaNeue-Thin'
  },
  textPrice: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
    paddingTop: 10,
    fontFamily: 'HelveticaNeue-Thin'
  },
  text: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  }
});





export default Header;
