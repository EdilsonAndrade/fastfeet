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

  > label,
  select,
  input,
  div {
    width: 100%;
    > div {
      & + div {
        margin-left: 5px;
      }
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
    font-weight: bold;
  }
  input {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-top: 4px;
    margin-bottom: 12px;
  }
  span {
    text-align: left;
    color: #7d40e7;
    font-weight: bold;
    width: 100%;
  }
`;
