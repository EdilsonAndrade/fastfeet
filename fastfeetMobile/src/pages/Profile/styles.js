import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
export const ProfileContainer = styled.View`
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#fff;
  padding: 34.5px;

`;

export const Avatar = styled.Image`
width: 136px;
height:136px;
border-radius:68px;
`;

export const SmallContainer = styled.View`
  margin-top:20.3px;
  justify-content:flex-start;
  align-items:flex-start;
  border:1px solid #eee;
  padding:10px;
  border-radius:6px;

  `;

export const Label = styled.Text`
font-size:8px;
margin-top:15px;
`;

export const DeliveryManInfo = styled.Text`
font-size:22px;
font-weight:bold;
`;

export const LogoutButton = styled(RectButton)`
margin-top:30px;
padding:10px;
background: #E74040;
align-self:stretch;
border-radius:4px;

`;

export const LogoutText = styled.Text`
  font-weight:bold;
  color:#fff;
  text-align:center;
`
