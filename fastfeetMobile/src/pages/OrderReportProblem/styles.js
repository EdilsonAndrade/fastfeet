import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
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
margin-top: ${props=>props.space ?props.space : '15px'};
padding:15px;
width:86%;
background: #fff;
border-radius:4px;
border: 1px solid #707070;
`;

export const ProblemDescription = styled.TextInput.attrs({
  placeholderTextColor:"#999999"
})`
text-align: ${props=>props.textAlign ? props.textAlign : 'left'};
color:#666;
height:300px;
top:-120px;
border-radius:6px;



font-size: ${props=>props.fontSize ? props.fontSize: '14px'};
`;

export const Send = styled(RectButton)`
  align-self:stretch;
  margin: 10px 25px;
  padding:10px;
  border-radius:4px;
  height:45px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#7D40E7;
  align-self:stretch;
`;
export const SendText = styled.Text`
color:#fff;
font-weight:bold;
`;
