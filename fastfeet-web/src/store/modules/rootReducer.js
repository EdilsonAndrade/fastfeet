import { combineReducers } from 'redux';
import signin from './signin/reducer';
import order from './order/reducer';
import deliveryman from './deliveryman/reducer';
import load from './loading/reducer';
import recipient from './recipient/reducer';

export default combineReducers({
  signin,
  load,
  order,
  deliveryman,
  recipient,
});
