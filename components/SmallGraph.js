


import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StockLine } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#000000',
  },
});

class StockLineSmall extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Basic`,
  });
  render() {
    let data = [
      [{
        "x": 0,
        "y": 47782
      }, {
        "x": 1,
        "y": 48497
      }, {
        "x": 2,
        "y": 77128
      }, {
        "x": 3,
        "y": 73413
      }, {
        "x": 4,
        "y": 58257
      }, {
        "x": 5,
        "y": 40579
      }, {
        "x": 6,
        "y": 72893
      }, {
        "x": 7,
        "y": 60663
      }, {
        "x": 8,
        "y": 15715
      }, {
        "x": 9,
        "y": 40305
      }, {
        "x": 10,
        "y": 68592
      }, {
        "x": 11,
        "y": 95664
      }, {
        "x": 12,
        "y": 17908
      }, {
        "x": 13,
        "y": 22838
      }, {
        "x": 14,
        "y": 32153
      }, {
        "x": 15,
        "y": 56594
      }, {
        "x": 16,
        "y": 76348
      }, {
        "x": 17,
        "y": 46222
      }, {
        "x": 18,
        "y": 59304
      }]
    ]
    let options = {
      width: 80,
      height: 20,
      color: '#34495E',
      margin: {
        top: 5,
        left: 5,
        bottom: 5,
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
        <StockLine data={data} options={options} xKey='x' yKey='y' />
      </View>
    )
  }
}

export default StockLineSmall;
