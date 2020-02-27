import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Order from '~/pages/Order';
import Profile from '~/pages/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons'
const Tab = createBottomTabNavigator();

export default function DashboardNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Entregas" component={Order} 
      
      options={{
        tabBarIcon: ({ focused }) => (
          <Icon name="reorder" color={focused ? "#7159c1": '#ddd'}size={32} />
        ),
      
      }}
       />
      <Tab.Screen name="Meu Perfil" component={Profile} 
      options={{
        tabBarIcon: ({focused }) => (
          <Icon name="account-circle" color={focused ? "#7159c1" : '#ddd'} size={32} />
        ),
      }} />
    </Tab.Navigator>
  )
}