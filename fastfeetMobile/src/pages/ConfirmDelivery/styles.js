import styled from 'styled-components/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'

import { RNCamera } from 'react-native-camera';
export const Container = styled.View`
  background:#fff;
  flex:1;
`;
export const TopContainer = styled.View`
  height:18%;
  background:#7d40e7;
  align-items:center;

`;

export const ConfirmDeliveryContainer= styled.View`

border-radius:4px;
justify-content:center;
align-items:center;
border:1px solid #7159c1;
`;


export const ContainerPicture = styled(RectButton)`
width:96%;
height:98%;
justify-content:flex-end;
align-items:center;
top:-100px;
border:1px solid blue;
`;
export const PictureContainer = styled.View`
width:90%;
height:100%;

`;
export const ButtonSend = styled(RectButton)`
  background:#7d40e7;
  top:8px;
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
export const ButtonNewPicture = styled(RectButton)`
  width:61px;
  height:61px;
  background:rgba(255, 255, 255, .2);
   border-radius:30px;
  align-items:center;
  justify-content:center;
  top:-5px;



`
export const Picture = styled.ImageBackground`
width:100%;
height:100%;
justify-content:flex-end;
align-items:center;
`;


export const CameraContainer = styled(RNCamera)`
width:100%;
height:100%;
justify-content:flex-end;
align-items:center;
top:-130px;
`;

export const ButtonShot = styled(TouchableOpacity)`
  width:61px;
  height:61px;
  background:rgba(0, 0, 0, .3);
  border-radius:30px;
  align-items:center;
  justify-content:center;
  top:-20px;
`

export const Cam = styled.Image`
  width:26px;
`







