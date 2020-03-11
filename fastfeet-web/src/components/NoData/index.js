import React from 'react';

import { MdPhonelinkOff } from 'react-icons/md';
import PropTypes from 'prop-types';
import Container from './styles';

export default function NoData({ text }) {
  return (
    <Container>
      <div>
        <MdPhonelinkOff color="#6666" size={82} />
        <strong>{text}</strong>
      </div>
    </Container>
  );
}
NoData.propTypes = {
  text: PropTypes.string.isRequired,
};
