
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,TextInput, FlatList, ScrollView } from 'react-native';


class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

/*
var a = [1, 2, 3], b = [101, 2, 1, 10];
var c = a.concat(b.filter(function (item) {
    return a.indexOf(item) < 0;
}));
*/

  render() {

  var coins = this.props.data,
      searchString = this.state.text.trim().toLowerCase();
  if (searchString.length > 0) {
    coinName = coins.filter(coin => coin.name.toLowerCase().match( searchString ));
    coinSymbol = coins.filter(coin => coin.symbol.toLowerCase().match( searchString ));
    coins = coinName.concat(coinSymbol.filter(item => coinName.indexOf(item) < 0));
  }

  return (
    <View style ={styles.mainContainer}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
        onChangeText={(text) => {this.setState({text})}}/>
          <View style={styles.container}>
            <FlatList
              data={coins}
              renderItem={
                ({item}) =>(
                  <TouchableHighlight style ={styles.textField} onPress={()=> this.props.callbackParent(item)}>
                    <Text style={styles.text}>
                      {item.name} {item.symbol}
                    </Text>
                  </TouchableHighlight>
                )
              }/>
        </View>

      <TouchableHighlight style={{height: 50, backgroundColor: '#336E7B'}} onPress={() => this.props.callbackGetCoins()}>
        <Text style={styles.textBottom}>Get List</Text>
      </TouchableHighlight>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    //flexDirection: 'row',
    //paddingTop:34,
    //paddingBottom: 3,
    //paddingLeft: 10,
    //paddingRight: 10,
    //flex:1
  },
  textField: {
    borderBottomColor: 'grey',
    borderBottomWidth: .75
  },
  container: {
    height: 500
    //flex: 1
  },
  containerBottom:{
    height: 50,
    flex: 1
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
  textBottom: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    paddingTop: 10,
    fontFamily: 'HelveticaNeue-Thin'
  },
  text: {
    textAlign: 'left',
    paddingTop: 10,
    fontSize: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin'

  }
});





export default SearchView;
