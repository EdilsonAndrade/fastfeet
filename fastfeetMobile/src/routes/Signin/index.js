import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '~/pages/Signin';

const Stack = createStackNavigator();

export default function  SigninNavigator(){
  return (
      <Stack.Screen name="Signin" component={Signin}
       />
  )
}