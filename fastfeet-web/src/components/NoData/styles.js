import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffff;
  div {
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    strong {
      font-size: 22px;
      color: #6666;
    }
  }
`;
export default Container;
