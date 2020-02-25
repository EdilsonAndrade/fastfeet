import { call, put, takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import * as RecipentActions from './actions';
import { stopLoading } from '../loading/actions';

function* saveRequest({ payload }) {
  const {
    name,
    addressLine,
    addressLineTwo,
    id,
    number,
    zipCode,
    city,
    cityState,
  } = payload.data;
  try {
    if (id) {
      const response = yield call(api.put, `/recipients/${id}`, {
        name,
        addressLine,
        addressLineTwo,
        number,
        zipCode,
        city,
        state: cityState,
      });
      yield put(RecipentActions.saveSuccess(response.data));
      toast.success('Destinatário cadastrado com sucesso');
    } else {
      const response = yield call(api.post, '/recipients', {
        name,
        addressLine,
        addressLineTwo,
        number,
        zipCode,
        city,
        state: cityState,
      });

      yield put(RecipentActions.saveSuccess(response.data));
      toast.success('Destinatário cadastrado com sucesso');
    }

    yield put(stopLoading());

    history.push('/recipients');
  } catch (error) {
    yield put(stopLoading());
    toast.error(
      'Ocorreu erro no servidor, tente novamente',
      error.response.data
    );
  }
}

export default all([takeLatest('@recipient/SAVE_REQUEST', saveRequest)]);
