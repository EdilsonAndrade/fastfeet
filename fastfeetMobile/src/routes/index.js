import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
import Signin from '~/pages/Signin';
import dashboardRoutes from '~/routes/Dashboard';
import OrderDetailNavigator from './OrderDetail'

export default function Routes(){
  const signed = useSelector(state=>state.auth.signed);
  return (
    <Stack.Navigator  >

      {!signed ?
            <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}} />
            :
            <>
            <Stack.Screen name="Dashboard" component={dashboardRoutes}  options={{headerShown:false}} />
            <Stack.Screen name="OrderDetail" component={OrderDetailNavigator} options={{headerTitle:"Detalhes da encomenda",
             headerStyle:{backgroundColor:"#7159c1", elevation:0}, headerTintColor:'#fff'}} />
            </>
    }

  </Stack.Navigator>
  )
}
