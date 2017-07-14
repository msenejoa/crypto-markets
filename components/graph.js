
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { StockLine } from 'react-native-pathjs-charts';

import Button from 'react-native-button';

class StockLineChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Basic`,
  });
  render() {
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
      color: '#03C9A9',
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
      <View style={styles.container}>

        <StockLine data={this.props.graphing} options={options} xKey='x' yKey='y' />


        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={styles.toolbar}>
          <Button
            containerStyle={styles.toolbarbutton}
            style={styles.toolbarbuttonActive}>
            1h
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            containerStyle={styles.toolbarbutton}
            style={styles.buttonText}>
            1d
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            containerStyle={styles.toolbarbutton}
            style={styles.buttonText}>
            1w
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            containerStyle={styles.toolbarbutton}
            style={styles.buttonText}>
            1m
          </Button>
          </View>
          <View style={styles.toolbar}>
          <Button
            containerStyle={styles.toolbarbutton}
            style={styles.buttonText}>
            1y
          </Button>
          </View>
        </View>
        <View>
          <Text style={styles.statsHeader}>
            Stats
          </Text>
          <Text style={styles.statsHeader}>
            {this.props.statistics[0].name} test
          </Text>

      <TouchableHighlight onPress={() => console.log(this.props)}>
        <Text style={styles.statsHeader}>Print statistic</Text>
      </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 12, 
    color: '#03C9A9'
    //flex: 1,
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
