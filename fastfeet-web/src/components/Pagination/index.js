import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from './styles';

export default function Pagination({
  handleBackPage,
  handleForwardPage,
  showBack,
  showForward,
}) {
  return (
    <Container>
      {showBack ? (
        <Button type="button" onClick={handleBackPage}>
          Anterior
        </Button>
      ) : (
        <span />
      )}
      {showForward ? (
        <Button type="button" onClick={handleForwardPage}>
          Proximo
        </Button>
      ) : (
        <span />
      )}
    </Container>
  );
}

Pagination.propTypes = {
  handleBackPage: PropTypes.func.isRequired,
  handleForwardPage: PropTypes.func.isRequired,
  showBack: PropTypes.bool.isRequired,
  showForward: PropTypes.bool.isRequired,
};
