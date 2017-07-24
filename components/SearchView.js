
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,TextInput, FlatList } from 'react-native';
//import { persistStore } from 'redux-persist'




class SearchView extends Component {



  render() {

    return (

<View>
    <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
        //onChangeText={(text) => this.setState({text})}
        //value={this.state.text}
      />

      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.text} onPress={()=> console.log('clicked')}>{item.key}</Text>}
        />
      </View>

      <View style={styles.container}>
        <Text style = {styles.textHeader}>some text</Text>
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
    textAlign: 'left',
    paddingTop: 5,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  }
});





export default SearchView;
