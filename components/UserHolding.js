import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch, Modal } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CoinInformationHeader extends React.Component {

      state = {
        modalVisible: false,
        //price: 0
      }


      setModalVisible(visible) {
        this.setState({modalVisible: visible});
        }

      render(){
      return (
        <View style={styles.container}>
          <Text style={styles.text}> User Holding </Text>



      <View>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 200}}>

          <View style={styles.containerModal}>



              <View style={styles.modalClose}>
                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  }}>
                    <Ionicons name="ios-add-circle-outline" size={32} color='white'/>
                </TouchableHighlight>
              </View>

              <View style={styles.modalMainContainer}>
              <Text style={styles.text}>sometext</Text>
              </View>


          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text  style={styles.text}>Show Modal</Text>
        </TouchableHighlight>

      </View>




        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    //backgroundColor: '#000000',

  },
  containerModal: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'flex-end',
    //paddingTop: 100,
    //paddingBottom: 100,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#1c1c1c',

  },
  textHeader: {
    textAlign: 'center',
    fontSize: 28,
    color: '#ffffff',
    //paddingTop: 15,
    fontFamily: 'HelveticaNeue-Thin'
  },
  modalIcon: {
    justifyContent: 'flex-end'
  },
  modalClose: {
    //flex: 1,
    //flexDirection: 'row',
    height: 50,
    backgroundColor: 'powderblue',
    //justifyContent: 'flex-end'
    alignItems: 'flex-end'
  },
  modalMainContainer:{
    //flex: 3,
    height: 70,
    justifyContent: 'center',
    backgroundColor: 'powderblue'
  },
  textPrice: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
    paddingTop: 5,
    fontFamily: 'HelveticaNeue-Thin'
  },
  text: {
    //textAlign: 'center',
    //paddingTop: 5,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  }
});


