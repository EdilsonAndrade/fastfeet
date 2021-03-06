import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import {
  Container,
  OrderDetailContainer,
  OrderInfoContent,
  ProblemDescription,
  Send,
  SendText

} from './styles';

import api from '~/services/api';

export default function OrderReportProblem({ route, navigation }) {
  const [orderId, setOrderId] = useState(0);
 const [description, setDescription] = useState();
  useEffect(() => {
    const { orderId } = route.params;
    setOrderId(orderId)

  }, [])
  const [loading, setLoading] = useState(false);


  const handleSendProblem = async () => {
    setLoading(true);
    if(!description || description.length < 5){
      Alert.alert('Erro', 'Descrição deve ser informada com no mínimo 5 caracteres');
    }else{
      try {
        await api.post(`/orders/${orderId}/problems`,{
          description
        })
        Alert.alert("Sucesso", "Problema cadastrado com sucesso!");
        setDescription('');
      } catch (error) {
        Alert.alert("Erro", `Ocorreu um erro tente novamente!`);
      }
    }


    setLoading(false);
  }
  return (
    <Container>
      <OrderDetailContainer>

        <OrderInfoContent>
          <ProblemDescription
            editable={true}
            multiline={true}
            placeholder="Informe o problema que está ocorrendo"
            returnKeyType="go"
            value={description}
            onChangeText={setDescription}
          ></ProblemDescription>

        </OrderInfoContent>
        <Send onPress={handleSendProblem} >
          {loading ? <ActivityIndicator size={20} color="#fff" /> : <SendText>
            Enviar
        </SendText>}

        </Send>
      </OrderDetailContainer>
    </Container>
  );
}

