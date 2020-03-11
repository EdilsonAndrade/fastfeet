import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
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
  ConfirmDelivery,
  StartDelivery
} from './styles';
import Truck from '~/assets/truck.png';
import Agenda from '~/assets/agenda.png';
import ReportProblem from '~/assets/reportproblem.png';
import SeeProblemsImg from '~/assets/seeproblems.png';
import ConfirmDeliveryImg from '~/assets/confirmedelivery.png';
import api from '~/services/api';
import * as OrderActions from '~/store/modules/order/actions';

export default function OrderDetail({ navigation }) {
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('--/--/--')
  const [endDate, setEndDate] = useState('--/--/--')
  const [loading, setLoading] = useState(false);
  const order = useSelector(state => state.order);
  const deliveryMan = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (order.canceledAt) {
      setStatus("Cancelada")
      setStartDate(format(parseISO(order.startDate), 'dd/MM/yy HH:mm:ss'))
    } else if (order.endDate) {
      setEndDate(format(parseISO(order.endDate), 'dd/MM/yy HH:mm:ss'))
      setStartDate(format(parseISO(order.startDate), 'dd/MM/yy HH:mm:ss'))
      setStatus("Entregue")
    } else {
      setStatus("Pendente");
      if (order.startDate) {
        setStartDate(format(parseISO(order.startDate), 'dd/MM/yy HH:mm:ss'))
      }
    }

  }, [order])

  const handleDelivered = () => {
    navigation.navigate('ConfirmDelivery', { order: order })
  }

  const handleListProblems = () => {
    navigation.navigate('ListProblem', { orderId: order.id })
  }
  const handleSendAProblem = () => {
    navigation.navigate('OrderReportProblem', { orderId: order.id })
  }
  const handleStartDelivery = () => {
    Alert.alert("Iniciar entrega", 'Tem certeza que deseja iniciar esta entrega?', [
      {
        text: 'Sim', onPress: async () => {
          try {
            const response = await api.put(`/deliveryman/${deliveryMan.id}/deliverymanagements/${order.id}`, {
              startDate: new Date()
            });

            dispatch(OrderActions.selectOrder(response.data));

          } catch ({ response }) {
            const {error} = response.data;
            if(error.includes("close")){
              Alert.alert("Erro", `Estamos fechados para retirada`);
            }else{
              Alert.alert("Erro", `${JSON.stringify(response.data.error)} `);
            }

          }
        }
      }
      ,
      {
        text: 'Não',
      }
    ])

  }

  const handleViewSignature = () => {

    navigation.navigate('ConfirmDelivery', { order: order, fileUrl: order.File.url })
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
            <DetailTextColor>Situação da entrega</DetailTextColor>
          </RowDirection>
          <DetailText>STATUS</DetailText>
          <DetailText bold={order.canceledAt} color={order.canceledAt ? "#DE3B3B" : '#666'} >{status}</DetailText>
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
            {
              order.canceledAt ?
                <>
                  <DetailText bold color="#DE3B3B" fontSize="16px" textAlign="center">Infelizmente este pedido foi cancelado,
                  mas fique tranquilo, como você ja saiu com ele, irá receber o valor da taxa de entrega.
                 </DetailText>
                </>

                :
                (order.startDate && !order.endDate) ?
                  <>

                    <ButtonContent backColor="#eee" title="Reportar problema" onPress={handleSendAProblem}>
                      <ProblemImage source={ReportProblem}></ProblemImage>
                      <DetailText fontSize="12px" textAlign="center">Informar Problema</DetailText>
                    </ButtonContent>
                    <ButtonContent backColor="#eee" title="See Problems" onPress={handleListProblems}>
                      <SeeProblems source={SeeProblemsImg}></SeeProblems>
                      <DetailText fontSize="12px" textAlign="center">Visualizar Problemas</DetailText>
                    </ButtonContent>
                    <ButtonContent backColor="#eee" title="Cofirm Delivery" onPress={handleDelivered}>
                      <ConfirmDelivery source={ConfirmDeliveryImg}></ConfirmDelivery>
                      <DetailText fontSize="12px" textAlign="center">Confirmar Entrega</DetailText>
                    </ButtonContent>
                  </>
                  :
                  order.endDate ?
                    <>
                      <ButtonContent backColor="#eee" title="See Problems" onPress={handleListProblems}>
                        <SeeProblems source={SeeProblemsImg}></SeeProblems>
                        <DetailText fontSize="12px" textAlign="center">Visualizar Problemas</DetailText>
                      </ButtonContent>
                      <ButtonContent backColor="#eee" title="Cofirm Delivery" onPress={handleViewSignature}>
                        <Icon size={22} color="#444" name="camera-enhance" />
                        <DetailText fontSize="12px" textAlign="center">Visualizar Assinatura</DetailText>
                      </ButtonContent>
                    </>
                    :
                    <StartDelivery onLongPress={handleStartDelivery} onShowUnderlay={() => setLoading(!loading)} onHideUnderlay={() => setLoading(!loading)}>
                      {
                        !loading ?
                          <DetailText bold color="#fff" fontSize="12px" textAlign="center">Sair para entrega</DetailText>
                          :
                          <>
                            <ActivityIndicator size={22} color="#fff"></ActivityIndicator>
                            <DetailText bold color="#fff" fontSize="12px" textAlign="center">Segure</DetailText>
                          </>
                      }

                    </StartDelivery>
            }

          </RowDirection>
        </OrderInfoContent>
      </OrderDetailContainer>
    </Container>
  );
}

