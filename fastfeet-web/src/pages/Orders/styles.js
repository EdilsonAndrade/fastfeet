import styled from 'styled-components';

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  strong {
    width: 100%;
  }
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
`;
export const ContainerButtonSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusContent = styled.div`
  width: 137px;
  height: 30px;
  background: ${props => (props.status ? props.status.background : '#fff')};
  color: ${props => (props.status ? props.status.color : '#fff')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  position: relative;

  span {
    :before {
      position: absolute;
      content: '';
      height: 15px;
      width: 15px;
      background: ${props => (props.status ? props.status.color : '#fff')};
      left: 9px;
      top: 8px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
`;
export const DeliveryAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  img {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
`;
