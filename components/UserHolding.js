import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Switch, Modal, TextInput } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default class UserHolding extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          text: 'new holding',
          modalVisible: false,
          holding: 0,
          total_btc: 0,
          total_usd: 0,
          name: '',
          isLoaded: false,
          index: -1,
          price_usd: 0
        };
  }

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
        }

      submitHoldings(){
          let newHolding = Number(this.state.text);
          if (!isNaN(newHolding)){
            let list = this.props.holding;
            let coinName = this.props.coinInfo.name;

            let coinPriceBTC = this.props.coinInfo.coinInfo[0].price_btc;
            let coinPriceUSD = this.props.coinInfo.coinInfo[0].price_usd;

            let index = list.findIndex(item => item.name === coinName);

            let total_btc = coinPriceBTC * newHolding;
            let total_usd = coinPriceUSD * newHolding;

            list[index].holding = newHolding;
            list[index].price_usd = total_usd;
            list[index].price_btc = total_btc;

            this.props.updateUserList(list)
            this.setState({ modalVisible: false})
        }



      }

      componentWillReceiveProps(){
        this.onLoad();
      }

      componentWillUnmount(){
        this.setState({
          holding: 0,
          total_btc: 0,
          total_usd: 0,
          name: '',
          isLoaded: false
        });
      }

      onLoad(){
        let list = this.props.holding;
        let coinName = this.props.coinInfo.name;
        let coinAmount = 0;
        let index = -1;

        if (list.length > 0){
          index = list.findIndex(item => item.name === coinName);
            if (index > -1){
              let holdings = list[index].holding
              let total_btc = list[index].price_btc;
              let total_usd = list[index].price_usd;
              let change = this.props.coinInfo.coinInfo[0].percent_change_24h/100;
              let price_usd = this.props.coinInfo.coinInfo[0].price_usd;

              this.setState({
                holding: holdings,
                total_btc: total_btc,
                total_usd: total_usd,
                isLoaded: true,
                text: holdings,
                change: change,
                index: index,
                price_usd: price_usd
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
      checkList (){
        let list = this.props.holding;
        let coinName = this.props.coinInfo.name;
        if (list.filter(item=> item.name == coinName).length != 0 ){
          return true}else{return false}
  }


      render(){
      var usd_value = this.state.total_usd;
      var btc_value = this.state.btc_value;
      var change = this.state.change * usd_value;
      var textHolder = this.state.holding;
      var inList = this.checkList();
      var color =  change > 0 ? '#03C9A9' : '#D64541';
      colorChange = function() {
        return {
            color: color
          };
      };
      var newValue = this.state.text * this.state.price_usd


      return (

        <View style={styles.container}>
        { inList && <View>
          <View style={styles.display}>
            <Text style={styles.textHeader}>holdings </Text>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(true)
              }}>
              <Ionicons name="ios-add-circle" size={25} color='grey'/>
            </TouchableHighlight>

          </View>

          <View style={styles.bottomBorder}/>

          <View style ={styles.display}>
            <Text style={styles.text}>{textHolder}</Text>
            <Text style={styles.text}>${usd_value.toFixed(2)}</Text>
            <Text style={[styles.text, colorChange()]}>({change.toFixed(2)})</Text>

          </View>
          </View>
          }


      <View>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 200}}>

          <View style={styles.containerModal}>


              <View style={styles.modalMainContainer}>

                <View style = {styles.modalIcon}>
                  <TouchableHighlight onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                    }}>
                    <Ionicons name="ios-close-circle" size={32} color='grey'/>
                  </TouchableHighlight>
                </View>

                <Text style={styles.text}>total holdings</Text>

                  <Text style={styles.textHolding}>{this.state.holding}</Text>
                <Text style={styles.text}>${usd_value} {"\n"}</Text>

                <View style={styles.input}>
                  <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 7, color: 'black', backgroundColor: '#D3D3D3', textAlign: 'center'}}
                    onChangeText={(text) => {this.setState({text})}}
                    value={this.state.text.toString()}/>
                </View>

                <Text style={styles.text}>{"\n"} value: ${newValue.toFixed(2)} {"\n"}</Text>

                  <TouchableHighlight style={styles.button} onPress={() => this.submitHoldings(this.state.text)}>
                    <Text style={{ textAlign: 'center'}}>add to portfolio</Text>

                  </TouchableHighlight>
              </View>





          </View>
         </View>
        </Modal>


      </View>




        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 12,
    //backgroundColor: '#000000',
  },
  display:{
    //flex:1,
    //height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    paddingTop: 7,
    paddingBottom: 7
  },
  textInput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    color: 'white',
  },
  containerModal: {
    //flex: 1,
    //flexDirection: 'column',
    //justifyContent: 'flex-end',
    //paddingTop: 100,
    //paddingBottom: 100,
    paddingLeft: 40,
    paddingRight: 40,
    //backgroundColor: '#1c1c1c',
    borderRadius:7
  },
  textHeader: {
    textAlign: 'left',
    fontSize: 22,
    color: 'white',
    //paddingTop: 15,
    fontFamily: 'HelveticaNeue-Thin'
  },
  modalIcon: {
    alignItems: 'flex-end',
    //justifyContent: 'center',
    paddingRight: 7,
    paddingTop: 7,
    backgroundColor: '#1c1c1c',
    borderRadius: 7
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
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
  textHolding: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
    paddingTop: 5,
    fontFamily: 'HelveticaNeue-Thin'
  },
  text: {
    textAlign: 'center',
    //paddingTop: 5,
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'HelveticaNeue-Thin'
  },
  button: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    height: 50,
    //borderWidth: 4,
    borderRadius: 7
  }
});


