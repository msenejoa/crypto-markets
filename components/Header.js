
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, AsyncStorage, Modal } from 'react-native';
import { persistStore } from 'redux-persist'


import Ionicons from 'react-native-vector-icons/Ionicons';

import configureStore from '../configureStore'
import { createPersistor } from 'redux-persist'


class Header extends Component {

  constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
          rehydrated: false,
          loaded: false,
          userCoinList: [],
          change: 0,
          coinName: '',
          view: '',
          symbol: ''
        };
  }



  componentWillReceiveProps(nextprops){
      if (this.state.rehydrated && nextprops.coinInfo.isLoaded){
        this.setState({
          loaded: true,
          userCoinList: nextprops.userInfo.userCoinList,
          change: nextprops.change,
          coinName: nextprops.coinInfo.name,
          view: nextprops.userInfo.view,
          symbol: nextprops.symbol
      });
      }
    if(nextprops.persistedState.rehydrated & !this.state.rehydrated){
      this.setState({
        rehydrated: true
          }
        );
      this.props.callbackParent()
      }
    }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

    let gains = this.state.change;
    let colorGains = gains > 0 ? '#03C9A9' : '#D64541';

    let userCoinList = this.state.userCoinList;
    let coinName = this.state.coinName;
    let inList = false;
    inList = this.checkList(userCoinList, coinName)
;
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.containerTopLeft}>
            {
            (this.props.userInfo.view != 'home') &&
            <TouchableHighlight
              onPress = {()=> {this.props.callbackHomeView()}}>
              <View style={styles.containerIcon}>
                <Ionicons name="ios-arrow-back" size={32} color={colorGains} />
              </View>
            </TouchableHighlight>
            }
          </View>

          <View style={styles.containerTopCenter}>
            {
            (this.props.userInfo.view == 'coin') &&
              <Text style={styles.textHeader}>{this.props.symbol}</Text>
            }
            {
            (this.props.userInfo.view == 'search') &&
              <Text style={styles.textHeader}>search</Text>
            }
            {
            (this.state.view == 'home') &&
              <Text style={styles.textHeader}>portfolio</Text>
            }
          </View>

          <View style={styles.containerTopRight}>
            {
            (this.props.userInfo.view == 'coin' && !inList) &&
            <TouchableHighlight
              onPress={()=> this.props.addCoin()}>
              <View style={styles.containerIcon}>
                <Ionicons name="ios-add-circle-outline" size={32} color={colorGains} />
              </View>
            </TouchableHighlight>
            }
            {
            (this.props.userInfo.view == 'coin' && inList) &&
              <View>
                <TouchableHighlight
                  onPress = {() => {
                    this.setModalVisible(true)
                    }}>
                  <View style={styles.containerIcon}>
                    <Ionicons name="ios-remove-circle" size={32} color={colorGains}/>
                  </View>
                </TouchableHighlight>


                <View>
                  <View>
                    <Modal
                      animationType={"slide"}
                      transparent={true}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {alert("Modal has been closed.")}}
                      >
                      <View style={{marginTop: 200}}>
                      <View style={styles.containerModal}>
                        <View style = {styles.modalMainContainer}>
                          <View style = {styles.modalIcon}>
                            <TouchableHighlight onPress={() => {
                              this.setModalVisible(!this.state.modalVisible)
                              }}>
                              <Ionicons name="ios-close-circle" size={32} color='grey'/>
                            </TouchableHighlight>
                          </View>
                          <View>
                            <View style={styles.body}>
                              <Text style={styles.text}> remove coin from portfolio? </Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableHighlight onPress={()=> {this.props.callbackRemoveCoin(); this.setModalVisible(!this.state.modalVisible)}}>
                                  <Text style ={styles.textButton}>ok</Text>
                                </TouchableHighlight>
                            </View>
                          </View>
                        </View>
                      </View>
                     </View>
                    </Modal>
                  </View>
                </View>
              </View>
              }
              {
              (this.props.userInfo.view == 'home') &&
                <TouchableHighlight
                  onPress = {()=> {this.props.callbackSearchView()}}>
                  <View style={styles.containerIcon}>
                    <Ionicons name="ios-search-outline" size={32} color={colorGains}/>
                  </View>
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
    paddingTop:30,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerIcon: {
    height: 35,
    width: 35

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
  modalMainContainer:{
    height: 200,
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1c',
    borderRadius:10,
    borderWidth: 4,
  },
  text: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'
  },
  containerModal: {
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius:10,
    //justifyContent: 'space-between',
    //flexDirection: 'row',
    //alignItems: 'flex-end'
  },
  modalIcon: {
    alignItems: 'flex-end',
    //justifyContent: 'center',
    paddingRight: 7,
    paddingTop: 7,
    backgroundColor: '#1c1c1c',
    borderRadius: 7
  },
  body: {
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'grey',
    height: 40,
    borderRadius: 7
  },
  textButton: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    color: 'black',
    fontFamily: 'HelveticaNeue-Thin'  }
});





export default Header;
