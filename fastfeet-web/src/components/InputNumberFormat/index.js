import React, { useRef, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

export default function InputNumberFormatForm({ name, label, ...rest }) {
  const ref = useRef();
  const { fieldName, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: maskRef => {
        maskRef.clear();
      },
    });
  },[ref.current, fieldName]); // eslint-disable-line

  const props = {
    ...rest,
  };
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <NumberFormat {...props} ref={ref} />
      {error && <span>{error}</span>}
    </>
  );
}
InputNumberFormatForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
