
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { StockLine } from 'react-native-pathjs-charts';

import CoininformationHeader from './CoinInformationHeader';
import CoinInformationStatistics from './CoinInformationStatistics';

import Button from 'react-native-button';

class StockLineChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ``,
  });
  render() {
    var timeFrame = this.props.coinData.time;
    var gains = this.props.coinData.change;

    var change = gains > 0 ? '#03C9A9' : '#D64541';

    colorChange = function(change) {
      return {
        color: change
        }
      }


    let hour = '1h';
    let day = '1d';
    let week = '1w';
    let month = '1m';
    let year = '1y';

    let data = [
      [{
        "x": 0,
        "y": 132189
      }, {
        "x": 1,
        "y": 61705
      }],
    ]
    let options = {
      //width: 300,
      height: 250,
      color: change,
      margin: {
        top: 10,
        left: 5,
        bottom: 30,
        right: 5
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: false,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: false,
          fill: '#34495E'
        }
      }
    }




    return (
      //var something = this.props.timeFrame;
      <View style={styles.container}>

        <CoininformationHeader
          coinData = {this.props.coinData}
          coinInfo = {this.props.coinInfo}
          />

        <StockLine data={this.props.coinData.Data} options={options} xKey='x' yKey='y' />



        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={styles.toolbar}>
          <Button
            onPress= {() => this.props.callbackParent(hour)}
            containerStyle={styles.toolbarbutton}
            //style = {timeFrame === '1h'? styles.toolbarbuttonActive : styles.buttonText}>
            style = {timeFrame === '1h'? styles.toolbarbuttonActive : [styles.buttonText, colorChange(change)]}>
            1h
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            onPress= {() => this.props.callbackParent(day)}
            containerStyle={styles.toolbarbutton}
            style = {timeFrame === '1d'? styles.toolbarbuttonActive : [styles.buttonText, colorChange(change)]}>
            1d
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            onPress= {() => this.props.callbackParent(week)}
            containerStyle={styles.toolbarbutton}
            style = {timeFrame === '1w'? styles.toolbarbuttonActive : [styles.buttonText, colorChange(change)]}>
            1w
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            onPress= {() => this.props.callbackParent(month)}
            containerStyle={styles.toolbarbutton}
            style = {timeFrame === '1m'? styles.toolbarbuttonActive : [styles.buttonText, colorChange(change)]}>
            1m
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            onPress= {() => this.props.callbackParent(year)}
            containerStyle={styles.toolbarbutton}
            style = {timeFrame === '1y'? styles.toolbarbuttonActive : [styles.buttonText, colorChange(change)]}>
            1y
          </Button>
          </View>
        </View>
          <CoinInformationStatistics
          coinInfo = {this.props.coinInfo.coinInfo[0]}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#000000',
  },
  toolbar: {
    flex: 4,
    alignItems: 'center'
  },
  toolbarbutton: {
    padding:3,
    height:20,
    width:50,
    overflow:'hidden',
    borderRadius:5,
    backgroundColor:'#000000'
  },
  toolbarbuttonActive: {
    fontSize: 12,
    color: '#FFFFFF'
  },
  statsHeader: {
    color: 'grey',
    height: 300,
    fontSize: 25,
    fontFamily: 'HelveticaNeue-Thin',
    //flex: 1,
  },
  buttonText: {
    fontSize: 12
  },
  buttonTextGains: {
    color: 'green'
  },
  statsBody: {
    color: 'grey',
    height: 300,
    fontSize: 25,
    fontFamily: 'HelveticaNeue-Thin',
    //flex: 1,
  }
});


function mapStateToProps (state) {
  return {
    coinInfo: state.coinInfo,
    coins: state.coins,
    coinData: state.coinData

  }
}



export default StockLineChartBasic;
