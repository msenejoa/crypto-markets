
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  PanResponder,
  Animated 
    } from 'react-native';

import moment from 'moment'

import { StockLine, SmoothLine } from 'react-native-pathjs-charts';

import CoininformationHeader from './CoinInformationHeader';
import CoinInformationStatistics from './CoinInformationStatistics';

import SmallGraph from './SmallGraph';

import Button from 'react-native-button';

class StockLineChartBasic extends Component {
  constructor(props) {
        super(props);

        this.state = {
          loaded: false,
          width: 0,
          data: [[{x: 0, y: 0}]],
          ratio: 0,
          indexVarable: 0, 
          time: '1d',
          price: 0,
          active: false,
          xCoordinate: 0,
          pan: new Animated.ValueXY(),
          date: '', 

        };
      }

  handleDrag(xCoordinate){
    let indexVarable = (xCoordinate / this.state.ratio) - 1;
    this.setState({
      indexVarable: Number((indexVarable).toFixed(0)),
      xCoordinate: xCoordinate
    })
    let data = this.state.data[0]

    let utcSeconds = data[Number((indexVarable).toFixed(0))].time
    //console.log(moment.utc(utcSeconds*1000).local().format('ddd, ll')); // The 0 there is the key, which sets the date to the epoch
    
    this.setState({
      price: data[Number((indexVarable).toFixed(0))].y,
      date: moment.utc(utcSeconds*1000).local().format("h:mm A, ddd, ll")
    })


  }


componentWillMount() {
  let xCoordinate = 0;
  this._panResponder = PanResponder.create({
    onStartShouldSetPanResponder:(evt, gestureState) => true,
    onPanResponderStart: (evt, gestureState) => {
      this.props.callbackPan(true);
      this.setState({active: true});
      xCoordinate = gestureState.x0;
      this.state.pan.setValue({x: xCoordinate, y: 0});


    },
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (e, gestureState) => {

    },

    onPanResponderMove:
    Animated.event([
       null, {moveX: this.state.pan.x}],
    {listener: (event, gestureState) => this.handleDrag(gestureState.moveX)},
    ),

    onPanResponderRelease: (e, {vx, vy}) => {
      this.state.pan.flattenOffset();
      this.state.pan.setValue({x: 0, y: 0});
      this.setState({active: false})
      this.props.callbackPan(false);
    }
  });
}



  componentDidMount(){
    let w = Dimensions.get("window").width
    this.setState({ width: w})
  }

  componentWillReceiveProps(nextProps){

    if((nextProps.coinData.loaded & !this.state.loaded)|| (nextProps.coinData.time != this.state.time)){
      let ratio = this.state.width / nextProps.coinData.Data[0].length
      this.setState({
        data: nextProps.coinData.Data,
        ratio: ratio,
        time: nextProps.coinData.time,
        loaded: true
      })
    }
  }

  activatePrice(){

    this.setState({
      active: true
    })
  }

  deactivatePrice(){

    this.setState({
      active: false
    })
  }


  static navigationOptions = ({ navigation }) => ({
    title: ``,
  });
  render() {
    var timeFrame = this.props.coinData.time;
    var gains = this.props.coinData.change;
    var error = this.props.coinData.error;
    var change = gains > 0 ? '#03C9A9' : '#D64541';
    let graphLoaded = this.props.coinData.loaded;

    // Destructure the value of pan from the state
    let { pan } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {transform: [{translateX}, {translateY}]};


    colorChange = function(change) {
      return {
        color: change
        }
      }

    timelinePosition = function(number){
      return {
        paddingLeft: number,
      }
    }


    let hour = '1h';
    let day = '1d';
    let week = '1w';
    let month = '1m';
    let year = '1y';

    let options = {
      width: this.state.width-5,
      height: 180,
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
      <View style={styles.container}>

        <CoininformationHeader
          active = {this.state.active}
          date= {this.state.date}
          price = {this.state.price}
          rehydrated = {this.props.rehydrated}
          coinData = {this.props.coinData}
          coinInfo = {this.props.coinInfo}
          gains = {this.gains}/>
        {
        (graphLoaded) ?

            <View style= {styles.graph} >
                <View style={styles.panContainer} {...this._panResponder.panHandlers}>
                {this.state.active ?
                  <Animated.View style={imageStyle} >
                    <View style={styles.overlayBox}/>
                  </Animated.View>: null}
                </View>
                <View style={styles.graphOverlay}>
                  <SmoothLine data={this.state.data} options={options} xKey='x' yKey='y' />
                </View> 
            </View>
          :
          <View style = {styles.errorBox}><Text style ={styles.errorText}>loading</Text></View>
        }
        <ScrollView>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
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
      </ScrollView>
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
  },
  errorBox: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'grey'
  },
  overlay: {
    paddingTop: 60,
    //position: 'absolute',
    color: 'grey'
  },
  panContainer: {
    flex: 1,
    height: 220,
    zIndex: 1, 
    //position: 'absolute',
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',

  },
  overlayBox: {


    //position: 'absolute',
    paddingTop: 20,
    //paddingLeft: 10,
    //color: 'grey',
    //borderRightColor: 'grey',
    //borderRightWidth: 1, 
    height: 200,
    width: 2,
    backgroundColor: 'grey',

    //zIndex: 0
    },
    graphOverlay: {
    //alignSelf: 'stretch'
    zIndex: 0, 
    position: 'absolute'
    },
  graph: {
    //position: 'absolute',
    //alignSelf: 'stretch'
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
