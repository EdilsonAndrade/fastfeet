import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import './config/ReactotronConfig';
import App from './App';
import store from '~/store';
const Index = () => {
  return (
    <Provider store={store}>
        <StatusBar barStyle="default" backgroundColor="#7159c1" />
        <App />
    </Provider>
  );
};

export default Index;
