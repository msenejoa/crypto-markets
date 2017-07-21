
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


class Header extends Component {

  componentDidMount() {
      this.props.callbackParent();
    }

  render() {


    var colorGains = '#03C9A9';


    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>

          <View style={styles.containerTopLeft}>
          {(this.props.userInfo.view != 'home') &&
                <TouchableHighlight
                  onPress = {()=> {this.props.callbackHomeView()}}
                  >
                  <Ionicons name="ios-list-outline" size={32} color={colorGains}/>
                </TouchableHighlight>
    }
          </View>

          <View style={styles.containerTopCenter}>
            <Text style={styles.textHeader}>{this.props.symbol}</Text>
          </View>

          <View style={styles.containerTopRight}>
                <TouchableHighlight
                  onPress = {()=> {}}
                  >
                  <Ionicons name="ios-add-circle-outline" size={32} color={colorGains}/>
                </TouchableHighlight>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerTop: {
    flexDirection: 'row',
    paddingTop:34,
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
    //paddingTop: 15,
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
