import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '~/components/Input';
import Select from './Select';
import history from '../../services/history';
import Button from '../../components/Button';
import { Content, Spinner } from './styles';
import { startLoading } from '~/store/modules/loading/actions';
import { saveRequest } from '~/store/modules/order/actions';
import api from '~/services/api';

export default function OrderForm() {
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  const loading = useSelector(state => state.load.loading);

  const [recipients, setRecipients] = useState([]);
  const [deliveryMans, setDeliveryMans] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const defaultDeliveryMan = {
    value: order.DeliveryMan && order.DeliveryMan.id,
    label: order.DeliveryMan && order.DeliveryMan.name,
  };
  const defaultRecipient = {
    value: order.Recipient && order.Recipient.id,
    label: order.Recipient && order.Recipient.name,
  };
  async function handleSearchRecipient(newValue) {
    const inputValue = newValue.replace(/\W/g, '');
    const response = await api.get(
      `recipients?search=${inputValue}&limit=1000000&page=1`
    );
    const recipipents = response.data.rows.map(r => ({
      label: r.name,
      value: r.id,
    }));
    setRecipients(recipipents);
    return recipients;
  }
  async function handleSearchDeliveryMan(newValue) {
    const inputValue = newValue.replace(/\W/g, '');
    const response = await api.get(
      `deliveryman?search=${inputValue}&limit=1000000&page=1`
    );
    const deliveryman = response.data.rows.map(r => ({
      label: r.name,
      value: r.id,
    }));
    setDeliveryMans(deliveryman);
    return deliveryman;
  }

  const filterRecipients = inputValue => {
    return recipients.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filterDeliveryMan = inputValue => {
    return deliveryMans.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadRecipients = (inputValue, callback) => {
    callback(filterRecipients(inputValue));
  };
  const loadDeliveryMan = (inputValue, callback) => {
    callback(filterDeliveryMan(inputValue));
  };

  useEffect(() => {
    if (order) {
      setEditMode(true);
    }
  }, [order]);

  const handleBack = () => {
    history.push('/orders');
  };
  const handleSubmit = async data => {
    try {
      const schema = Yup.object().shape({
        deliverymanId: Yup.string().required('Selecione um entregador'),
        recipientId: Yup.string().required('Selecione um destinatário'),
        product: Yup.string()
          .min(5, 'Digite o nome do produto')
          .required('Digite o nome produto'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const { deliverymanId, recipientId, product } = data;
      dispatch(startLoading());
      dispatch(
        saveRequest({ deliverymanId, recipientId, product, id: order.id })
      );
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
    <Form ref={formRef} onSubmit={handleSubmit} initialData={order}>
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
        <span id="grid">
          <span>
            <label htmlFor="recipient">Destinário</label>
            <Select
              id="recipientId"
              label="Destinatário"
              loadOptions={loadRecipients}
              onInputChange={handleSearchRecipient}
              cacheOptions
              defaultOptions
              defaultValue={defaultRecipient}
              name="recipientId"
            />
          </span>
          <span>
            <label htmlFor="deliveryman">Entregador</label>
            <Select
              id="deliverymanId"
              label="Entregador"
              loadOptions={loadDeliveryMan}
              onInputChange={handleSearchDeliveryMan}
              cacheOptions
              defaultOptions
              defaultValue={defaultDeliveryMan}
              name="deliverymanId"
            />
          </span>
        </span>

        <div id="productDiv">
          <label htmlFor="product">Product</label>
          <Input id="product" name="product" type="text" />
        </div>
      </Content>
    </Form>
  );
}
