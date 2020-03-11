import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Input from '~/components/Input';
import { Container, Email, Password, LogoImage } from './styles';
import Logo from '../../assets/logo.png';
import { signinRequest } from '../../store/modules/signin/actions';
import { startLoading } from '../../store/modules/loading/actions';

export default function Signin() {
  const loading = useSelector(state => state.load.loading);
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const handleLogin = async data => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail valido')
          .required('Digite um e-mail valido'),
        password: Yup.string().required('Digite um password válido'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(startLoading());
      dispatch(signinRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleLogin}>
        <LogoImage src={Logo} alt="logo" />
        <Email>
          <Input
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            label="SEU E-MAIL"
          />
        </Email>
        <Password>
          <Input
            type="password"
            name="password"
            placeholder="*******"
            label="SUA SENHA"
          />
        </Password>
        <button type="submit">
          {loading ? 'Carregando' : 'Entrar no sistema'}
        </button>
      </Form>
    </Container>
  );
}
