import React, { useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

export default function InputMaskForm({ name, label, ...rest }) {
  const ref = useRef();

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
      clearValue: maskRef => {
        maskRef.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <InputMask {...rest} defaultValue={defaultValue} maskChar="" ref={ref} />
      {error && <span>{error}</span>}
    </>
  );
}
InputMaskForm.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
