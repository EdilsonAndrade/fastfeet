import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { zonedTimeToUtc } from 'date-fns-tz';
import history from '../../services/history';
import Top from './Top';
import OrdersTable from './OrdersTable';
import api from '~/services/api';
import { saveSuccess } from '~/store/modules/order/actions';
import { signOutSuccess } from '~/store/modules/signin/actions';
import Pagination from '~/components/Pagination';

import Modal from '~/components/Modal';

export default function Order() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState([]);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [ordersCount, setOrdersCount] = useState(0);
  const totalPages = 6;
  const [orderVisible, setOrderVisible] = React.useState(0);
  const [orderId, setOrderId] = useState(0);
  const [open, setOpen] = useState(false);
  const [orderImageUrl, setOrderImageUrl] = useState();
  const [order, setOrder] = useState({});
  const [deleted, setDeleted] = useState(false);
  const handleCadastrar = () => {
    dispatch(saveSuccess(''));
    history.push('/orders/orderform');
  };

  const handleEdit = () => {
    dispatch(saveSuccess(orders.find(d => d.id === +orderId)));
    history.push({
      pathname: '/orders/orderform',
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

  async function handleSearch(e) {
    const response = await api.get(
      `/orders?limit=${totalPages}&page=1&search=${e}`
    );
    const { data } = response;
    const dataWithStatusFormated = data.rows.map(d => ({
      ...d,
      formattedStatus: getFormatedStatus(d),
    }));
    setOrders(dataWithStatusFormated);
    setOrdersCount(data.count);
    setOrders(dataWithStatusFormated);
  }

  async function handleDelete() {
    setOrderVisible(0);
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        await api.delete(`/orders/${orderId}`);
        setDeleted(!deleted);
      } catch (error) {
        toast.error(`Ocorreu um erro : ${error}`);
      }
    }
  }

  useEffect(() => {
    async function getOrders(onDeletePage) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      try {
        const response = await api.get(
          `/orders?limit=6&page=${onDeletePage || page}`
        );

        setOrdersCount(response.data.count);
        const { data } = response;
        const dataWithStatusFormated = data.rows.map(d => ({
          ...d,
          formattedStatus: getFormatedStatus(d),
          formatedStartDate: d.startDate
            ? format(
                zonedTimeToUtc(d.startDate, timezone),
                'dd/MM/yyyy HH:mm:ss',
                {
                  locale: pt,
                }
              )
            : '',
          formatedEndDate: d.endDate
            ? format(
                zonedTimeToUtc(d.endDate, timezone),
                'dd/MM/yyyy HH:mm:ss',
                {
                  locale: pt,
                }
              )
            : '',
        }));

        setOrders(dataWithStatusFormated);
        if (response.data.length <= 0) {
          setPage(page - 1);
        }
      } catch (error) {
        toast.warn('Ocorreu um erro, favor logar novamente');
        dispatch(signOutSuccess());
        history.push('Signin');
      }
    }
    getOrders();
  }, [page, deleted, dispatch]);

  return (
    <>
      <Top
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        handleCadastrar={handleCadastrar}
        handleSearch={handleSearch}
      />
      <OrdersTable
        data={orders}
        orderVisible={orderVisible}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
        handleClick={handleClick}
      />
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
