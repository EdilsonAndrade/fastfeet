import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import AsyncSelect from 'react-select/async';

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;
export const Spinner = styled(FaSpinner)`
  animation: ${rotate} 2s linear infinite;
`;
export const Content = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 0;
  label {
    font-weight: bold;
    text-transform: uppercase;
  }
  > span {
    display: flex;

    > span {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 10px;
      margin-bottom: 10px;
      > div {
        height: 45px;
        > div {
          height: 45px;
        }
      }
    }
  }

  div#productDiv {
    margin-left: 7%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    input {
      width: 94%;
      padding: 10px;
      border: solid 1px #ccc;
      border-radius: 5px;
      height: 45px;
    }
  }
`;

export const AsyncSelectRecipient = styled(AsyncSelect)`
  width: 691px;
`;
