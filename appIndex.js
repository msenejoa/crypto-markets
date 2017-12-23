import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, ScrollView } from 'react-native';
import CoinInformation from './components/CoinInformation';

import Graphs from './components/graph';

import SmallGraph from './components/SmallGraph';

import Header from './components/Header';

import CoinInformationStatistics from './components/CoinInformationStatistics';


import SearchView from './components/SearchView';

import UserPortfolio from './components/UserPortfolio';

import UserHolding from './components/UserHolding'

import HomeView from './components/HomeView'


import { connect } from 'react-redux';
import { fetchCoinsFromAPI, fetchCoinInfoFromAPI, fetchCoinHistoryFromAPI, changeCoinHistorySuccess, fetchHomeView, fetchCoinListFromAPI, fetchInitialData, fetchCoinView, fetchMarketCapFromAPI, getSearchView, addCoinToUserList, removeCoinfromUserList, updateUserCoinList, forceRehydrate } from './actions';




class AppIndex extends Component {
  constructor(props) {
        super(props);
        this.state = {
          panning: false
        };
      }

  panning(bool){
    this.setState({panning: bool})
  }


  getInitialData () {
    props.getCoinInfo(props.coinInfo, props.coinData.time);
  };

  render(){
          const {
          container,
          text,
          button,
          buttonText,
          mainContainer,
          textHeader,
          textPrice
        } = styles

          const { coins, isFetching } = this.props.coins;
        const { coinInfo, isLoaded, name } = this.props.coinInfo;
        const { coinData, time, change } = this.props.coinData;
        const { view } = this.props.userInfo;

    return (

    <View style={mainContainer}>
      <Header
        persistedState = {this.props.persistedState}
        symbol = {this.props.coinInfo.symbol}
        callbackHomeView = {() => {this.props.getHomeView(); this.props.getCoinList(this.props.userInfo.userCoinList);}}
        callbackSearchView = {() => {this.props.getSearchView(); this.props.forceRehydrate()}}
        callbackParent = {() => {this.props.onInitialization(this.props.coinInfo, this.props.coinData.time, this.props.userInfo.userCoinList)}}
        callbackRemoveCoin = {() => {this.props.removeCoinFromList(this.props.userInfo.userCoinList, this.props.coinInfo)}}
        userInfo= {this.props.userInfo}
        change = {this.props.coinData.change}
        coinInfo = {this.props.coinInfo}
        addCoin = {() => this.props.addCoinToList(this.props.userInfo.userCoinList, this.props.coinInfo)}/>
        {
        this.props.userInfo.view == 'home' &&
        <HomeView
          getSearchView = {()=> this.props.getSearchView()}
          getCoins = {()=> this.props.getCoins() }
          userInfo = {this.props.userInfo}
          coinInfo = {this.props.coins}
          persistedState = {this.props.persistedState}
          callbackUserPortfolio = {(list) => {this.props.updateUserList(list)}}
          callbackMarketCap = {() => {this.props.getCoinList(this.props.userInfo.userCoinList)}}
          callbackCoinInformation = {(coin) => {this.props.getCoinInfo(coin, this.props.coinData.time); this.props.getCoinView();}}
          callbackParent = {() => {this.props.onInitialization(this.props.coinInfo, this.props.coinData.time, this.props.userInfo.userCoinList)}}/>
        }
        {
        this.props.userInfo.view == 'search' &&
          <SearchView
            loaded = {this.props.userInfo.coinListLoaded}
            data = {this.props.userInfo.coinList}
            callbackParent ={(coin) => {this.props.getCoinInfo(coin, this.props.coinData.time); this.props.getCoinView();}}
            callbackGetCoins = {() => {this.props.getCoins()}}/>
        }
        <ScrollView scrollEnabled={!this.state.panning} >
      {
        isFetching && <Text>Loading</Text>
      }
      {
      isLoaded && (this.props.userInfo.view == 'coin') ? <Graphs
        callbackPan = {(bool)=> this.panning(bool)}
        rehydrated = {this.props.persistedState.rehydrated}
        coinData = {this.props.coinData}
        coinInfo = {this.props.coinInfo}
        callbackParent={(time) => this.props.getCoinHistory(this.props.coinInfo.symbol, time)}/> : null
      }
      {
      isLoaded && (this.props.userInfo.view == 'coin') &&
      <CoinInformationStatistics
          coinInfo = {this.props.coinInfo.coinInfo[0]}
          error = {this.props.coinInfo.error}
          loaded = {this.props.coinInfo.isLoaded}
          rehydrated = {this.props.persistedState.rehydrated}/>
      }
      {
      this.props.userInfo.view == 'coin' &&
      <UserHolding
        holding={this.props.userInfo.userCoinList}
        coinInfo={this.props.coinInfo}
        rehydrated={this.props.persistedState.rehydrated}
        updateUserList={(list) => {this.props.updateUserList(list)}}/>
      }
      </ScrollView>
    </View>
  )
}}

styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000000',
    marginTop: 0,
    flex: 1
  },
  bodyContainer: {
    paddingTop: 50
  },
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    textAlign: 'center',
    height: 60,
    paddingTop: 10,
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Thin'

  },
  textHeader: {
    textAlign: 'left',
    fontSize: 28,
    color: '#ffffff',
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
  button: {
    height: 60,
    //paddingTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 7
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',

  },
  textHeader: {
    textAlign: 'left',
    fontSize: 24,
    paddingLeft: 10,
    color: 'white',
    paddingTop: 20,
    fontFamily: 'HelveticaNeue-Thin'
  },
  bottomBorder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
})



function mapStateToProps (state) {
  return {
    coinInfo: state.coinInfo,
    coins: state.coins,
    coinData: state.coinData,
    userInfo: state.userInfo,
    persistedState: state.persistedState

  }
}


function mapDispatchToProps (dispatch) {
  return {
    getCoins: () => dispatch(fetchCoinsFromAPI()),
    onInitialization:(name, time) => dispatch(fetchInitialData(name, time)),
    getCoinInfo: (name, time) => dispatch(fetchCoinInfoFromAPI(name, time)),
    getCoinHistory: (name, time) => dispatch(fetchCoinHistoryFromAPI(name, time)),
    getHomeView: () => dispatch(fetchHomeView()),
    getCoinView: () => dispatch(fetchCoinView()),
    getCoinList: (list) => dispatch(fetchCoinListFromAPI(list)),
    getMarketCap: () => dispatch(fetchMarketCapFromAPI()),
    getSearchView: () => dispatch(getSearchView()),
    addCoinToList: (list, coin) => dispatch(addCoinToUserList(list, coin)),
    removeCoinFromList: (list, coin) => dispatch(removeCoinfromUserList(list, coin)),
    updateUserList: (list) => dispatch(updateUserCoinList(list)),
    forceRehydrate: () => dispatch(forceRehydrate())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex)
