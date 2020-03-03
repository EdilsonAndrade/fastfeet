import React, { useEffect, useState, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, ActivityIndicator, View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
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
import { signoutRequest } from '~/store/modules/auth/actions'
import api from '~/services/api';

export default function Order({ navigation }) {
  const deliveryMan = useSelector(state => state.auth)
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('AWAITING');
  const isFocused = useIsFocused();

  const handleLogout = () => {
    dispatch(signoutRequest())
  }
  async function getOrders() {
    setLoading(true);
    let response = null;
    if (filter === 'DELIVERED') {
      response = await api.get(`/deliveryman/${deliveryMan.id}/orders?limit=3&page=${page}&done=true`)

    } else {
      response = await api.get(`/deliveryman/${deliveryMan.id}/orders?limit=3&page=${page}`)
    }
    const rows = response.data.rows.map(d => ({
      ...d,
      formattedDate: format(parseISO(d.createdAt), 'dd/MM/yy')
    }))

    setOrders([...orders, ...rows])
    setPage(page + 1);

    setLoading(false);
  }
  useEffect(() => {

    getOrders();
  }, [])

  useEffect(() => {
    getOrders();
  }, [filter]);

  useEffect(() => {
    if(isFocused){
      getOrders();
    }else{
      setPage(1);
      setOrders([]);
    }

  }, [isFocused])

  const handleGetDelivered = () => {
    setOrders([])
    setFilter('DELIVERED')
    setPage(1);
  }

  const handleGetOrders = () => {
    setOrders([]);
    setFilter('AWAITING')
    setPage(1);
  }

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View >
        <ActivityIndicator />
      </View>
    );
  }

  const handleShowOrderDetail = (orderSelect) => {
    console.tron.warn(`order selecionada = ${JSON.stringify(orderSelect)}`)
    dispatch(OrderActions.selectOrder(orderSelect))
    navigation.navigate('OrderDetail');
  }
  const renderList = (item) => {
    return (
      <DeliveryContent key={item.id}>
        <TopContent>
          <TruckImage source={Truck}></TruckImage>
          <DeliveryCountText>Encomenda {item.id}</DeliveryCountText>
        </TopContent>
        <TrackContent>
          <SmallDot active={item.createdAt && !item.startDate}>
            <SmallDotText>Aguardando Retirada</SmallDotText>
          </SmallDot>

          <SingleLine></SingleLine>
          <SmallDot active={item.startDate}>
            <SmallDotText>Retirada</SmallDotText>
          </SmallDot>
          <SingleLine>

          </SingleLine>
          <SmallDot active={item.endDate}><SmallDotText>Entregue</SmallDotText></SmallDot>
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
          <TouchableOpacity onPress={() => handleShowOrderDetail(item)}>
            <Details>Ver Detalhes</Details>
          </TouchableOpacity>
        </LocationDateContent>
      </DeliveryContent>
    )
  }
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
        <TouchableOpacity onPress={handleLogout}>
          <ExitImage source={Exit}></ExitImage>
        </TouchableOpacity>
      </Header>
      <SubHeader>
        <DeliveryText>Entregas</DeliveryText>
        <FilterContent>
          <TouchableOpacity onPress={handleGetOrders}>
            <PendingText active={filter === 'AWAITING'}>Pendentes</PendingText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGetDelivered}>
            <PendingText active={filter === 'DELIVERED'}>Entregues</PendingText>
          </TouchableOpacity>

        </FilterContent>
      </SubHeader>
      <Deliveries
        onEndReached={()=>getOrders}
        onEndReachedThreshold={0.2}
        data={orders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => renderList(item)}
        ListFooterComponent={renderFooter}
      />
    </OrderContainer>
  );
}
