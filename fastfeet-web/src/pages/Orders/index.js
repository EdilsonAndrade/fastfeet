import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import history from '../../services/history';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import { ButtonDiv, StatusContent } from './styles';
import api from '~/services/api';
import { saveSuccess } from '~/store/modules/order/actions';
import Pagination from '~/components/Pagination';
import ContextMenu from '~/components/ContextMenu';
import Modal from '~/components/Modal';

export default function Order() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState([]);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [ordersCount, setOrdersCount] = useState(0);
  const totalPages = 2;
  const [orderVisible, setOrderVisible] = React.useState(0);
  const [orderId, setOrderId] = useState(0);
  const [open, setOpen] = useState(false);
  const [orderImageUrl, setOrderImageUrl] = useState();
  const [order, setOrder] = useState({});
  const handleCadastrar = () => {
    dispatch(saveSuccess(''));
    history.push('/order/orderform');
  };

  const handleEdit = () => {
    dispatch(saveSuccess(orders.find(d => d.id === +orderId)));
    history.push({
      pathname: '/order/orderform',
    });
  };

  const handleView = imageUrl => {
    setOrderImageUrl(imageUrl);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (selectedOrder, id) => {
    if (id === orderVisible) {
      setOrderVisible(0);
    } else {
      setOrderVisible(id);
    }
    setOrderId(id);
    setOrder(selectedOrder);
  };

  const handlePreviousPage = () => {
    setPreviousPage(previousPage - 1);
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setNextPage(nextPage + 1);
    setPage(page + 1);
  };

  const getFormatedStatus = selectedOrder => {
    let status = {};
    if (selectedOrder.canceledAt) {
      status = { text: 'CANCELADA', background: '#FAB0B0', color: '#DE3B3B' };
      return status;
    }
    if (selectedOrder.endDate) {
      status = { text: 'ENTREGUE', background: '#DFF0DF', color: '#2CA42B' };
      return status;
    }
    if (selectedOrder.startDate) {
      status = { text: 'RETIRADA', background: '#BAD2FF', color: '#4D85EE' };
      return status;
    }
    status = { text: 'PENDENTE', background: '#F0F0DF', color: '#C1BC35' };
    return status;
  };

  async function handleSearchStudent(e) {
    const response = await api.get(
      `/orders?limit=${totalPages}&page=${page}&name=${e}`
    );
    const { data } = response;
    const dataWithStatusFormated = data.rows.map(d => ({
      ...d,
      formattedStatus: getFormatedStatus(d),
    }));
    setOrders(dataWithStatusFormated);
    setOrdersCount(data.count);
    setOrders(data.rows);
  }

  async function getOrders(onDeletePage) {
    const response = await api.get(
      `/orders?limit=2&page=${onDeletePage || page}`
    );
    setOrdersCount(response.data.count);
    const { data } = response;
    const dataWithStatusFormated = data.rows.map(d => ({
      ...d,
      formattedStatus: getFormatedStatus(d),
    }));
    setOrders(dataWithStatusFormated);
    if (response.data.length <= 0) {
      setPage(page - 1);
    }
  }

  async function handleDelete() {
    setOrderVisible(0);
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        await api.delete(`/orders/${orderId}`);
        getOrders(page);
      } catch (error) {
        toast.error(`Ocorreu um erro : ${error}`);
      }
    }
  }

  useEffect(() => {
    getOrders();
  }, [page]);

  return (
    <>
      <div>
        <strong>Gerenciando encomendas</strong>
        <ButtonDiv>
          <Button
            buttonType="button"
            saveButton
            icon="add"
            handleClick={handleCadastrar}
          >
            Cadastrar
          </Button>
          <input
            type="text"
            value={searchValue}
            placeholder="Buscar aluno"
            onChange={e => {
              setSearchValue(e.target.value);
              handleSearchStudent(e.target.value);
            }}
          />
        </ButtonDiv>
      </div>
      <Grid>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td style={{ width: 420 }}>{order.Recipient.name}</td>
              <td style={{ width: 420 }}>{order.DeliveryMan.name}</td>
              <td>{order.Recipient.city}</td>
              <td>{order.Recipient.state}</td>
              <td>
                <StatusContent id="status" status={order.formattedStatus}>
                  <span>{order.formattedStatus.text}</span>
                </StatusContent>
              </td>
              <td>
                {order.canceledAt ? null : (
                  <button
                    onClick={() => handleClick(order, order.id)}
                    type="button"
                  >
                    <ul>
                      <li>.</li>
                      <li>.</li>
                      <li>.</li>
                    </ul>
                    <ContextMenu
                      id={order.id}
                      order={order && order.endDate}
                      visible={orderVisible}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      handleView={() => handleView(order.File.url)}
                      menuId="contextMenu"
                    />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Grid>
      <Pagination
        handleBackPage={() => handlePreviousPage(previousPage)}
        showBack={page > 1}
        showForward={ordersCount / totalPages > page}
        handleForwardPage={() => handleNextPage(nextPage)}
      />
      <Modal
        recipient={order.Recipient}
        order={order}
        imageUrl={orderImageUrl}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
}
