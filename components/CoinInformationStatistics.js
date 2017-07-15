import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';


export default class CoinInformationStatistics extends React.Component {

      render(){
      return (

        <View style={styles.container}>

          <Text style={styles.textHeader}>Stats</Text>
          <View style={styles.bottomBorder}/>

          <View style={styles.statsBody}>
            <View style={styles.statsBodyRowLeft}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>mkt cap</Text>
                <Text style={styles.values}>{this.props.coinInfo.market_cap_usd}</Text>
              </View>
            </View>
            <View style={styles.statsBodyRow}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>total supply</Text>
                <Text style={styles.values}>{this.props.coinInfo.available_supply}</Text>
              </View>
            </View>
          </View>


          <View style={styles.statsBody}>
            <View style={styles.statsBodyRowLeft}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>rank</Text>
                <Text style={styles.values}>{this.props.coinInfo.rank}</Text>
              </View>
            </View>
            <View style={styles.statsBodyRow}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>1h</Text>
                <Text style={styles.values}>{this.props.coinInfo.percent_change_1h}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsBody}>
            <View style={styles.statsBodyRowLeft}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>1d change</Text>
                <Text style={styles.values}>{this.props.coinInfo.percent_change_24h}%</Text>
              </View>
            </View>
            <View style={styles.statsBodyRow}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>1w change</Text>
                <Text style={styles.values}>{this.props.coinInfo.percent_change_7d}%</Text>
              </View>
            </View>
          </View>



        </View>

      );
    }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15
    //flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'space-between',
//justifyContent: 'center',
    //height: 50,
    //alignItems: 'center'
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    paddingTop: 7,
    paddingBottom: 7
  },
  bottomBorderHalf: {
    borderBottomColor: 'grey',
    borderBottomWidth: .75,
    //paddingTop: 7,
    //paddingBottom: 7
  },
  statsBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statsBodyRowLeft: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    paddingRight: 12,
    //borderBottomColor: 'grey',
    //paddingBottom: 7,
    //borderBottomWidth: .75,
  },
  statsBodyRow: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //paddingRight: 12,
    //borderBottomColor: 'grey',
    //paddingBottom: 7,
    //borderBottomWidth: .75,
  },
  statsBodyContent: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    //paddingRight: 12,
    borderBottomColor: 'grey',
    paddingBottom: 12,
    paddingTop: 12,
    borderBottomWidth: .75
  },
  textHeader: {
    textAlign: 'left',
    fontSize: 28,
    color: 'white',
    paddingTop: 15,
    fontFamily: 'HelveticaNeue-Thin'
  },
  textPrice: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
    paddingTop: 18,
    fontFamily: 'HelveticaNeue-Thin'
  },
  text: {
    textAlign: 'left',
    //paddingTop: 5,
    fontSize: 18,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'
  },
  values: {
    textAlign: 'right',
    color: 'white',
    //paddingTop: 5,
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Thin'
  }
});


