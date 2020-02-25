import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Grid from '../../components/Grid';
import api from '~/services/api';
import Pagination from '~/components/Pagination';
import { ProblemTopContent } from './styles';
import ContextMenu from '~/components/ContextMenu';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [page, setPage] = useState(1);
  const [orderId, setOrderId] = useState(0);
  const [problemsCount, setProblemsCount] = useState(0);
  const totalPages = 2;

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  async function getProblems(pageOnDeleted) {
    const response = await api.get(
      `/problems?limit=${totalPages}&page=${pageOnDeleted || page}`
    );
    const { data } = response;
    setProblemsCount(data.count);
    setProblems(data.rows);
  }

  async function handleDelete() {
    setAnchorEl(null);
    if (window.confirm('Tem certeza que quer excluir este registro?')) {
      try {
        let pageOnDelete = page;
        if (problemsCount - 1 <= totalPages) {
          pageOnDelete -= 1;
        }
        await api.delete(`/orders/${orderId}/problems`);
        getProblems(pageOnDelete);
        setPage(pageOnDelete);
      } catch (error) {
        toast.error(`Ocorreu um erro : ${error}`);
      }
    }
  }

  useEffect(() => {
    getProblems();
  }, [previousPage, nextPage]);

  return (
    <>
      <ProblemTopContent>
        <strong>Problemas na entrega</strong>
      </ProblemTopContent>
      <Grid>
        <thead>
          <tr>
            <th>ID</th>
            <th>PROBLEMA</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.orderId}>
              <td>{problem.id}</td>
              <td>{problem.description}</td>
              <td>
                <button
                  aria-controls="contextMenu"
                  aria-haspopup="true"
                  onClick={e => handleClick(e, problem.id)}
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
          menuId="contextMenu"
        />
      </Grid>
      <Pagination
        handleBackPage={() => handlePreviousPage(previousPage)}
        showBack={page > 1}
        showForward={problemsCount / totalPages > page}
        handleForwardPage={() => handleNextPage(nextPage)}
      />
    </>
  );
}
