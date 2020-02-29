import React, {useState} from 'react';

import {
  Container,
OrderDetailContainer,
OrderInfoContent,
DetailText,
Send,
SendText

      } from './styles';

export default function OrderReportProblem() {
const [loading,setLoading] = useState(false);
  const handleSendProblem = () =>{

  }
  return (
    <Container>
    <OrderDetailContainer>

      <OrderInfoContent>
        <DetailText
        editable={true}
        multiline={true}
        placeholder="Informe o problema que está ocorrendo"
        returnKeyType="send"
        ></DetailText>

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

