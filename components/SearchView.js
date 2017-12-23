
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,TextInput, FlatList, ScrollView, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      refreshing: false
    }

  }

  componentWillMount(){
    //this.setState({refreshing: this.props.loading})
  }

  ComponentWillReceiveProps(nextProps){
   // if (this.state.refreshing == nextProps.loaded){
   //   this.setState({refreshing: !nextProps.loading})
   // }
  }

  textChange(text){
    this.setState({
      text: text
    })
  }

  onRefresh(){
        //this.setState({refreshing:true})
        //setTimeout(()=>this.setState({refreshing:false}), 700)
        this.props.callbackGetCoins()
        console.log('refreshing')
      }

  render() {

  var coins = this.props.data,
      searchString = this.state.text.trim().toLowerCase();
  console.log(coins.length)
  if (searchString.length > 0) {
    coinName = coins.filter(coin => coin.name.toLowerCase().match( searchString ));
    coinSymbol = coins.filter(coin => coin.symbol.toLowerCase().match( searchString ));
    coins = coinName.concat(coinSymbol.filter(item => coinName.indexOf(item) < 0));
  }



  return (
    <View style ={styles.mainContainer}>
      <View style={styles.searchBoxPadding}>
        <View style={styles.searchBox}>
          <View>
            <TextInput

              style={styles.textFieldInput}
              onChangeText={(text) => {this.textChange(text)}}/>
          </View>
        </View>
      </View>
          <View style={styles.container}>
            <ScrollView
            refreshControl = {
              <RefreshControl
                refreshing={!this.props.loaded}
                onRefresh={this.onRefresh.bind(this)}
                />}>
              {(coins.length==0) && <Text style={styles.textBottom}> loading </Text>}
              
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
          </ScrollView>

        </View>

{/*
      <TouchableHighlight style={styles.button} onPress={() => this.props.callbackGetCoins()}>
        <Text style={styles.textBottom}>sync coins</Text>
      </TouchableHighlight>
*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    //flexDirection: 'row',
    paddingTop:25,
    //paddingBottom: 3,
    //paddingLeft: 10,
    //paddingRight: 10,
    //flex:1
  },
  searchBoxPadding: {
    paddingLeft: 10,
    paddingRight: 10
  },
  searchBox: {
    height: 60,
    //backgroundColor: '#1C2F2F',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
    //flex: 1
  },
  button: {
    height: 45,
    backgroundColor: 'grey',
    borderRadius: 7,
    //flex: 1
  },
  textFieldInput: {
    height: 40, 
    //borderColor: 'gray', 
    //borderWidth: 1, 
    color: 'white'

  },
  textField: {
    height: 40,
    paddingTop: 7,
    paddingLeft: 7,
    //borderColor: 'gray', 
    //borderWidth: 1, 
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    //flex: 1
  },
  container: {
    height: 570,
    paddingTop: 20,
    //flex: 1
  },
  textBottom: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    paddingTop: 10,
    fontFamily: 'HelveticaNeue-Thin'
  },
  text: {
    //height: 20,
    //paddingTop: 5,
    fontSize: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Thin'

  }
});





export default SearchView;
