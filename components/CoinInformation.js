import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import SmallGraph from './SmallGraph';

//import Navbar from 'react-bootstrap/lib/Navbar';
//let styles
//var { getCoins } = props


export default class CoinInformation extends React.Component {

      render(){
      return (

        <View style={styles.container}>


        <TouchableHighlight onPress={() => this.props.callbackParent(this.props)}>
          <Text style={styles.text}>
            {this.props.name}
          </Text>
        </TouchableHighlight>

          <SmallGraph />

          <Text style={styles.text}>{this.props.symbol}</Text>


        </View>

      );
    }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
//justifyContent: 'center',
  height: 50,
  alignItems: 'center'
  },
  text: {
    color: '#ffff'
  }
});


