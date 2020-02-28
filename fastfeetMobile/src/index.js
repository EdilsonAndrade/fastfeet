import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import Routes from '~/routes';
import store from '~/store';
const Index = () => {
  return (
    <NavigationContainer>
    <Provider store={store}>
    <StatusBar barStyle="dark-content"  backgroundColor="#fff" />
        <Routes />
    </Provider>
    </NavigationContainer>
  );
};

export default Index;
