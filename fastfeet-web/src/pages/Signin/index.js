import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Email, Password, LogoImage } from './styles';
import Logo from '../../assets/logo.png';
import { signinRequest } from '../../store/modules/signin/actions';
import { startLoading } from '../../store/modules/loading/actions';

export default function Signin() {
  const loading = useSelector(state => state.load.loading);

  const dispatch = useDispatch();

  const handleLogin = data => {
    dispatch(startLoading());
    dispatch(signinRequest(data));
  };
  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <LogoImage src={Logo} alt="logo" />
        <Email>
          <strong>SEU E-MAIL</strong>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </Email>
        <Password>
          <strong>SUA SENHA</strong>
          <Input type="password" name="password" placeholder="*******" />
        </Password>
        <button type="submit">
          {loading ? 'Carregando' : 'Entrar no sistema'}
        </button>
      </Form>
    </Container>
  );
}
