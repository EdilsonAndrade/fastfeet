import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  min-height: 230px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;
export const Content = styled.table`
  width: 95%;
  padding: 12px;
  border-spacing: 0;
  background-color: #f5f5f5;
  border-collapse: separate;
  border-spacing: 0 21px;
  thead {
    tr {
      text-align: left;
    }
  }
  tbody {
    tr {
      line-height: 50px;

      background: #fff;
      :hover {
        background: #f5f5f5;
        cursor: pointer;
      }
      td {
        color: ${props => (props.color ? props.color : '#666666')};
        margin: 32px 15px;
        padding: 10px 15px;
        border-bottom: 1px solid #979797;
        span {
        }
        button {
          border: none;
          background: none;
          border-radius: 50%;
          height: 42px;
          width: 48px;
          ul {
            position: relative;
            top: -8px;
            display: flex;
            align-items: center;
            justify-content: center;
            li {
              font-weight: bold;
              font-size: 36px;
              color: #707070;
            }
          }
          :hover {
            background: #ccc;
          }
        }
      }
    }
  }
`;
