import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  Container,
  OrderDetailContainer,
  OrderInfoContent,
  RowDirection,
  TruckImage,
  AgendaImage,
  DetailTextColor,
  DetailText,
  OrderDates,
  DateInfo,
  ButtonContent,
  ProblemImage,
  SeeProblems,
  ConfirmDelivery
} from './styles';
import Truck from '~/assets/truck.png';
import Agenda from '~/assets/agenda.png';
import ReportProblem from '~/assets/reportproblem.png';
import SeeProblemsImg from '~/assets/seeproblems.png';
import ConfirmDeliveryImg from '~/assets/confirmedelivery.png';

export default function OrderDetail({ navigation }) {
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('--/--/--')
  const [endDate, setEndDate] = useState('--/--/--')

  const order = useSelector(state => state.order);

  useEffect(() => {
    if (order.canceledAt) {
      setStatus("Cancelada")
      setStartDate(format(parseISO(order.startDate), 'dd/MM/yy'))
    } else if (order.endDate) {
      setEndDate(format(parseISO(order.endDate), 'dd/MM/yy'))
      setStartDate(format(parseISO(order.startDate), 'dd/MM/yy'))
      setStatus("Entregue")
    } else {
      setStatus("Pendente");
      if (order.startDate) {
        setStartDate(format(parseISO(order.startDate), 'dd/MM/yy'))
      }
    }

  }, [])

  const handleDelivered = () => {
    navigation.navigate('ConfirmDelivery')
  }

  const handleListProblems = () => {
    navigation.navigate('ListProblem')
  }
  const handleSendAProblem = () => {
    navigation.navigate('OrderReportProblem')
  }
  return (
    <Container>
      <OrderDetailContainer>

        <OrderInfoContent>
          <RowDirection>
            <TruckImage source={Truck}></TruckImage>

            <DetailTextColor>Informações da encomenda</DetailTextColor>
          </RowDirection>
          <DetailText>DESTINATARIO</DetailText>
          <DetailText>{order.recipient.name}</DetailText>
          <DetailText space="6px">ENDEREÇO DE ENTREGA</DetailText>
          <DetailText>{`${order.recipient.addressLine} nº ${order.recipient.number} ${order.recipient.addressLineTwo} - ${order.recipient.city} ${order.recipient.state} ${order.recipient.zipCode}`}</DetailText>
          <DetailText space="6px">PRODUTO</DetailText>
          <DetailText>{order.product}</DetailText>

        </OrderInfoContent>
        <OrderInfoContent space="10px">
          <RowDirection>
            <AgendaImage source={Agenda}></AgendaImage>
            <DetailTextColor>Situação de entregha</DetailTextColor>
          </RowDirection>
          <DetailText>STATUS</DetailText>
          <DetailText>{status}</DetailText>
          <OrderDates>
            <DateInfo>
              <DetailText>DATA DE RETIRADA</DetailText>
              <DetailText>{startDate}</DetailText>
            </DateInfo>
            <DateInfo>
              <DetailText>DATA DE ENTREGA</DetailText>
              <DetailText>{endDate}</DetailText>
            </DateInfo>

          </OrderDates>
        </OrderInfoContent>
        <OrderInfoContent space="10px">
          <RowDirection>
            <ButtonContent backColor="#eee" title="Reportar problema" onPress={handleSendAProblem}>


              <ProblemImage source={ReportProblem}></ProblemImage>

              <DetailText fontSize="12px" textAlign="center">Informar Problema</DetailText>

            </ButtonContent>
            <ButtonContent backColor="#eee"  title="See Problems" onPress={handleListProblems}>
              <SeeProblems source={SeeProblemsImg}></SeeProblems>
              <DetailText fontSize="12px" textAlign="center">Visualizar Problemas</DetailText>
            </ButtonContent>
            <ButtonContent backColor="#eee" title="Cofirm Delivery" onPress={handleDelivered}>
              <ConfirmDelivery source={ConfirmDeliveryImg}></ConfirmDelivery>
              <DetailText fontSize="12px" textAlign="center">Confirmar Entrega</DetailText>
            </ButtonContent>
          </RowDirection>
        </OrderInfoContent>
      </OrderDetailContainer>
    </Container>
  );
}
