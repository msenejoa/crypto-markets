
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StockLine } from 'react-native-pathjs-charts';

import Button from 'react-native-button';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C5EFF7',
  },
});

//const newData = {this.props.graphing};

class StockLineChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Basic`,
  });
  render() {
    //var newData = {this.props.graphing};
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
      width: 300,
      height: 250,
      color: '#34495E',
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
        showLines: true,
        showLabels: true,
        showTicks: true,
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
    console.log(data)

    return (
      <View style={styles.container}>

        <StockLine data={this.props.graphing} options={options} xKey='x' yKey='y' />


        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{flex:4, alignItems:'center'}}>
          <Button
            containerStyle={{padding:3, height:20, width:50, overflow:'hidden', borderRadius:5, backgroundColor: '#81CFE0'}}
            style={{fontSize: 12, color: '#2C3E50'}}>
            day
          </Button>
          </View>
          <View style={{flex:4, alignItems:'center'}}>
          <Button
            containerStyle={{padding:3, height:20, width:50, overflow:'hidden', borderRadius:5, backgroundColor: '#81CFE0'}}
            style={{fontSize: 12, color: '#2C3E50'}}>
            week
          </Button>
          </View>
          <View style={{flex:4, alignItems:'center'}}>
          <Button
            containerStyle={{padding:3, height:20, width:50, overflow:'hidden', borderRadius:5, backgroundColor: '#81CFE0'}}
            style={{fontSize: 12, color: '#2C3E50'}}>
            month
          </Button>
          </View>
          <View style={{flex:4, alignItems:'center'}}>
          <Button
            containerStyle={{padding:3, height:20, width:50, overflow:'hidden', borderRadius:5, backgroundColor: '#81CFE0'}}
            style={{fontSize: 12, color: '#2C3E50'}}>
            year
          </Button>
          </View>
        </View>
      </View>
    )
  }
}

export default StockLineChartBasic;
