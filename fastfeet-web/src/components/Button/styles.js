import styled from 'styled-components';

const ButtonContent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  color: #fff;
  background: ${props => (props.saveButton === true ? '#7d40e7' : '#C2C2C2')};
  width: 142px;
  height: 36px;
  border: none;
  padding: 8px;
  margin: 10px;
  border-radius: 4px;
  font-weight: bold;
  svg {
    margin-right: 13px;
  }
`;
export default ButtonContent;
