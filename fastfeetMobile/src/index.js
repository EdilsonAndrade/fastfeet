import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import './config/ReactotronConfig';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>FastFeet</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
