import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import SmallGraph from './SmallGraph';
import {connect } from 'react-redux'


class CoinInformation extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          change: 0, 
          loaded: false, 
          color: '#000000'
        };
      }


  componentWillReceiveProps(nextProps){
    if(nextProps.coinInfo.isLoaded & !this.state.loaded){
      let change =(this.props.difference * 100).toFixed(2)
      let color = change > 0 ? '#03C9A9' : '#D64541';
      this.setState({
        change: change,
        color: color,
        loaded: true
      })
    }
  }

  colorChange(){
    return {
      backgroundColor: this.state.color
    }
  }

  render(){

      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={() => this.props.callbackParent(this.props)}>
          <View style={{flexDirection: 'row'}}>
            <View style ={styles.columnLeft}>
              <Text style={styles.text}>
                {this.props.symbol}
              </Text>
            </View>
              <View style={styles.columnCenter}>
                <Text style ={styles.text}>
                {this.props.holding}
                </Text>
              </View>

            <View style={styles.columnCenterPrice}>
              <Text style ={styles.text}>
                ${this.props.totalUSD.toFixed(2)}
              </Text>
            </View>

            <View style={styles.columnRight}>
              <View style={[styles.changeBox, this.colorChange()]}>
                <Text style={styles.textChange}>{this.state.change}%</Text>
              </View>
            </View>
            </View>
          </TouchableHighlight>

        </View>



      );
    }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    paddingTop:15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    //height: 50,
    //alignItems: 'center'
    },
  text: {
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 18,

  },
  textChange: {
    color: '#000000',
    justifyContent: 'center',
    fontFamily: 'HelveticaNeue'

  },
  changeBox: {
    width:75,
    height: 35,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:7,

  },
  columnLeft: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  columnCenter: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  columnCenterPrice: {
    flex:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  columnRight: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
  }
});


function mapStateToProps (state) {
  return {
    coinInfo: state.coinInfo

  }
}



export default connect(
  mapStateToProps,
  null
)(CoinInformation)


