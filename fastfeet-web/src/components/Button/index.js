import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck, MdAdd } from 'react-icons/md';
import ButtonContent from './styles';

export default function Button({
  handleClick,
  children,
  buttonType,
  saveButton,
  icon,
}) {
  const getIconButton = () => {
    switch (icon) {
      case 'add': {
        return <MdAdd size={22} color="#eee" />;
      }
      case 'back': {
        return <MdKeyboardArrowLeft size={22} color="#eee" />;
      }
      case 'none': {
        return '';
      }
      default: {
        return <MdCheck size={22} />;
      }
    }
  };
  return (
    <ButtonContent
      type={buttonType}
      saveButton={saveButton}
      onClick={handleClick}
    >
      {getIconButton()}
      {children}
    </ButtonContent>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.none),
    PropTypes.node,
  ]).isRequired,
  handleClick: PropTypes.func,
  buttonType: PropTypes.string.isRequired,
  saveButton: PropTypes.bool,
  icon: PropTypes.string,
};

Button.defaultProps = {
  handleClick: () => {},
  saveButton: false,
  icon: '',
};
