import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

export default function ContextMenu({
  anchorEl,
  handleClose,
  handleEdit,
  handleDelete,
  menuId,
}) {
  return (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleEdit}>
        <MdEdit size={22} color="#4d85ee" />
        Editar
      </MenuItem>

      <MenuItem onClick={handleDelete}>
        <MdDeleteForever size={22} color="#de3b3b" />
        Excluir
      </MenuItem>
    </Menu>
  );
}
