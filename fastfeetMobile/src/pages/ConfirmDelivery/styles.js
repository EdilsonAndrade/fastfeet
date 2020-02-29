import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
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
width:90%;
background: #fff;
border-radius:4px;

`;

export const DetailText = styled.Text`
text-align: ${props=>props.textAlign ? props.textAlign : 'left'};
color:#666;
margin-top: ${props=>props.space ?props.space : '0'};
font-size: ${props=>props.fontSize ? props.fontSize: '14px'};
`;
