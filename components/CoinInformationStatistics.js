import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class CoinInformationStatistics extends React.Component {

      render(){
        var mkt_cap = this.props.coinInfo.market_cap_usd;
        mkt_cap = mkt_cap/1000000;
        mkt_cap = mkt_cap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        var total_supply = this.props.coinInfo.total_supply;
        total_supply = total_supply/1000000;
        total_supply = total_supply.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return (

        <View style={styles.container}>

          <Text style={styles.textHeader}>Stats</Text>
          <View style={styles.bottomBorder}/>

          <View style={styles.statsBody}>
            <View style={styles.statsBodyRowLeft}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>mkt cap</Text>
                <Text style={styles.values}>${mkt_cap}M</Text>
              </View>
            </View>
            <View style={styles.statsBodyRow}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>total supply</Text>
                <Text style={styles.values}>{total_supply}M</Text>
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
                <Text style={styles.text}>1d</Text>
                <Text style={styles.values}>{this.props.coinInfo.percent_change_24h}%</Text>
              </View>
            </View>
            <View style={styles.statsBodyRow}>
              <View style ={styles.statsBodyContent}>
                <Text style={styles.text}>1w</Text>
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
    paddingRight: 12,
  },
  statsBodyRow: {
    flex: 1,
    flexDirection: 'row',
  },
  statsBodyContent: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    paddingBottom: 8,
    paddingTop: 8,
    borderBottomWidth: .75
  },
  textHeader: {
    textAlign: 'left',
    fontSize: 22,
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
    fontSize: 16,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'
  },
  values: {
    textAlign: 'right',
    color: 'white',
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Thin'
  }
});


