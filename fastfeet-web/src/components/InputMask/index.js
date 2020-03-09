import React, { useRef, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

export default function InputMaskForm({ name, label, ...rest }) {
  const ref = useRef();

  const { fieldName, registerField, error } = useField(name);
  const [value, setValue] = useState('');
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
      clearValue: maskRef => {
        maskRef.clear();
      },
    });
  },[ref.current, fieldName]); // eslint-disable-line
  const props = {
    ...rest,
    value,
  };
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <InputMask
        {...props}
        ref={ref}
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        maskChar=""
      />
      {error && <span>{error}</span>}
    </>
  );
}
InputMaskForm.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
