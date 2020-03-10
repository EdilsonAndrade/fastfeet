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
  > span#grid {
    width: 94%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 6px;
    margin-left: 9px;
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
  span.error {
    color: #de3b3b;
    width: 100%;
    text-align: left;
  }
`;

export const AsyncSelectField = styled(AsyncSelect)``;
