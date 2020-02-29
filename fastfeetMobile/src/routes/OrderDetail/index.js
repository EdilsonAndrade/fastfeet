import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import OrderDetail from '~/pages/OrderDetail';

const Stack = createStackNavigator();

const OrderDetailNavigator = ()=>{
  return(
    <Stack.Navigator >
      <Stack.Screen name="OrderDetail"  component={OrderDetail}
        options={{headerShown:false}}
      >
      </Stack.Screen>
      </Stack.Navigator>
  )
}

export default OrderDetailNavigator;
