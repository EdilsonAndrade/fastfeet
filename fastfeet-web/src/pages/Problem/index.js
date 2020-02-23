import React, { useState, useEffect } from 'react';
import { Dialog } from '@material-ui/core';
import { Form, Textarea } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import { Content, AnswerModal, NoDoubt } from './styles';
import api from '~/services/api';

export default function Order() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [studentOrder, setStudentOrder] = useState('');
  const [orderId, setOrderId] = useState(0);

  async function getOrders() {
    const response = await api.get('/help-orders');
    if (response.data) {
      setOrders(response.data);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  const openQuestion = order => {
    const { question, id } = order;
    setStudentOrder(question);
    setOrderId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function handleAnswerStudent(data) {
    const { answer } = data;
    try {
      await api.post(`/help-orders/${orderId}/answer`, { answer });
      toast.success('Duvida respondia com sucesso');
      getOrders();
      setOpen(false);
    } catch (error) {
      toast.error('Ocorreu um erro no servidor');
    }
  }

  return (
    <Content>
      <div>
        <strong>Pedidos de auxilio</strong>
      </div>
      {orders.length > 0 ? (
        <Grid>
          <thead>
            <tr>
              <th>Aluno</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.Student.name}</td>
                <td>
                  <button type="button" onClick={() => openQuestion(order)}>
                    Responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Grid>
      ) : (
        <NoDoubt>
          <p>Nenhum aluno com dúvidas</p>
        </NoDoubt>
      )}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <AnswerModal>
          <Form onSubmit={handleAnswerStudent}>
            <strong>PERGUNTA DO ALUNO</strong>
            <span>{studentOrder}</span>
            <strong>SUA RESPOSTA</strong>
            <div>
              <Textarea
                style={{ borderStyle: 'none' }}
                placeholder="Insira a resposta com detalhamento"
                name="answer"
                cols={38}
                rows={10}
              />
            </div>
            <span>
              <Button buttonType="submit" icon="none" saveButton>
                Responder aluno
              </Button>
            </span>
          </Form>
        </AnswerModal>
      </Dialog>
    </Content>
  );
}
