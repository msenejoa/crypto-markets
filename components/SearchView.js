
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,TextInput, FlatList, ScrollView } from 'react-native';
//import { persistStore } from 'redux-persist'




class SearchView extends Component {


  render() {

    return (

<View style ={styles.mainContainer}>

    <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
        //onChangeText={(text) => this.setState({text})}
        //value={this.state.text}
      />

      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={({item}) =>(
            <TouchableHighlight style ={styles.textField} onPress={()=> this.props.callbackParent(item)}>
              <Text
                style={styles.text}
                >
                  {item.name} {item.symbol}
              </Text>
            </TouchableHighlight>
              )
          }
        />
      </View>


      <View style={styles.containerBottom}>
<TouchableHighlight onPress={()=> console.log('pressed')}>
        <Text style = {styles.textBottom}>sync coins</Text>
        </TouchableHighlight>
      </View>
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
    height: 510
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
