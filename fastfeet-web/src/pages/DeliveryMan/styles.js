import styled from 'styled-components';

export const DeliveryManTopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  strong {
    width: 100%;
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      background: #fff;
      display: flex;
      align-items: center;
      svg {
        margin-left: 15px;
        color: #ccc;
      }
    }
    input {
      width: 190px;
      height: 30px;
      font-size: 12px;
      ::placeholder {
        color: #ccc;
      }
    }
  }
`;

export const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
