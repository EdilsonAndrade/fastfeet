import React from 'react';

import { MdCached } from 'react-icons/md';
import PropTypes from 'prop-types';
import Container from './styles';

export default function LoadingPage({ rotate }) {
  return (
    <Container rotate={rotate}>
      <MdCached color="#7d40e7" size={62} />
    </Container>
  );
}

LoadingPage.propTypes = {
  rotate: PropTypes.string.isRequired,
};
