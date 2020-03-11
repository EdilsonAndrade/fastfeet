import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }

  to{
    transform: rotate(360deg)
  }
`;
const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffff;
  ${props =>
    props.loading &&
    css`
      svg {
        margin: 0 auto;
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
export default Container;
