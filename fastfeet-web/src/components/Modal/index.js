import React from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MdHighlightOff } from 'react-icons/md';
import { CloseButton, Modal } from './styles';

export default function ModalDialog({
  open,
  handleClose,
  imageUrl,
  text,
  order,
  recipient,
}) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <CloseButton type="button" id="closeme" onClick={handleClose}>
        <MdHighlightOff size={42} color="#7159c1" />
      </CloseButton>
      <Modal>
        <div>
          {text ? (
            <div>
              <strong>Visualizar Problema</strong>
              <span>{text}</span>
            </div>
          ) : (
            <div id="order">
              <strong>Informações da encomenda</strong>
              <span>{` ${recipient.addressLine}, ${recipient.number}`}</span>
              <span>{` ${recipient.city} - ${recipient.state}`}</span>
              <span>{recipient.zipCode}</span>
              <strong>Datas</strong>
              <div id="retirada">
                <strong>Retirada:</strong>
                <span>{order.startDate}</span>
              </div>
              <div id="entrega">
                <strong>Retirada:</strong>
                <span>{order.endDate}</span>
              </div>

              <img src={imageUrl} alt="signature" />
            </div>
          )}
        </div>
      </Modal>
    </Dialog>
  );
}
ModalDialog.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  order: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  recipient: PropTypes.shape({
    addressLine: PropTypes.string,
    city: PropTypes.string,
    number: PropTypes.string,
    zipCode: PropTypes.string,
    state: PropTypes.string,
  }),
};

ModalDialog.defaultProps = {
  handleClose: () => {},
  text: '',
  imageUrl: '',
  open: false,
  order: {
    startDate: '',
    endDate: '',
  },
  recipient: {
    addressLine: '',
    number: '',
    zipCode: '',
    city: '',
    state: '',
  },
};
