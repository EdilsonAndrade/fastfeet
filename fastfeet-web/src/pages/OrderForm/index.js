import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Form, Select } from '@rocketseat/unform';
import history from '../../services/history';
import Button from '../../components/Button';
import { Content, Spinner } from './styles';
import { startLoading } from '~/store/modules/loading/actions';
import { saveRequest } from '~/store/modules/order/actions';
import * as DeliveryManActions from '~/store/modules/deliveryman/actions';
import * as RecipientActions from '~/store/modules/recipient/actions';
import api from '~/services/api';

export default function OrderForm() {
  const dispatch = useDispatch();
  const recipients = useSelector(state => state.recipient.recipients);
  const deliverymans = useSelector(state => state.deliveryman.deliveryMans);
  const orderData = useSelector(state => state.order);
  const loading = useSelector(state => state.load.loading);

  const [editMode, setEditMode] = useState(false);

  const recipientsSelect = recipients.map(recipient => ({
    id: recipient.id,
    title: recipient.name,
  }));

  const deliverymanSelect = deliverymans.map(deliveryman => ({
    id: deliveryman.id,
    title: deliveryman.name,
  }));
  useEffect(() => {
    if (orderData.id) {
      setEditMode(true);
    }
  }, []);

  const handleBack = () => {
    history.push('/orders');
  };
  const handleSave = data => {
    dispatch(startLoading());
    dispatch(saveRequest({ ...data, id: orderData.id }));
  };

  useEffect(() => {
    async function getRecipientsAndDeliveryMans() {
      let response = await api.get('/deliveryman');
      let { data } = response;
      dispatch(DeliveryManActions.loadSuccess(data));
      response = await api.get('/recipients');
      data = response.data;
      dispatch(RecipientActions.loadSuccess(data));
    }

    getRecipientsAndDeliveryMans();
  }, []);

  return (
    <Form onSubmit={handleSave} initialData={orderData}>
      <div>
        <strong>
          {editMode ? 'Edição de encomendas' : 'Cadastro de encomendas'}
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
          <Select
            name="recipientId"
            options={recipientsSelect}
            label="Destinatário"
          />
          <Select
            name="deliveryManId"
            options={deliverymanSelect}
            label="Entregador"
          />
        </div>
        <div>
          <Input name="product" type="text" label="Produto" />
        </div>
      </Content>
    </Form>
  );
}
