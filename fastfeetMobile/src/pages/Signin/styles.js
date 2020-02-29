import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'
export const SigningView = styled.View`
  flex:1;
  background:#7D40E7;
  display:flex;
  justify-content:center;
  align-items:center;

`;

export const Logo = styled.Image`


`;

export const IdInput = styled.TextInput`
  background:#fff;
  align-self:stretch;
  padding:10px;
  margin: 40px 25px 12.5px;
  border-radius:4px;
  height:45px;
`;

export const LoginButon = styled(RectButton)`
  align-self:stretch;
  padding:10px;
  margin: 0 25px;
  border-radius:4px;
  height:45px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#82bf18;
`;

export const LoginTextButton = styled.Text`
color:white;
`;
