import React from 'react';

import { MdCached } from 'react-icons/md';
import PropTypes from 'prop-types';
import Container from './styles';

export default function Loading({ loading }) {
  return (
    <Container loading={loading}>
      <MdCached color="#7d40e7" size={62} />
    </Container>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
