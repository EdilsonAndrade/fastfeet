import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import history from '../../services/history';
import Button from '../../components/Button';
import { Content, Spinner } from './styles';
import { startLoading } from '~/store/modules/loading/actions';
import { saveRequest } from '~/store/modules/deliveryman/actions';

import AvatarInput from './AvatarInput/index';

const schema = Yup.object().shape({
  name: Yup.string().required('Name deve ser informado'),
  email: Yup.string('E-mail deve ser informado')
    .required('E-mail deve ser informado')
    .email('E-mail deve ser informado'),
  avatar_id: Yup.number(),
});

export default function DeliveryManForm() {
  const dispatch = useDispatch();

  const deliveryManData = useSelector(state => state.deliveryman);
  const loading = useSelector(state => state.load.loading);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (deliveryManData.id) {
      setEditMode(true);
    }
  }, []);

  const handleBack = () => {
    history.push('/deliveryman');
  };
  const handleSave = data => {
    dispatch(startLoading());
    dispatch(saveRequest({ ...data, id: deliveryManData.id }));
  };

  return (
    <Form schema={schema} onSubmit={handleSave} initialData={deliveryManData}>
      <div>
        <strong>
          {editMode ? 'Edição do entregador' : 'Cadastro do entregador'}
        </strong>
        <div>
          <Button buttonType="button" icon="back" handleClick={handleBack}>
            VOLTAR
          </Button>
          {loading ? (
            <Button icon="none" buttonType="button" saveButton>
              <Spinner size={20} color="#fff" />
            </Button>
          ) : (
            <Button buttonType="submit" saveButton>
              SALVAR
            </Button>
          )}
        </div>
      </div>

      <Content>
        <div>
          <AvatarInput name="avatar_id" />
        </div>

        <Input name="name" label="Nome" type="text" />
        <Input name="email" type="email" label="E-mail" />
      </Content>
    </Form>
  );
}
