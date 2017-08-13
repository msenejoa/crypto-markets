import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch, Modal, TextInput } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CoinInformationHeader extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          text: '',
          modalVisible: false
        };
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
                <View style ={styles.title}>
                  <Text style={styles.text}>Holdings</Text>
                </View>
                <View style = {styles.modalIcon}>
                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  }}>
                    <Ionicons name="ios-close-circle" size={32} color='grey'/>
                </TouchableHighlight>
                </View>
              </View>

              <View style={styles.modalMainContainer}>

                <Text style={styles.text}>Total holdings</Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 7, color: 'white'}}
                  onChangeText={(text) => {this.setState({text})}}/>
                <Text style={styles.text}>sometext</Text>
              </View>


              <TouchableHighlight style={styles.button} onPress={() => console.log('some press')}>
                <Text style={{ textAlign: 'center'}}>add to portfolio</Text>
            </TouchableHighlight>


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
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#1c1c1c',
    borderRadius:7
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 28,
    color: '#ffffff',
    //paddingTop: 15,
    fontFamily: 'HelveticaNeue-Thin'
  },
  modalIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5
  },
  modalClose: {
    //flex: 2,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#1c1c1c',
    borderRadius:7,
    justifyContent: 'space-between',
    //alignItems: 'flex-end',
    borderWidth:4
  },
  title: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  modalMainContainer:{
    //flex: 3,
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
    borderRadius:7,
    borderWidth: 4,
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
  },
  button: {
    backgroundColor: '#336E7B',
    justifyContent: 'center',
    height: 50,
    borderWidth: 4,
    borderRadius: 7
  }
});


