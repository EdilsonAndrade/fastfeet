import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SigningView, Logo, IdInput, LoginButon, LoginTextButton } from './styles';
import api from '~/services/api';
import LogoFastFett from '~/assets/logo.png'
import { signinRequest } from '~/store/modules/auth/actions';
import { StatusBar } from 'react-native';
export default function Signin({ navigation }) {

  const [deliveryManId, setDeliveryManId] = useState();
  const [loading, setLoading] = useState(false);
  const deliveryMan = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if (deliveryMan.signed) {
      navigation.navigate('Dashboard');
    }

  }, [deliveryMan])
  const handleSignin = async () => {
    setLoading(true);
    try {
      if (!deliveryManId) {
        Alert.alert(
          'Número de cadastro',
          'Informe um número de registro válido'
        )

      } else {
          const response = await api.get(`/deliveryman/${deliveryManId}`, {timeout: 5000});
          dispatch(signinRequest(response.data));
          setLoading(false);
        }

    } catch (error) {

      setLoading(false);
      const {message} = error;
      if(message.includes("timeout"))
      {
        Alert.alert('Erro', 'Tempo de 5 segundos de conexão expirou, verifique sua internet ou a mesma rede wi-fi');
      }else{
        Alert.alert('Erro', JSON.stringify(error));
      }
    }
    setLoading(false);

  }
  return (
    <SigningView >
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Logo source={LogoFastFett} />
      <IdInput returnKeyType="go" onSubmitEditing={handleSignin} keyboardType="numeric" placeholder="Informe seu ID de cadastro" onChangeText={(text) => setDeliveryManId(text)} ></IdInput>
      <LoginButon onPress={handleSignin} >
        {loading ? <ActivityIndicator size={20} color="#fff" /> : <LoginTextButton>
          Entrar no sistema
        </LoginTextButton>}

      </LoginButon>
    </SigningView>
  );
}
