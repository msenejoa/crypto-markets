import { combineReducers } from 'redux';
import coins from './coins';
import coinInfo from './coinInfo'
import coinData from './coinHistory'
import userInfo from './userInfo'


const rootReducer = combineReducers({
    coins,
    coinInfo,
    coinData,
    userInfo
})

export default rootReducer
