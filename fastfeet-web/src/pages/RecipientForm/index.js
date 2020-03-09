import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
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
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome deve ser informado'),
    addressLine: Yup.string('Endereço deve ser informado').required(
      'Endereço deve ser informado'
    ),
    number: Yup.string().required('Número deve ser informado'),
    addressLineTwo: Yup.string(),
    zipCode: Yup.string('Cep deve ser informado').required(
      'Cep deve ser informado'
    ),
    city: Yup.string('Cidade deve ser informado').required(
      'Cidade deve ser informado'
    ),
    cityState: Yup.string('Estado deve ser informado').required(
      'Estado deve ser informado'
    ),
  });
  useEffect(() => {
    if (recipientData.id) {
      setEditMode(true);
    }
  }, [recipientData.id]);

  const handleBack = () => {
    history.push('/recipients');
  };
  const handleSave = data => {
    dispatch(startLoading());
    dispatch(saveRequest({ ...data, id: recipientData.id }));
  };

  return (
    <Form schema={schema} onSubmit={handleSave} initialData={recipientData}>
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
        <Input name="name" label="Nome" type="text" placeholder="Nome" />

        <div id="addressLinetwo">
          <div>
            <Input
              name="addressLine"
              type="text"
              label="Rua"
              placeholder="Rua"
            />
          </div>
          <div>
            <Input
              name="number"
              type="text"
              label="Número"
              placeholder="Número"
            />
          </div>
          <div>
            <Input
              name="addressLineTwo"
              type="text"
              label="Complemento"
              placeholder="Complemento"
            />
          </div>
        </div>
        <div>
          <div>
            <Input
              name="city"
              type="text"
              label="Cidade"
              placeholder="Cidade"
            />
          </div>
          <div>
            <Input
              name="cityState"
              type="text"
              label="Estado"
              placeholder="Estado"
            />
          </div>
          <div>
            <InputMaskForm
              name="zipCode"
              mask="99999-999"
              alwaysShowMask={false}
              placeholder="Cep"
              label="Cep"
            />
          </div>
        </div>
      </Content>
    </Form>
  );
}
