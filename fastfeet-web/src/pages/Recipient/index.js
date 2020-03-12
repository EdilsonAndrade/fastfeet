import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '../../services/history';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import api from '~/services/api';
import { saveSuccess, loadSuccess } from '~/store/modules/recipient/actions';
import Pagination from '~/components/Pagination';
import RecipientTopContent from './styles';
import ContextMenu from '~/components/ContextMenu';
import NoData from '~/components/NoData';
import Loading from '~/components/Loading';

export default function Recipient() {
  const dispatch = useDispatch();
  const recipients = useSelector(state => state.recipient.recipients);
  const [searchValue, setSearchValue] = useState('');
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [recipientId, setRecipientId] = useState(0);
  const [recipientCount, setRecipientCount] = useState(0);
  const totalPages = 6;
  const [recipientVisible, setRecipientVisible] = useState(0);
  const [deleted, setdeleted] = useState(false);
  const [rotate, setRotate] = useState(false);

  async function handleSearch(e) {
    const response = await api.get(
      `/recipients?limit=${totalPages}&page=1&search=${e}`
    );
    const { data } = response;
    const dataFormated = data.rows.map(d => ({
      ...d,
      fullAddress: `${d.addressLine}, ${d.number} ${d.addressLineTwo} - ${d.city} - ${d.state}`,
    }));
    setRecipientCount(data.count);
    dispatch(loadSuccess(dataFormated));
  }
  const handleClick = id => {
    if (recipientVisible === id) {
      setRecipientVisible(0);
    } else {
      setRecipientVisible(id);
    }
    setRecipientId(id);
  };
  const handleCadastrar = () => {
    dispatch(saveSuccess(''));
    history.push('/recipients/recipientform');
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
    dispatch(saveSuccess(recipients.find(d => d.id === +recipientId)));
    history.push({
      pathname: '/recipients/recipientform',
    });
  };

  async function handleDelete() {
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        await api.delete(`/recipients/${recipientId}`);
        setdeleted(!deleted);
      } catch ({ response }) {
        if (response.data) {
          const { error } = response.data;
          if (error) {
            if (error.includes('associated')) {
              toast.error(
                'Cliente possui um pedido associado, não é possível remover'
              );
            }
          }
        } else {
          toast.error(`Ocorreu um erro sistêmico : ${response}`);
        }
      }
    }
  }

  useEffect(() => {
    setRotate(true);
    async function getRecipients(pageOnDeleted) {
      const response = await api.get(
        `/recipients?limit=${totalPages}&page=${pageOnDeleted || page}`
      );
      const { data } = response;
      const dataFormated = data.rows.map(d => ({
        ...d,
        fullAddress: `${d.addressLine}, ${d.number} ${d.addressLineTwo} - ${d.city} - ${d.state}`,
      }));
      setRecipientCount(data.count);
      dispatch(loadSuccess(dataFormated));
      setRotate(false);
    }
    getRecipients();
  }, [page, deleted, dispatch]);

  const renderPage = () => {
    if (rotate) {
      return <Loading rotate={rotate.toString()} />;
    }
    return (
      <>
        {recipients.length <= 0 ? (
          <NoData text="Sem destinatário cadastrado, clique em cadastrar" />
        ) : (
          <>
            <Grid>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOME</th>
                  <th>ENDEREÇO</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map(recipient => (
                  <tr key={recipient.id}>
                    <td style={{ width: 50 }}>{recipient.id}</td>
                    <td style={{ width: 320 }}>{recipient.name}</td>
                    <td>{recipient.fullAddress}</td>
                    <td style={{ width: 120 }}>
                      <button
                        onClick={() => handleClick(recipient.id)}
                        type="button"
                      >
                        <ul>
                          <li>.</li>
                          <li>.</li>
                          <li>.</li>
                        </ul>
                        <ContextMenu
                          id={recipient.id}
                          visible={recipientVisible}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
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
              showForward={recipientCount / totalPages > page}
              handleForwardPage={() => handleNextPage(nextPage)}
            />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <RecipientTopContent>
        <strong>Gerenciando destinatário</strong>
        <div>
          <label htmlFor="search">
            <MdSearch color="#ccc" size={22} />
            <input
              id="search"
              type="text"
              value={searchValue}
              placeholder="Buscar por destinatário"
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
      </RecipientTopContent>
      {renderPage()}
    </>
  );
}
