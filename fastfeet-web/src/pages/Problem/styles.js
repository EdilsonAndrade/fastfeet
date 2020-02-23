import styled from 'styled-components';

export const Content = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  div {
    width: 65%;
    padding: 0 12px;
  }

  table {
    tbody {
      tr {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        td {
          border: none;
          button {
            text-transform: lowercase;
            border: none;
            font-size: 15px;
            color: #4d85ee;
            text-align: right;
            background: none;
          }
        }
      }
    }
  }
`;
export const AnswerModal = styled.div`
  form {
    display: flex;
    flex-direction: column;
    max-width: 350px;
    padding: 15px;

    strong {
      margin: 10px 0;
    }
    span {
      font-size: 16px;
      color: #666666;
      line-height: 26px;
    }
    > div {
      width: 100%;
      border: 1px solid #eee;
      padding: 12px 10px;
      border-radius: 4px;
    }
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        width: 100%;
      }
    }
  }
`;

export const NoDoubt = styled.div`
  margin: 20px auto;
  max-width: 350px;
  padding: 20px;
  background: linear-gradient(#ddd, #eee);
  display: flex;
  justify-content: center;
  border: 1px solid #eee;
  border-radius: 4px;
  p {
    font-weight: bold;
    font-size: 24px;
    color: #c2c2c2;
  }
`;
