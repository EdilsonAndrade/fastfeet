import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'
export const Container = styled.View`
  background:#fff;
  flex:1;
`;
export const OrderDetailContainer = styled.View`
  height:18%;
  background:#7d40e7;
  align-items:center;

`;

export const OrderInfoContent = styled.View`
margin-top:84px;
border-radius:4px;
justify-content:center;
align-items:center;
`;

export const ContainerCamera = styled.View`
height:50%;
justify-content:center;
align-items:center;
`;

export const ConfirmBackground = styled.Image`
border-radius:6px;

`;

export const CircleBackCam = styled.View`
  width:61px;
  height:61px;
  background:rgba(0, 0, 0, .3);
  border-radius:30px;
  align-items:center;
  justify-content:center;
  top:-80px;
`

export const Cam = styled.Image`
  width:26px;
`
export const ButtonSend = styled(RectButton)`
  background:#7d40e7;
  top:-50px;
  align-self:stretch;
  height:45px;
  border-radius:4px;
  justify-content:center;
  align-items:center;
`

export const ButtonSendText = styled.Text`
font-weight:bold;
font-size:16px;
color:#fff;
`;
