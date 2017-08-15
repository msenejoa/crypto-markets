import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch, Modal, TextInput } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CoinInformationHeader extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          text: '',
          //textLoaded: false,
          modalVisible: false,
          holding: 0,
          total_btc: 0,
          total_usd: 0,
          name: '',
          isLoaded: false
        };
  }

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
        }
      submitHoldings(){}

      componentWillUnmount(){
        this.setState({
          isLoaded: false
        })
      }

      onLoad(){
        let list = this.props.holding;
        let coinName = this.props.coinInfo.name;
        //console.log(coinAmount)
        let coinAmount = 0;
        let index = -1
        //this.setModalVisible(!this.state.modalVisible)
        if (list.length > 0){
          index = list.findIndex(item => item.name === coinName);
            if (index > -1){
              let holdings = list[index].holding
              let total_btc = list[index].price_btc * holdings;
              let total_usd = list[index].price_usd * holdings;

              this.setState({
                holding: holdings,
                total_btc: total_btc,
                total_usd: total_usd,
                isLoaded: true,
                text: holdings
                });

              //coinAmount = list[index].holding;
              //price_btc =
              }
          }
      }
      holdingText(){
        if (this.state.isLoaded){

        }
      }

      componentDidMount(){
        if (this.props.rehydrated && this.state.isLoaded == false){
          //this.onLoad();
        }
        //this.setState({holding: this.props.holding, name: this.props.coinInfo.name})
        //this.submitHoldings()
      }
      render(){
      var usd_value = this.state.total_usd;
      var btc_value = this.state.btc_value;
      var textHolder = this.state.holding;

      console.log(this.state.text)
      if (this.props.rehydrated && this.state.isLoaded == false){
          this.onLoad();
        }

      return (
        <View style={styles.container}>
          <Text style={styles.text}> User Holding {this.state.holding} {this.state.total_usd}</Text>



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
                  <Text style={styles.textHeader}>Holdings</Text>
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

                <Text style={styles.text}>total: {this.state.holding} ${usd_value} {"\n"}</Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 7, color: 'white'}}
                  onChangeText={(text) => {this.setState({text})}}
                  value={textHolder}/>
                <Text style={styles.text}>total value: ${usd_value} </Text>
              </View>


              <TouchableHighlight style={styles.button} onPress={() => this.submitHoldings(this.state.text)}>
                <Text style={{ textAlign: 'center'}}>add to portfolio</Text>
            </TouchableHighlight>


          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>

            <Ionicons name="ios-arrow-dropup-circle" size={25} color='grey'/>
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
  textInput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    color: 'white',
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
    color: '#ffffff',
    fontFamily: 'HelveticaNeue-Thin'
  },
  button: {
    backgroundColor: '#03C9A9',
    justifyContent: 'center',
    height: 50,
    borderWidth: 4,
    borderRadius: 7
  }
});


