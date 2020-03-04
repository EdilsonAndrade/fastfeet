import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Order from '~/pages/Order';
import OrderDetail from '~/pages/OrderDetail';
import OrderReportProblem from '~/pages/OrderReportProblem';
import ConfirmDelivery from '~/pages/ConfirmDelivery';
import ListProblem from '~/pages/ListProblem';

const stack = createStackNavigator();
export default function OrderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} options={{
        headerTitle: "Detalhes da encomenda",
        headerStyle: { backgroundColor: "#7D40E7", elevation: 0 }, headerTintColor: '#fff'
      }} />
       <Stack.Screen name="OrderReportProblem"  component={OrderReportProblem}
        options={{headerShown:true, headerTitle:"Informar um problema", headerStyle: { backgroundColor: "#7D40E7", elevation: 0 }, headerTintColor:"#fff"}}
      />
       <Stack.Screen name="ListProblem"  component={ListProblem}
        options={{headerShown:true, headerTitle:"Visualizar problemas", headerStyle: { backgroundColor: "#7D40E7", elevation: 0 }, headerTintColor:"#fff"}}
      />
       <Stack.Screen name="ConfirmDelivery"  component={ConfirmDelivery}
        options={({route})=>({headerShown:true,
          title: route.params.title,
          headerStyle: { backgroundColor: "#7D40E7", elevation: 0 },
          headerTintColor:"#fff"})}
      />
    </Stack.Navigator>
  )
}
