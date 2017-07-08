import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

//import Navbar from 'react-bootstrap/lib/Navbar';
//let styles
//var { getCoins } = props


export default class CoinInformation extends React.Component {
      //const { text } = styles


      render(){
      return (

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          //justifyContent: 'center',
          height: 50,
          alignItems: 'center',

        }}>


        <TouchableHighlight onPress={() => this.props.callbackParent(this.props)}>
          <Text>
            {this.props.marketCurrency}
          </Text>
        </TouchableHighlight>



          <Text>{this.props.name}</Text>


        </View>

      );
    }
}


