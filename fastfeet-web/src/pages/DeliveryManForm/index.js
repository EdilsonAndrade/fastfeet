import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '~/components/Input';
import history from '../../services/history';
import Button from '../../components/Button';
import { Content, Spinner } from './styles';
import { startLoading } from '~/store/modules/loading/actions';
import { saveRequest } from '~/store/modules/deliveryman/actions';

import AvatarInput from './AvatarInput/index';

export default function DeliveryManForm() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const deliveryManData = useSelector(state => state.deliveryman);
  const loading = useSelector(state => state.load.loading);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (deliveryManData.id) {
      setEditMode(true);
    }
  }, [deliveryManData.id]);

  const handleBack = () => {
    history.push('/deliveryman');
  };
  const handleSubmit = async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome deve ser informado'),
        email: Yup.string('E-mail deve ser informado')
          .required('E-mail deve ser informado')
          .email('E-mail deve ser informado'),
        avatar_id: Yup.number(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(startLoading());
      dispatch(saveRequest({ ...data, id: deliveryManData.id }));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} initialData={deliveryManData}>
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
