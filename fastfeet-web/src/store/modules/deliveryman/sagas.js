import { call, put, takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { saveSuccess } from './actions';
import { stopLoading } from '../loading/actions';

function* saveRequest({ payload }) {
  const { id, name, email, avatar_id } = payload.data;
  try {
    if (id) {
      const response = yield call(api.put, `/deliveryman/${id}`, {
        name,
        email,
        avatar_id,
      });
      yield put(saveSuccess(response.data));
      toast.success('Entregador atualizado com sucesso');
    } else {
      const response = yield call(api.post, '/deliveryman', {
        name,
        email,
        avatar_id,
      });
      yield put(saveSuccess(response.data));
      toast.success('Entregador cadastrado com sucesso');
    }

    yield put(stopLoading());

    history.push('/deliveryman');
  } catch (error) {
    const { response } = error;
    yield put(stopLoading());
    toast.error(`Ocorreu erro no servidor, tente novamente ${response.data}`);
  }
}

export default all([takeLatest('@deliveryMan/SAVE_REQUEST', saveRequest)]);
