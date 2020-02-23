import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Form } from '@rocketseat/unform';
import history from '../../services/history';
import Button from '../../components/Button';
import { Content, Spinner } from './styles';
import { startLoading } from '~/store/modules/loading/actions';
import { saveRequest } from '~/store/modules/recipient/actions';
import InputMaskForm from '~/components/InputMask';

export default function RecipientForm() {
  const dispatch = useDispatch();

  const recipientData = useSelector(state => state.recipient);
  const loading = useSelector(state => state.load.loading);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (recipientData.id) {
      setEditMode(true);
    }
  }, []);

  const handleBack = () => {
    history.push('/recipients');
  };
  const handleSave = data => {
    dispatch(startLoading());
    dispatch(saveRequest({ ...data, id: recipientData.id }));
  };

  return (
    <Form onSubmit={handleSave} initialData={recipientData}>
      <div>
        <strong>
          {editMode ? 'Edição do destinatário' : 'Cadastro do destinatário'}
        </strong>
        <div>
          <Button buttonType="button" icon="back" handleClick={handleBack}>
            VOLTAR
          </Button>
          {loading ? (
            <Button icon="none" buttonType="button" saveButton>
              <Spinner size={20} color="#fff" />
            </Button>
          ) : (
            <Button buttonType="submit" saveButton>
              SALVAR
            </Button>
          )}
        </div>
      </div>

      <Content>
        <Input name="name" label="Nome" type="text" />

        <div id="addressLinetwo">
          <Input name="addressLine" type="text" label="Rua" />
          <Input name="number" type="text" label="Número" />
          <Input name="addressLineTwo" type="text" label="Complemento" />
        </div>
        <div>
          <Input name="city" type="text" label="Cidade" />
          <Input name="cityState" type="text" label="Estado" />
          <InputMaskForm
            name="zipCode"
            mask="99999-999"
            alwaysShowMask={false}
          />
        </div>
      </Content>
    </Form>
  );
}
