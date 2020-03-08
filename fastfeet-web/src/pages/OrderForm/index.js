import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../services/history';
import Button from '../../components/Button';
import { Content, Spinner, AsyncSelectRecipient } from './styles';
import { startLoading } from '~/store/modules/loading/actions';
import { saveRequest } from '~/store/modules/order/actions';
import api from '~/services/api';

export default function OrderForm() {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  const loading = useSelector(state => state.load.loading);

  const [recipients, setRecipients] = useState([]);
  const [deliveryMans, setDeliveryMans] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [recipientId, setRecipientId] = useState();
  const [product, setProduct] = useState(order.product);
  const [deliverymanId, setDeliveryManId] = useState();

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
    if (order.id && order.Recipient.id && order.DeliveryMan.id) {
      setEditMode(true);
      setDeliveryManId(order.DeliveryMan.id);
      setRecipientId(order.Recipient.id);
    }
  }, [order.id, order.DeliveryMan.id, order.Recipient.id]);

  const handleBack = () => {
    history.push('/orders');
  };
  const handleSave = () => {
    dispatch(startLoading());
    dispatch(
      saveRequest({ deliverymanId, recipientId, product, id: order.id })
    );
  };

  return (
    <form>
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
            <Button buttonType="button" handleClick={handleSave} saveButton>
              SALVAR
            </Button>
          )}
        </div>
      </div>

      <Content>
        <span id="grid">
          <span>
            <label htmlFor="recipient">Destinário</label>
            <AsyncSelectRecipient
              id="recipient"
              label="Destinatário"
              loadOptions={loadRecipients}
              onInputChange={handleSearchRecipient}
              onChange={e => setRecipientId(e.value)}
              cacheOptions
              defaultOptions
              defaultValue={defaultRecipient}
            />
          </span>
          <span>
            <label htmlFor="deliveryman">Entregador</label>
            <AsyncSelectRecipient
              id="deliveryman"
              label="Entregador"
              loadOptions={loadDeliveryMan}
              onInputChange={handleSearchDeliveryMan}
              onChange={e => setDeliveryManId(e.value)}
              cacheOptions
              defaultOptions
              defaultValue={defaultDeliveryMan}
            />
          </span>
        </span>

        <div id="productDiv">
          <label htmlFor="product">Product</label>
          <input
            id="product"
            name="product"
            value={product}
            onChange={e => setProduct(e.target.value)}
            type="text"
          />
        </div>
      </Content>
    </form>
  );
}
