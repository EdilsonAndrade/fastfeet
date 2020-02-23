import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;
export const Content = styled.table`
  width: 95%;
  padding: 12px;
  border-spacing: 0;
  thead {
    tr {
      text-align: left;
    }
  }
  tr {
    :hover {
      background: #eeee;
      cursor: pointer;
    }
    color: #666666;
    td {
      margin: 0;
      padding: 10px 5px;
      border-bottom: 1px solid #979797;
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
`;
