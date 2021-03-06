import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '../../services/history';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import api from '~/services/api';
import { saveSuccess, loadSuccess } from '~/store/modules/deliveryman/actions';
import Pagination from '~/components/Pagination';
import { Avatar, DeliveryManTopContent } from './styles';
import ContextMenu from '~/components/ContextMenu';
import NoData from '~/components/NoData';
import Loading from '~/components/Loading';

export default function DeliveryMan() {
  const dispatch = useDispatch();
  const deliveryMans = useSelector(state => state.deliveryman.deliveryMans);
  const [searchValue, setSearchValue] = useState('');
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [deliveryManId, setDeliveryManId] = useState(0);
  const [deliveryManCount, setDeliveryManCount] = useState(0);
  const totalPages = 6;
  const [deliveryManVisible, setDeliveryManVisible] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [rotate, setRotate] = useState(false);

  async function handleSearch(e) {
    const response = await api.get(
      `/deliveryman?limit=${totalPages}&page=1&search=${e}`
    );
    const { data } = response;
    setDeliveryManCount(data.count);
    dispatch(loadSuccess(data.rows));
  }
  const handleClick = id => {
    if (id === deliveryManVisible) {
      setDeliveryManVisible(0);
    } else {
      setDeliveryManVisible(id);
    }
    setDeliveryManId(id);
  };

  const handleCadastrar = () => {
    dispatch(saveSuccess(''));
    history.push('/deliveryman/deliverymanform');
  };

  const handlePreviousPage = () => {
    setPreviousPage(previousPage - 1);
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setNextPage(nextPage + 1);
    setPage(page + 1);
  };

  const handleEdit = () => {
    dispatch(saveSuccess(deliveryMans.find(d => d.id === +deliveryManId)));
    history.push({
      pathname: '/deliveryman/deliverymanform',
    });
  };

  async function handleDelete() {
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        await api.delete(`/deliveryman/${deliveryManId}`);
        setDeleted(!deleted);
      } catch ({ response }) {
        const { error } = response.data;
        if (error) {
          if (error.includes('associated')) {
            toast.error(
              'Entregador não pode ser excluido quando associado a um pedido'
            );
          } else {
            toast.error(error);
          }
        } else {
          toast.error(`Ocorreu um erro : ${error}`);
        }
      }
    }
  }

  useEffect(() => {
    setRotate(true);
    async function getDeliveryMan(pageOnDeleted) {
      const response = await api.get(
        `/deliveryman?limit=${totalPages}&page=${pageOnDeleted || page}`
      );
      const { data } = response;

      setDeliveryManCount(data.count);
      dispatch(loadSuccess(data.rows));
      setRotate(false);
    }
    getDeliveryMan();
  }, [page, dispatch, deleted]);

  const renderPage = () => {
    if (rotate) {
      return <Loading rotate={rotate.toString()} />;
    }
    return (
      <>
        {deliveryMans.length <= 0 ? (
          <NoData text="Não há entregador cadastrado, clique em cadastrar" />
        ) : (
          <>
            <Grid>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Foto</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {deliveryMans.map(deliveryman => (
                  <tr key={deliveryman.id}>
                    <td style={{ width: 50 }}>#{deliveryman.id}</td>
                    <td style={{ width: 140 }}>
                      <Avatar
                        src={
                          deliveryman.avatar
                            ? deliveryman.avatar.url
                            : `https://avatar.oxro.io/avatar?name=${deliveryman.name}`
                        }
                        alt="avatar"
                      />
                    </td>
                    <td style={{ width: 420 }}>{deliveryman.name}</td>
                    <td style={{ width: 420 }}>{deliveryman.email}</td>
                    <td style={{ width: 120 }}>
                      <button
                        aria-controls="contextMenu"
                        aria-haspopup="true"
                        onClick={() => handleClick(deliveryman.id)}
                        type="button"
                      >
                        <ul>
                          <li>.</li>
                          <li>.</li>
                          <li>.</li>
                        </ul>
                        <ContextMenu
                          id={deliveryman.id}
                          visible={deliveryManVisible}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          menuId="contextMenu"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Grid>
            <Pagination
              handleBackPage={() => handlePreviousPage(previousPage)}
              showBack={page > 1}
              showForward={deliveryManCount / totalPages > page}
              handleForwardPage={() => handleNextPage(nextPage)}
            />
          </>
        )}
      </>
    );
  };
  return (
    <>
      <DeliveryManTopContent>
        <strong>Gerenciando entregadores</strong>
        <div>
          <label htmlFor="search">
            <MdSearch color="#ccc" size={22} />
            <input
              id="search"
              type="text"
              value={searchValue}
              placeholder="Buscar por entregadores"
              onChange={e => {
                setSearchValue(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </label>

          <Button buttonType="button" saveButton handleClick={handleCadastrar}>
            Cadastrar
          </Button>
        </div>
      </DeliveryManTopContent>
      {renderPage()}
    </>
  );
}
