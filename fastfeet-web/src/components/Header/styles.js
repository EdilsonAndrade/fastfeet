import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #ffff;
`;
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  line-height: 50px;
  border: 1px solid #eee;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      img {
        padding: 0 18px;
      }
      &::after {
        content: '';
        height: 32px;
        width: 1px;
        background: #ddd;
      }
    }
    a {
      margin-left: 20px;
      font-weight: bold;
    }
  }

  aside {
    padding: 0;
    line-height: 19px;
    display: flex;
    flex-direction: column;
    button {
      color: #de3b3b;
      border: none;
      background: none;
    }
  }
`;

export const HeaderLogo = styled.img`
  max-width: 220px;
`;
