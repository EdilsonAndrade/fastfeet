import styled from 'styled-components/native';
import {FlatList} from 'react-native';
export const OrderContainer = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  background:#fff;


`;

export const Header = styled.View `
  margin-top: 40px;
  padding:0 20px;
  flex-direction:row;
  align-items:center;
  width:100%;
  justify-content:space-between;
  background:#fff;

`;
export const GroupedAvatar = styled.View`
   flex-direction:row;
  align-items:center;
  justify-content:center;
  background:#fff;
`;
export const Avatar = styled.Image`
  width:80px;
  height:80px;
  border-radius:40px;
  background:#7159c1;
  margin-right:10px;

`;
export const ContentName = styled.View`
`;
export const WelcomeText = styled.Text`
font-size:12px;
`;
export const DeliveryManName = styled.Text`
font-size:22px;
font-weight:bold;
`;
export const ExitImage = styled.Image``;

export const SubHeader = styled.View`
  flex-direction:row;
  justify-content:space-between;
  width:100%;
  padding:20px;
`;
export const DeliveryText = styled.Text`
font-size:22px;
font-weight:bold;
`;
export const FilterContent = styled.View`
 flex-direction:row;
  padding:0;
  height:20px;
`;
export const PendingText = styled.Text`
  margin-right:15px;
  color: ${props=>props.active ? '#7159c1' : '#999'};
  font-weight:bold;
  border-bottom-color: ${props=>props.active ? '#7159c1' : '#fff'};
  border-bottom-width: ${props=>props.active ? '2px' : '0'};
  padding:0;
`;
export const DeliveredText = styled.Text``;

export const Deliveries = styled(FlatList).attrs({
})`
width:100%;
padding:20px;

`;
export const DeliveryContent = styled.View`
padding:2px;
align-items:center;
border:1px solid #eee;
border-radius:6px;
margin-bottom:15px;

`;
export const TopContent = styled.View`
  flex-direction:row;
  align-items:center;
  width:100%;
  padding:5px;
`;


export const TruckImage = styled.Image`
  margin-right:10px;

`;
export const DeliveryCountText = styled.Text`
  color:#7159c1;
  font-size:14px;
  font-weight:bold;


`;
export const TrackContent = styled.View`
  flex-direction:row;
  align-items:center;

  justify-content:space-between;
  margin-top:38px;
  width:80%;
  border:1px solid #7159c1;


`;
export const SmallDotContent = styled.View`
  align-items:center;


`;
export const SmallDot = styled.View`
  background: ${props=>props.active ? '#7159c1' : '#fff'};
  border:2px solid #7159c1;
  width:10px;
  height:10px;
  border-radius: 5px;
  margin:-5px;

`;
export const SingleLine = styled.View``;
export const SmallDotText = styled.Text`
  text-align:center;
  font-size:8px;
  padding-top:10px;
  position:relative;
  width:60px;
  left:-28px;

`;

export const LocationDateContent = styled.View`
background: #f8f9fd;
width:100%;
margin-top:50px;
flex-direction:row;
padding: 10px;
justify-content:space-between;
align-items:flex-start;
border-radius:4px;
`;
export const DateContent = styled.View``;
export const Label = styled.Text`
font-size:8px;
`;
export const StrongText = styled.Text`
font-size:12px;
font-weight:bold;
`;


export const CityContent = styled.View``;
export const Details = styled.Text`
  margin-top:10px;
  color: #7159c1;
  font-weight:bold;
`;
