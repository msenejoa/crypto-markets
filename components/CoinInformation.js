import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

//import Navbar from 'react-bootstrap/lib/Navbar';
//let styles
//var { getCoins } = props


export default class CoinInformation extends React.Component {
      //const { text } = styles


      render(){
      return (

        <View style={styles.container}>


        <TouchableHighlight onPress={() => this.props.callbackParent(this.props)}>
          <Text style={styles.text}>
            {this.props.name}
          </Text>
        </TouchableHighlight>



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


