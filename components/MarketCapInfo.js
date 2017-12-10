import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class MarketCapInfo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isLoaded: false
          }
        }

      componentWillReceiveProps(nextProps){
        if (nextProps.isLoaded && !this.state.isLoaded){
          this.props.callbackParent();
          this.setState({ isLoaded: true});
       }      
      }  

      render(){

        var mkt_cap = this.props.coins.marketCap.total_market_cap_usd;
        mkt_cap = mkt_cap/1000000;
        mkt_cap = mkt_cap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        var vol = this.props.coins.marketCap.total_24h_volume_usd;
        vol = vol/1000000;
        vol = vol.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return (
      <View>
        <View style={styles.container}>
          <Text style={styles.textHeader}>stats</Text>
        </View>

        <View style={styles.bottomBorder}/>

          <View style = {styles.container}>

            <View style={styles.statsBody}>
              <View style={styles.statsBodyRowLeft}>
                <View style ={styles.statsBodyContent}>
                  <Text style={styles.text}>total market cap</Text>
                  <Text style={styles.values}>${mkt_cap}M</Text>
                </View>
              </View>
            </View>


            <View style={styles.statsBody}>
              <View style={styles.statsBodyRowLeft}>
                <View style ={styles.statsBodyContent}>
                  <Text style={styles.text}>24hr volume</Text>
                  <Text style={styles.values}>${vol}M</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsBody}>
              <View style={styles.statsBodyRowLeft}>
                <View style ={styles.statsBodyContent}>
                  <Text style={styles.text}>btc dominance</Text>
                  <Text style={styles.values}>{this.props.coins.marketCap.bitcoin_percentage_of_market_cap}%</Text>
                </View>
              </View>
            </View>
          </View>
      </View>


      );
    }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  bottomBorderHalf: {
    borderBottomColor: 'grey',
    borderBottomWidth: .5,
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
    paddingBottom: 12,
    paddingTop: 12,
    borderBottomWidth: .75
  },
  textHeader: {
    textAlign: 'left',
    fontSize: 24,
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


