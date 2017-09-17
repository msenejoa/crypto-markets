import { compose, createStore, applyMiddleware } from 'redux'
import app from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { AsyncStorage } from 'react-native'


import { autoRehydrate, persistStore, createPersistor } from 'redux-persist'


export default function configureStore() {
  let store = compose(
    applyMiddleware(thunk),
    autoRehydrate({log: false})
    )(createStore)(app);
  persistStore(store, {storage: AsyncStorage, whitelist: ['userInfo']});
  return store
}

