import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
`;
export const Container = styled.div`
  max-width: 85%;
  margin: 35px auto;
  strong {
    font-size: 24px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      padding: 6px 9px;
      border-radius: 4px;
      border: none;
    }
  }
  > div {
    > div {
      display: flex;
    }
  }
  form {
    width: 82%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
      }
    }
  }
`;
