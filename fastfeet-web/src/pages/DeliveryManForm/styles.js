import styled, { keyframes } from 'styled-components';

import { FaSpinner } from 'react-icons/fa';

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
  display: flex;
  flex-direction: column;
  background: #fff;
  justify-content: flex-start;
  padding: 20px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div {
      label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ccc;
        font-size: 9px;
      }
    }
  }
  > label,
  input {
    width: 100%;
  }
  > label {
    text-transform: uppercase;
  }
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    div {
      width: 25%;
      margin-right: 5px;
    }
  }
  select {
    flex: 1;
    padding: 10px;
    border: 1px solid #eee;
    background: #fff;
  }
  label,
  strong {
    font-size: 18px;
    margin-top: 15px;
    font-weight: bold;
    text-transform: uppercase;
  }
  input {
    padding: 10px;
    border: 1px solid #eee;
  }
  > div {
    display: flex;
    align-items: center;
    label {
      position: block;
    }
    > div {
      display: flex;
      flex-direction: column;
    }
  }

  span {
    text-align: left;
    color: #7d40e7;
    font-weight: bold;
    width: 100%;
  }
`;
