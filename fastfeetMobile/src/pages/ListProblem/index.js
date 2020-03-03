import React, { useState, useEffect } from 'react';
import {format, parseISO} from 'date-fns';
import { Alert , View, ActivityIndicator} from 'react-native';
import {
  Container,
  OrderDetailContainer,
  ContainerText,
  ProblemsContainer,
  DetailText,
  ProblemContent,
  Problems,
  DateText

} from './styles';

import api from '~/services/api';

export default function ListProblem({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const { orderId } = route.params;

  const getProblems = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders/${orderId}/problems?limit=8&page=${page}`);

      const rows = response.data.rows.map(p=>({
        ...p,
        formattedData: format(parseISO(p.createdAt),'dd/MM/yy')
      }))
      if(response.data.count > problems.length){
        setProblems([...problems, ...rows])
        setPage(page + 1);
      }


    } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro, tente novamente em alguns minutos");
    }
    setLoading(false);
  }
  useEffect(() => {
    getProblems();
  }, [])


  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View >
        <ActivityIndicator />
      </View>
    );
  }
  const renderList = (item) => {
    return (
      <ProblemContent key={item.id}>
          <DetailText>{item.description.length < 5 ? "Não informado" : item.description}</DetailText>
          <DateText>{item.formattedData}</DateText>
      </ProblemContent>
    )
  }

  return (
    <Container>
      <OrderDetailContainer>
        <ContainerText>Encomenda {orderId < 10 ? `0${orderId}` : orderId}</ContainerText>

      </OrderDetailContainer>
      <ProblemsContainer>
        <Problems
        onEndReached={getProblems}
        onEndReachedThreshold={0}
        data={problems}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => renderList(item)}
        ListFooterComponent={renderFooter}
      />
        </ProblemsContainer>
    </Container>
  );
}

