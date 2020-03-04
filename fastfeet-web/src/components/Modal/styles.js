import styled from 'styled-components';

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  left: 355px;
  margin: 0 31px;
`;
export const Modal = styled.div`
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    hr {
      background: #eee;
      margin: 10px 0;
    }
    > div {
      border-radius: 6px;
      width: 392px;
      strong {
        font-size: 16px;
      }
      span {
        font-size: 16px;
        color: #444;
        text-transform: capitalize;
      }
    }
    img {
      padding-right: 5px;
      max-width: 392px;
    }

    div#datas {
      margin-top: 6px;
      padding: 0;
    }

    div#retirada,
    div#entrega {
      margin-top: 5px;
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      strong {
        margin-right: 5px;
      }
    }
  }
`;
