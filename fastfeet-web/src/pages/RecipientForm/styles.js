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
  span {
    color: #de3b3b;
    width: 100%;
    text-align: left;
  }
  > div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;

    div {
      margin: 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

  > label,
  input {
    width: 100%;
  }
  > label {
    text-transform: uppercase;
  }

  label {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    display: block;
  }
  input {
    padding: 10px;
    border: 1px solid #eee;
    margin: 10px 0 10px;
  }
`;
