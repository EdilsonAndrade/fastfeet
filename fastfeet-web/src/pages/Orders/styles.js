import styled from 'styled-components';

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusContent = styled.div`
  width: 137px;
  height: 30px;
  background: ${props => props.status.background};
  color: ${props => props.status.color};
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
      background: ${props => props.status.color};
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
