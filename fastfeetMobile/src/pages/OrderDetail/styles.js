import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { TouchableHighlight } from 'react-native-gesture-handler';
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
margin-top: ${props => props.space ? props.space : '15px'};
padding:15px;
width:90%;
background: #fff;
border-radius:4px;

`;
export const RowDirection = styled.View`
flex-direction:row;
margin-bottom:5px;
width:100%;

margin-top: ${props => props.space ? props.space : '0'};
`;
export const TruckImage = styled.Image`
  margin-right:10px;

`;
export const DetailTextColor = styled.Text`
color: #7d40e7;
font-weight:bold;
margin-top: ${props => props.space ? props.space : '0'};

`;

export const AgendaImage = styled.Image`
  margin-right:10px;

`;
export const DetailText = styled.Text`
text-align: ${props => props.textAlign ? props.textAlign : 'left'};
color:${props => props.color ? props.color : "#666"};
font-weight: ${props => props.bold ? '700' : '100'};
margin-top: ${props => props.space ? props.space : '0'};
font-size: ${props => props.fontSize ? props.fontSize : '14px'};
`;

export const OrderDates = styled.View`
margin-top:15px;
flex-direction:row;
justify-content:space-between;
`;
export const DateInfo = styled.View`

`;

export const ButtonContent = styled(RectButton)`
align-items:center;
text-align:center;
flex:1;
margin: 1px;
background: ${props => props.backColor ? props.backColor : '#fff'};
padding:15px;
border-radius:6px;
`;

export const ProblemImage = styled.Image``;
export const SeeProblems = styled.Image``;
export const ConfirmDelivery = styled.Image``;
export const StartDelivery = styled(TouchableHighlight).attrs({
  underlayColor: '#E74040'
})`
position:relative;
width:295px;
height:40px;
background:#7d40e7;
border-radius:4px;
justify-content:center;
align-items:center;

`;
