import { all } from 'redux-saga/effects';

import signin from './signin/sagas';
import order from './order/sagas';
import deliveryman from './deliveryman/sagas';
import recipient from './recipient/sagas';

export default function* rootSaga() {
  return yield all([signin, order, deliveryman, recipient]);
}
