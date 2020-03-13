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

  const filterRecipients = inputValue => {
    const data = recipients.map(d => ({
      value: d.id,
      label: d.name,
    }));
    return data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filterDeliveryMan = inputValue => {
    const data = deliveryMans.map(d => ({
      value: d.id,
      label: d.name,
    }));
    return data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadRecipients = async inputValue => {
    if (inputValue) {
      return filterRecipients(inputValue);
    }

    const response = await api.get('/recipients');
    setRecipients(response.data);

    return new Promise(resolve => {
      resolve(
        response.data.map(d => ({
          value: d.id,
          label: d.name,
        }))
      );
    });
  };
  const loadDeliveryMan = async inputValue => {
    if (inputValue) {
      return filterDeliveryMan(inputValue);
    }

    const response = await api.get('/deliveryman');
    setDeliveryMans(response.data);

    return new Promise(resolve => {
      resolve(
        response.data.map(d => ({
          value: d.id,
          label: d.name,
        }))
      );
    });
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
              cacheOptions
              defaultOptions
              name="recipientId"
            />
          </span>
          <span>
            <label htmlFor="deliveryman">Entregador</label>
            <Select
              id="deliverymanId"
              label="Entregador"
              loadOptions={loadDeliveryMan}
              cacheOptions
              defaultOptions
              name="deliverymanId"
            />
          </span>
        </span>

        <div id="productDiv">
          <Input id="product" name="product" type="text" label="Produto" />
        </div>
      </Content>
    </Form>
  );
}
