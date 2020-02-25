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

export default function Recipient() {
  const dispatch = useDispatch();
  const recipients = useSelector(state => state.recipient.recipients);
  const [searchValue, setSearchValue] = useState('');
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [recipientId, setRecipientId] = useState(0);
  const [recipientCount, setRecipientCount] = useState(0);
  const totalPages = 2;

  const [anchorEl, setAnchorEl] = React.useState(null);

  async function handleSearch(e) {
    const response = await api.get(
      `/recipients?limit=${totalPages}&page=${page}&search=${e}`
    );
    const { data } = response;
    const dataFormated = data.rows.map(d => ({
      ...d,
      fullAddress: `${d.addressLine}, ${d.number} ${d.addressLineTwo} - ${d.city} - ${d.state}`,
    }));
    setRecipientCount(data.count);
    dispatch(loadSuccess(dataFormated));
  }
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setRecipientId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  }
  const handleEdit = () => {
    dispatch(saveSuccess(recipients.find(d => d.id === +recipientId)));
    setAnchorEl(null);
    history.push({
      pathname: '/recipients/recipientform',
    });
  };

  async function handleDelete() {
    setAnchorEl(null);
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        let pageOnDelete = page;
        if (recipientCount - 1 <= totalPages) {
          pageOnDelete -= 1;
        }
        await api.delete(`/recipients/${recipientId}`);
        getRecipients(pageOnDelete);
        setPage(pageOnDelete);
      } catch (error) {
        toast.error(`Ocorreu um erro : ${error}`);
      }
    }
  }

  useEffect(() => {
    getRecipients();
  }, [previousPage, nextPage]);

  return (
    <>
      <RecipientTopContent>
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
      </RecipientTopContent>
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
              <td>{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>{recipient.fullAddress}</td>
              <td>
                <button
                  aria-controls="contextMenu"
                  aria-haspopup="true"
                  onClick={e => handleClick(e, recipient.id)}
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
        showForward={recipientCount / totalPages > page}
        handleForwardPage={() => handleNextPage(nextPage)}
      />
    </>
  );
}
