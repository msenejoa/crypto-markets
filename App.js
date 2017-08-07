import React from 'react';

import { app, StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { autoRehydrate, persistStore } from 'redux-persist'

import { Provider } from 'react-redux';

import configureStore from './configureStore'
import AppIndex from './appIndex'

const store = configureStore()

//persistStore(store, {storage: AsyncStorage});

export default class App extends React.Component {

  componentWillMount() {
    //persistStore(store, {storage: AsyncStorage});
    //console.log(store)
    console.log('--------------------------------------')
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
