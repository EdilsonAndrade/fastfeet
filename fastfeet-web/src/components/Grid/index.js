import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './styles';

export default function Grid({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.none),
    PropTypes.node,
  ]).isRequired,
};
