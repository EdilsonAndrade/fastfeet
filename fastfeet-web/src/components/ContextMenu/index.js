import React from 'react';
import { MdEdit, MdDeleteForever, MdRemoveRedEye } from 'react-icons/md';
import { Menu, ItemMenu } from './styles';

export default function ContextMenu({
  order,
  id,
  handleEdit,
  handleDelete,
  handleView,
  visible,
  problem,
  larger,
}) {
  const getItemsMenu = () => {
    if (problem) {
      return (
        <>
          <ItemMenu onClick={handleView} id="1">
            <div>
              <MdRemoveRedEye
                size={22}
                color="#4d85ee"
                style={{ marginRight: 10 }}
              />
              <strong>Visualizar</strong>
            </div>
          </ItemMenu>

          <ItemMenu onClick={handleDelete}>
            <div>
              <MdDeleteForever
                size={22}
                color="#de3b3b"
                style={{ marginRight: 10 }}
              />
              <strong>Excluir encomenda</strong>
            </div>
          </ItemMenu>
        </>
      );
    }

    if (order) {
      return (
        <>
          <ItemMenu onClick={handleView} id="2">
            <div>
              <MdRemoveRedEye
                size={22}
                color="#4d85ee"
                style={{ marginRight: 10 }}
              />
              <strong>Visualizar</strong>
            </div>
          </ItemMenu>

          <ItemMenu onClick={handleEdit}>
            <div>
              <MdEdit size={22} color="#4d85ee" style={{ marginRight: 10 }} />
              <strong>Editar</strong>
            </div>
          </ItemMenu>
        </>
      );
    }
    return (
      <>
        <ItemMenu onClick={handleEdit}>
          <div>
            <MdEdit size={22} color="#4d85ee" />
            <strong>Editar</strong>
          </div>
        </ItemMenu>
        <ItemMenu onClick={handleDelete}>
          <div>
            <MdDeleteForever
              size={22}
              color="#de3b3b"
              style={{ marginRight: 10 }}
            />
            <strong>Excluir</strong>
          </div>
        </ItemMenu>
      </>
    );
  };
  return (
    <Menu id={id} larger={larger} visible={visible}>
      {getItemsMenu()}
    </Menu>
  );
}
