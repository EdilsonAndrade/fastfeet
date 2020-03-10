import React from 'react';
import PropTypes from 'prop-types';
import Grid from '~/components/Grid';
import { StatusContent, DeliveryAvatar } from '../styles';
import ContextMenu from '~/components/ContextMenu';

export default function OrdersTable({
  data,
  orderVisible,
  handleDelete,
  handleEdit,
  handleView,
  handleClick,
}) {
  return (
    <Grid>
      <thead>
        <tr>
          <th>ID</th>
          <th>Destinatário</th>
          <th>Foto</th>
          <th>Entregador</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(order => (
          <tr key={order.id}>
            <td style={{ width: 50 }}>{order.id}</td>
            <td style={{ width: 320 }}>{order.Recipient.name}</td>
            <td>
              <DeliveryAvatar>
                {order.DeliveryMan.avatar ? (
                  <img src={order.DeliveryMan.avatar.url} alt="avatar" />
                ) : (
                  <img
                    src={`https://avatar.oxro.io/avatar?name=${order.DeliveryMan.name}`}
                    alt="avatar"
                  />
                )}
              </DeliveryAvatar>
            </td>
            <td style={{ width: 420 }}>{order.DeliveryMan.name}</td>
            <td>{order.Recipient.city}</td>
            <td>{order.Recipient.state}</td>
            <td>
              <StatusContent id="status" status={order.formattedStatus}>
                <span>
                  {order && order.formattedStatus
                    ? order.formattedStatus.text
                    : ''}
                </span>
              </StatusContent>
            </td>
            <td style={{ width: 120 }}>
              {order.canceledAt ? null : (
                <button
                  onClick={() => handleClick(order, order.id)}
                  type="button"
                >
                  <ul>
                    <li>.</li>
                    <li>.</li>
                    <li>.</li>
                  </ul>
                  <ContextMenu
                    id={order.id}
                    canCancel={!order.endDate}
                    order={order && order.endDate}
                    visible={orderVisible}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleView={() => handleView(order.File && order.File.url)}
                    menuId="contextMenu"
                  />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Grid>
  );
}

OrdersTable.propTypes = {
  data: PropTypes.array,
  orderVisible: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleView: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

OrdersTable.defaultProps = {
  data: [],
};
