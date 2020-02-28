import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {format, parseISO} from 'date-fns';
import Exit from '~/assets/exit.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  OrderContainer, Header, GroupedAvatar, Avatar, ContentName, WelcomeText, DeliveryManName, ExitImage, SubHeader,
  DeliveryText, FilterContent, PendingText, DeliveredText,
  Deliveries,
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
import * as OrderActions from '~/store/modules/order/actions';
import api from '~/services/api';

export default function Order({ navigation }) {
  const deliveryMan = useSelector(state => state.auth)
  const orders = useSelector(state => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getOrders() {
      const response = await api.get(`/deliveryman/${deliveryMan.id}/orders`)
      const rows = response.data.map(d=>({
        ...d,
        formattedDate: format(parseISO(d.createdAt), 'dd/MM/yy')
      }))
      dispatch(OrderActions.loadSuccess(rows));
    }
    getOrders();
  }, [])

  return (
    <OrderContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header>
        <GroupedAvatar>
          <Avatar source={{ uri: deliveryMan.avatar.url }} ></Avatar>
          <ContentName>
            <WelcomeText>Bem vindo de volta</WelcomeText>
            <DeliveryManName>{deliveryMan.name}</DeliveryManName>
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
      <Deliveries
        data={orders}
        keyExtractor={item => Number(item.id)}
        renderItem={({item}) => (
          <DeliveryContent key={item.id}>
            <TopContent>
              <TruckImage source={Truck}></TruckImage>
              <DeliveryCountText>Encomenda {item.id}</DeliveryCountText>
            </TopContent>
            <TrackContent>
              <SmallDot active={true}>
                <SmallDotText>Aguardando Retirada</SmallDotText>
              </SmallDot>

              <SingleLine></SingleLine>
              <SmallDot active={true}>
                <SmallDotText>Retirada</SmallDotText>
              </SmallDot>
              <SingleLine>

              </SingleLine>
              <SmallDot active={false}><SmallDotText>Entregue</SmallDotText></SmallDot>
            </TrackContent>

            <LocationDateContent>
              <DateContent>
                <Label>Data</Label>
                <StrongText>{item.formattedDate}</StrongText>
              </DateContent>
              <CityContent>
                <Label>Cidade</Label>
                <StrongText>São Paulo</StrongText>
              </CityContent>
              <Details>Ver Detalhes</Details>
            </LocationDateContent>
          </DeliveryContent>
        )}
      />
    </OrderContainer>
  );
}
