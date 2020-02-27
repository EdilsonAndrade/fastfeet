import React from 'react';
import {Dashboard, DashboardText} from './styles';

export default function Signin() {
  return (
    <Dashboard >
      <DashboardText>Este é o meu dashboard de entregas</DashboardText>
    </Dashboard>
  );
}
Signin.navigationOptions ={
  headerLeft: null
}