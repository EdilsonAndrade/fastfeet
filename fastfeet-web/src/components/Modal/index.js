import React from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';
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
        <MdClear size={22} color="#7D40E7" />
      </CloseButton>

      <Modal>
        <div>
          {text ? (
            <div>
              <strong>Visualizar Problema</strong>
              <hr />
              <span>{text}</span>
            </div>
          ) : (
            <div id="order">
              <strong>Informações da encomenda</strong>
              <span>{` ${recipient.addressLine}, ${recipient.number}`}</span>
              <span>{` ${recipient.city} - ${recipient.state}`}</span>
              <span>{recipient.zipCode}</span>
              <hr />
              <div id="datas">
                <strong>Datas</strong>
                <div id="retirada">
                  <strong>Retirada:</strong>
                  <span>{order.formatedStartDate}</span>
                </div>
                <div id="entrega">
                  <strong>Retirada:</strong>
                  <span>{order.formatedEndDate}</span>
                </div>
              </div>
              <hr />
              <strong>Assinatura do cliente</strong>
              {imageUrl ? (
                <img src={imageUrl} alt="signature" />
              ) : (
                <small>Não existe assinatura</small>
              )}
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
    formatedStartDate: PropTypes.string,
    formatedEndDate: PropTypes.string,
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
    formatedStartDate: '',
    formatedEndDate: '',
  },
  recipient: {
    addressLine: '',
    number: '',
    zipCode: '',
    city: '',
    state: '',
  },
};
