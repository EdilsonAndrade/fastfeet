import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderNavigator from '../Order'
import Profile from '~/pages/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons'
const Tab = createBottomTabNavigator();


export default function DashboardNavigation() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor:"#7D40E7"
    }}>

      <Tab.Screen name="Entregas" component={OrderNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Icon name="reorder" color={focused ? "#7D40E7": '#ddd'}size={32} />
        ),


      }}

       />
      <Tab.Screen name="Meu Perfil" component={Profile}
      options={{
        tabBarIcon: ({focused }) => (
          <Icon name="account-circle" color={focused ? "#7D40E7" : '#ddd'} size={32} />
        ),

      }}
       />
    </Tab.Navigator>
  )
}
