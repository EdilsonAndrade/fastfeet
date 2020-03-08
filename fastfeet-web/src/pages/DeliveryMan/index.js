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

export default function DeliveryMan() {
  const dispatch = useDispatch();
  const deliveryMans = useSelector(state => state.deliveryman.deliveryMans);
  const [searchValue, setSearchValue] = useState('');
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [deliveryManId, setDeliveryManId] = useState(0);
  const [deliveryManCount, setDeliveryManCount] = useState(0);
  const totalPages = 2;
  const [deliveryManVisible, setDeliveryManVisible] = useState(0);
  const [pageRows, setPageRows] = useState(0);
  async function handleSearch(e) {
    const response = await api.get(
      `/deliveryman?limit=${totalPages}&page=${page}&search=${e}`
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

  async function getDeliveryMan(pageOnDeleted) {
    const response = await api.get(
      `/deliveryman?limit=${totalPages}&page=${pageOnDeleted || page}`
    );
    const { data } = response;

    setDeliveryManCount(data.count);
    setPageRows(data.rows.length);
    dispatch(loadSuccess(data.rows));
  }
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
        let pageOnDelete = page;
        if (pageRows - 1 < 1) {
          pageOnDelete -= 1;
        }

        getDeliveryMan(pageOnDelete);
        setPage(pageOnDelete);
      } catch (error) {
        toast.error(`Ocorreu um erro : ${error}`);
      }
    }
  }

  useEffect(() => {
    getDeliveryMan();
  }, [page]);

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
              <td>{deliveryman.id}</td>
              <td>
                <Avatar
                  src={
                    deliveryman.avatar
                      ? deliveryman.avatar.url
                      : `https://avatar.oxro.io/avatar?name=${deliveryman.name}`
                  }
                  alt="avatar"
                />
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
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
  );
}
