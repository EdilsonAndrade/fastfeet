import styled from 'styled-components';

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  left: 355px;
`;
export const Modal = styled.div`
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px;
    > div {
      border-radius: 6px;
      width: 392px;
      strong {
        font-size: 22px;
      }
      span {
        font-size: 18px;
      }
    }
    img {
      padding-right: 5px;
      width: 392px;
      height: 100px;
    }

    div#order {
      span {
        text-transform: capitalize;
      }
    }

    div#retirada,
    div#entrega {
      margin-top: 5px;
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
`;
