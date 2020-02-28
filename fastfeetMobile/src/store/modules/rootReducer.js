import {combineReducers} from 'redux'
import auth from './auth/reducer';
import order from './order/reducer';

export default combineReducers({
  auth,
  order
})
