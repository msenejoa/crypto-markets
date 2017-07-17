import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import SmallGraph from './SmallGraph';

//import Navbar from 'react-bootstrap/lib/Navbar';
//let styles
//var { getCoins } = props


export default class CoinInformation extends React.Component {
      render(){
      var change =this.props.difference;
      var change = change > 0 ? '#03C9A9' : '#D64541';
      colorChange = function(change) {
        return {
            backgroundColor: change
          }
      }

      return (

        <View style={styles.container}>

            <View style ={styles.columnLeft}>
              <TouchableHighlight onPress={() => this.props.callbackParent(this.props)}>
                <Text style={styles.text}>
                  {this.props.symbol}
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.columnCenter}>
              <SmallGraph />
            </View>

            <View style={styles.columnRight}>
              <View style={[styles.changeBox, colorChange(change)]}>
                <Text style={styles.textChange}>{this.props.difference}%</Text>
              </View>
            </View>
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
    fontSize: 18,

  },
  textChange: {
    color: '#000000',
    justifyContent: 'center',
    fontFamily: 'HelveticaNeue'

  },
  changeBox: {
    width:75,
    height: 35,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:7,

  },
  columnLeft: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  columnCenter: {
    flex:3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  columnRight: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
  }
});


