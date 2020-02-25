import React from 'react';

import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Content, HeaderLogo } from './styles';
import Logo from '../../assets/logo.png';
import { signOutRequest } from '~/store/modules/signin/actions';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <Container>
      <Content>
        <nav>
          <div>
            <HeaderLogo src={Logo} alt="gympoint" />
          </div>
          <NavLink
            activeStyle={{ color: '#000000' }}
            style={{ color: '#999999' }}
            to="/orders"
          >
            ENCOMENDAS
          </NavLink>
          <NavLink
            activeStyle={{ color: '#000000' }}
            style={{ color: '#999999' }}
            to="/deliveryman"
          >
            ENTREGADORES
          </NavLink>
          <NavLink
            activeStyle={{ color: '#000000' }}
            style={{ color: '#999999' }}
            to="/recipients"
          >
            DESTINATÁRIOS
          </NavLink>
          <NavLink
            activeStyle={{ color: '#000000' }}
            style={{ color: '#999999' }}
            to="/problem"
          >
            PROBLEMAS
          </NavLink>
        </nav>
        <aside>
          <strong>Edilson Andrade</strong>
          <button type="button" onClick={() => dispatch(signOutRequest())}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
