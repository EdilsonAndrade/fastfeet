import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Grid from '../../components/Grid';
import api from '~/services/api';
import Pagination from '~/components/Pagination';
import ProblemTopContent from './styles';
import ContextMenu from '~/components/ContextMenu';
import Modal from '~/components/Modal';
import NoData from '~/components/NoData';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [orderId, setOrderId] = useState(0);
  const [problemsCount, setProblemsCount] = useState(0);
  const totalPages = 6;
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [problemVisible, setProblemVisible] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const handleClick = (id, idOrder) => {
    if (id === problemVisible) {
      setProblemVisible(0);
    } else {
      setProblemVisible(id);
    }

    setOrderId(idOrder);
  };

  const handlePreviousPage = () => {
    setPreviousPage(previousPage - 1);
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setNextPage(nextPage + 1);
    setPage(page + 1);
  };
  useEffect(() => {
    async function loadFirstData() {
      const response = await api.get(
        `/problems?limit=${totalPages}&page=${page}`
      );

      const { data } = response;

      const dataRows = data.rows.map(e => ({
        ...e,
        isCanceled: e.Order.canceledAt !== null,
        delivered: !!(e.Order.endDate !== null || e.Order.canceledAt),
      }));
      setProblemsCount(data.count);
      setProblems(dataRows);
    }
    loadFirstData();
  }, [page, deleted]);
  async function handleDelete() {
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        let pageOnDelete = page;
        if (problemsCount - 1 <= totalPages) {
          pageOnDelete -= 1;
        }
        await api.delete(`/orders/${orderId}/problems`);
        setPage(!pageOnDelete);
        setDeleted(!deleted);
        toast.success('Sucesso', 'Entrega cancelada com sucesso!');
      } catch ({ response }) {
        const { error } = response.data;
        if (error) {
          toast.error(error);
        } else {
          toast.error(`Ocorreu um erro : ${error}`);
        }
      }
    }
  }

  const handleView = description => {
    setText(description);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const renderPage = () => {
    return (
      <>
        {problems.length <= 0 ? (
          <NoData text="Nenhuma encomenda com ocorrência" />
        ) : (
          <>
            <ProblemTopContent>
              <strong>Problemas na entrega</strong>
            </ProblemTopContent>
            <Grid>
              <thead>
                <tr>
                  <th>ID (ENCOMENDA)</th>
                  <th>PROBLEMA</th>
                  <th />
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {problems.map(problem => (
                  <tr key={problem.id}>
                    <td>
                      <span>{problem.Order.id}</span>
                    </td>
                    <td>
                      {problem.isCanceled === true ? (
                        <span style={{ color: '#DE3B3B' }}>
                          encomenda - cancelada
                        </span>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{problem.description}</td>
                    <td>
                      <button
                        aria-controls="contextMenu"
                        aria-haspopup="true"
                        onClick={
                          () => handleClick(problem.Order.id, problem.Order.id)
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                        type="button"
                      >
                        <ul>
                          <li>.</li>
                          <li>.</li>
                          <li>.</li>
                        </ul>
                        <ContextMenu
                          delivered={problem.delivered}
                          larger
                          problem
                          id={problem.Order.id}
                          visible={problemVisible}
                          handleDelete={() => handleDelete()}
                          handleView={() => handleView(problem.description)}
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
              showForward={problemsCount / totalPages > page}
              handleForwardPage={() => handleNextPage(nextPage)}
            />
            <Modal text={text} handleClose={handleClose} open={open} />
          </>
        )}
      </>
    );
  };

  return renderPage();
}
