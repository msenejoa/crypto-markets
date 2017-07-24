import { combineReducers } from 'redux';
import coins from './coins';
import coinInfo from './coinInfo'
import coinData from './coinHistory'
import userInfo from './userInfo'
import persistedState from './persistedState'


const rootReducer = combineReducers({
    coins,
    coinInfo,
    coinData,
    userInfo,
    persistedState
})

export default rootReducer


