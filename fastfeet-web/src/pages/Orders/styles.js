import styled from 'styled-components';

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusContent = styled.div`
  width: 130px;
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
      margin-right: 5px;
    }
  }
`;
