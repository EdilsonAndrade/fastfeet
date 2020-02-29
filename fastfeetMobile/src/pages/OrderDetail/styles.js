import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
export const OrderDetailContainer = styled.View`
  height:18%;
  background:#7159c1;
  align-items:center;

`;

export const OrderInfoContent = styled.View`
margin-top: ${props=>props.space ?props.space : '15px'};
padding:15px;
width:90%;
background: #fff;
border-radius:4px;
background: ${props=>props.backColor ? props.backColor : '#fff'};
`;
export const RowDirection = styled.View`
flex-direction:row;
margin-bottom:5px;
margin-top: ${props=>props.space ?props.space : '0'};
`;
export const TruckImage = styled.Image`
  margin-right:10px;

`;
export const DetailTextColor = styled.Text`
color: #7159c1;
font-weight:bold;
margin-top: ${props=>props.space ?props.space : '0'};

`;

export const AgendaImage = styled.Image`
  margin-right:10px;

`;
export const DetailText = styled.Text`
text-align: ${props=>props.textAlign ? props.textAlign : 'left'};
color:#666;
margin-top: ${props=>props.space ?props.space : '0'};
font-size: ${props=>props.fontSize ? props.fontSize: '14px'};
`;

export const OrderDates = styled.View`
margin-top:15px;
flex-direction:row;
justify-content:space-between;
`;
export const DateInfo = styled.View`

`;

export const ButtonContent = styled.View`
align-items:center;
text-align:center;
flex:1;
margin-left:${props=>props.marginLeft ? props.marginLeft : '0' };
`;

export const ProblemImage = styled.Image``;
export const SeeProblems = styled.Image``;
export const ConfirmDelivery = styled.Image``;