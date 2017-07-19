import React from 'react';

import { StyleSheet, Text, View } from 'react-native';


import { Provider } from 'react-redux';
import configureStore from './configureStore'
import AppIndex from './appIndex'

const store = configureStore()


export default class App extends React.Component {

  componentDidMount() {
    console.log('mounted')
  }

  render() {
    return (
      <Provider store={store}>
        <AppIndex />
      </Provider>
    );
  }
}






//AppRegistry.registerComponent('rnredux', () => ReduxApp)
