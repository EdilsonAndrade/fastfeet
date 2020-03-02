import styled from 'styled-components/native';
import {FlatList} from 'react-native';
export const Container = styled.View`
  background:#fff;
  flex:1;
`;
export const OrderDetailContainer = styled.View`
  height:18%;
  background:#7d40e7;
  align-items:center;


`;
export const ContainerText = styled.Text`
color:#fff;
font-weight:bold;
font-size:18px;
`;
export const ProblemsContainer = styled.View`
margin-top: ${props=>props.space ?props.space : '15px'};
top:-13%;
width:100%;
border-radius:4px;

`;

export const Problems = styled(FlatList).attrs({
})`
width:100%;
padding:20px;
height:480px;
`;

export const ProblemContent = styled.View`
  flex-direction:row;
  justify-content:space-between;
  margin-bottom:15px;
  border: 1px solid #eee;
  height:50px;
  border-radius:4px;
  align-items:center;
  padding:15px;
  background:#fff;


`;
export const DetailText = styled.Text.attrs({

})`
width:75%;
text-align: ${props=>props.textAlign ? props.textAlign : 'left'};
color:#ccc;
font-weight:bold;
margin-top: ${props=>props.space ?props.space : '0'};
font-size: ${props=>props.fontSize ? props.fontSize: '14px'};
`;

export const DateText = styled.Text.attrs({
})`
width:23%;
text-align: ${props=>props.textAlign ? props.textAlign : 'left'};
color:#ccc;
font-weight:bold;
margin-top: ${props=>props.space ?props.space : '0'};
font-size: ${props=>props.fontSize ? props.fontSize: '14px'};
`;

