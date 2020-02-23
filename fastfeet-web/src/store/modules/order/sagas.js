import { call, put, takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { saveSuccess } from './actions';
import { stopLoading } from '../loading/actions';

function* saveRequest({ payload }) {
  const { recipientId, deliverymanId, id, product } = payload.data;
  try {
    if (id) {
      const response = yield call(api.put, `/orders/${id}`, {
        recipientId,
        deliverymanId,
        product,
      });
      yield put(saveSuccess(response.data));
      toast.success('Encomenda atualizada com sucesso');
    } else {
      const response = yield call(api.post, '/orders', {
        recipientId,
        deliverymanId,
        product,
      });
      yield put(saveSuccess(response.data));
      toast.success('Encomenda cadastrada com sucesso');
    }

    yield put(stopLoading());

    history.push('/orders');
  } catch (error) {
    yield put(stopLoading());
    toast.error('Ocorreu erro no servidor, tente novamente', error);
  }
}

export default all([takeLatest('@order/SAVE_REQUEST', saveRequest)]);
