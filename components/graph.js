
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StockLine } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

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
      }, {
        "x": 2,
        "y": 154976
      }, {
        "x": 3,
        "y": 81304
      }, {
        "x": 4,
        "y": 172572
      }, {
        "x": 5,
        "y": 140656
      }, {
        "x": 6,
        "y": 148606
      }, {
        "x": 7,
        "y": 53010
      }, {
        "x": 8,
        "y": 110783
      }, {
        "x": 9,
        "y": 196446
      }, {
        "x": 10,
        "y": 117057
      }, {
        "x": 11,
        "y": 186765
      }, {
        "x": 12,
        "y": 174908
      }, {
        "x": 13,
        "y": 75247
      }, {
        "x": 14,
        "y": 192894
      }, {
        "x": 15,
        "y": 150356
      }, {
        "x": 16,
        "y": 180360
      }, {
        "x": 17,
        "y": 175697
      }, {
        "x": 18,
        "y": 114967
      }],
    ]
    let options = {
      width: 300,
      height: 250,
      color: '#2980B9',
      margin: {
        top: 10,
        left: 35,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
      <View style={styles.container}>
        <StockLine data={data} options={options} xKey='x' yKey='y' />
      </View>
    )
  }
}

export default StockLineChartBasic;
