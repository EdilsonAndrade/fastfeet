import styled from 'styled-components';
import { darken } from 'polished';

export const Menu = styled.div`
  position: absolute;
  width: ${props => (props.larger ? '200px' : '150px')};
  transform: translateX(-35%);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  padding: 15px 5px;
  display: ${props => (props.visible === props.id ? 'block' : 'none')};
  z-index: 2;
  &::before {
    content: '';
    top: -20px;
    position: absolute;
    width: 0;
    height: 0;
    left: calc(50% - 20px);
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(255, 255, 255, 0.9);
  }
`;
export const ItemMenu = styled.div`
  color: #666;
  font-weight: bold;
  padding: 10px;
  background: #fff;
  &:hover {
    background: ${darken(0.1, '#fff')};
  }
  div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 5px;
  }
  svg {
    margin-right: 10px;
  }
  strong {
    font-size: 14px;
  }
`;
