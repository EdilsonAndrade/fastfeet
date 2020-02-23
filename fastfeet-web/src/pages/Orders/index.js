import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import history from '../../services/history';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import ButtonDiv from './styles';
import api from '~/services/api';
import { saveSuccess } from '~/store/modules/order/actions';
import Pagination from '~/components/Pagination';
import ContextMenu from '~/components/ContextMenu';

export default function Order() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState([]);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [ordersCount, setOrdersCount] = useState(0);
  const totalPages = 2;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [orderId, setOrderId] = useState(0);
  const handleCadastrar = () => {
    dispatch(saveSuccess(''));
    history.push('/order/orderform');
  };

  async function handleSearchStudent(e) {
    const response = await api.get(
      `/orders?limit=${totalPages}&page=${page}&name=${e}`
    );
    const { data } = response;
    setOrdersCount(data.count);
    setOrders(data.rows);
  }

  const handleEdit = () => {
    dispatch(saveSuccess(orders.find(d => d.id === +orderId)));
    setAnchorEl(null);
    history.push({
      pathname: '/order/orderform',
    });
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOrderId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePreviousPage = () => {
    setPreviousPage(previousPage - 1);
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setNextPage(nextPage + 1);
    setPage(page + 1);
  };
  async function handleDelete(id) {
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        const response = await api.delete(`/students/${id}`);
        setOrders(response.data.rows);
        setOrdersCount(response.data.count);
        setPage(1);
      } catch (error) {
        toast.error(`Ocorreu um erro : ${error}`);
      }
    }
  }

  useEffect(() => {
    async function getOrders() {
      const response = await api.get(`/orders?limit=2&page=${page}`);
      setOrdersCount(response.data.count);
      const { data } = response;
      setOrders(data.rows);
      if (response.data.length <= 0) {
        setPage(page - 1);
      }
    }
    getOrders();
  }, [dispatch, page]);

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
              <td>{order.Recipient.name}</td>
              <td>{order.DeliveryMan.name}</td>
              <td>{order.Recipient.city}</td>
              <td>{order.Recipient.state}</td>
              <td>{order.status}</td>
              <td>
                <button
                  aria-controls="contextMenu"
                  aria-haspopup="true"
                  onClick={e => handleClick(e, order.id)}
                  type="button"
                >
                  <ul>
                    <li>.</li>
                    <li>.</li>
                    <li>.</li>
                  </ul>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <ContextMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          menuId="contextMenu"
        />
      </Grid>
      <Pagination
        handleBackPage={() => handlePreviousPage(previousPage)}
        showBack={page > 1}
        showForward={ordersCount / totalPages > page}
        handleForwardPage={() => handleNextPage(nextPage)}
      />
    </>
  );
}
