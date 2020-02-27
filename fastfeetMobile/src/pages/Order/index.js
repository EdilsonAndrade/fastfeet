import React from 'react';
import { useSelector } from 'react-redux';
import Exit from '~/assets/exit.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  OrderContainer, Header, GroupedAvatar, Avatar, ContentName, WelcomeText, DeliveryManName, ExitImage, SubHeader,
  DeliveryText, FilterContent, PendingText, DeliveredText,
  DeliveriesContainer,
  DeliveryContent,
  TopContent,
  TruckImage,
  DeliveryCountText,
  TrackContent,
  SmallDotContent,
  SmallDot,
  SmallDotText,
  SingleLine,
  LocationDateContent,
  DateContent,
  CityContent,
  Details,
  Label,
  StrongText


} from './styles';

import Truck from '~/assets/truck.png';

export default function Order({ navigation }) {
  const deliveryMan = useSelector(state => state.auth)
  console.tron.warn(`delivery man = ${JSON.stringify(deliveryMan.avatar.url)})}`)
  return (
    <OrderContainer>
      <Header>
        <GroupedAvatar>
          <Avatar source={{ uri: deliveryMan.avatar.url }} ></Avatar>
          <ContentName>
            <WelcomeText>Bem vindo de volta</WelcomeText>
            <DeliveryManName>Douglas Telles</DeliveryManName>
          </ContentName>
        </GroupedAvatar>
        <ExitImage source={Exit}></ExitImage>
      </Header>
      <SubHeader>
        <DeliveryText>Entregas</DeliveryText>
        <FilterContent>
          <TouchableOpacity>
            <PendingText active={true}>Pendentes</PendingText>
          </TouchableOpacity>
          <TouchableOpacity>
            <DeliveredText>Entregues</DeliveredText>
          </TouchableOpacity>

        </FilterContent>
      </SubHeader>
      <DeliveriesContainer>
        <DeliveryContent>
          <TopContent>
            <TruckImage source={Truck}></TruckImage>
            <DeliveryCountText>Encomenda 01</DeliveryCountText>
          </TopContent>
          <TrackContent>
              <SmallDot  active={true}>
              <SmallDotText>Aguardando Retirada</SmallDotText>
              </SmallDot>

            <SingleLine></SingleLine>
              <SmallDot  active={true}>
              <SmallDotText>Retirada</SmallDotText>
              </SmallDot>
            <SingleLine>
            
            </SingleLine>
              <SmallDot active={false}><SmallDotText>Entregue</SmallDotText></SmallDot>
          </TrackContent>
         
          <LocationDateContent>
            <DateContent>
              <Label>Data</Label>
              <StrongText>11/01/2020</StrongText>
            </DateContent>
            <CityContent>
              <Label>Cidade</Label>
              <StrongText>São Paulo</StrongText>
            </CityContent>
            <Details>Ver Detalhes</Details>
          </LocationDateContent>

        </DeliveryContent>
        <DeliveryContent>
          <TopContent>
            <TruckImage source={Truck}></TruckImage>
            <DeliveryCountText>Encomenda 01</DeliveryCountText>
          </TopContent>
          <TrackContent>
              <SmallDot  active={true}>
              <SmallDotText>Aguardando Retirada</SmallDotText>
              </SmallDot>

            <SingleLine></SingleLine>
              <SmallDot  active={false}>
              <SmallDotText>Retirada</SmallDotText>
              </SmallDot>
            <SingleLine>
            
            </SingleLine>
              <SmallDot active={false}><SmallDotText>Entregue</SmallDotText></SmallDot>
          </TrackContent>
         
          <LocationDateContent>
            <DateContent>
              <Label>Data</Label>
              <StrongText>11/01/2020</StrongText>
            </DateContent>
            <CityContent>
              <Label>Cidade</Label>
              <StrongText>Rio do Sul</StrongText>
            </CityContent>
            <Details>Ver Detalhes</Details>
          </LocationDateContent>

        </DeliveryContent>
      </DeliveriesContainer>
    </OrderContainer>
  );
}
