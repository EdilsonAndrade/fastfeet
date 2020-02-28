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
        setLoading(false);
      } else {
        const response = await api.get(`/deliveryman/${deliveryManId}`);
        dispatch(signinRequest(response.data));
      }

    } catch (error) {
      setLoading(false);
    }

  }
  return (
    <SigningView >
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Logo source={LogoFastFett} />
      <IdInput keyboardType="numeric" placeholder="Informe seu ID de cadastro" onChangeText={(text) => setDeliveryManId(text)} ></IdInput>
      <LoginButon onPress={handleSignin} >
        {loading ? <ActivityIndicator size={20} color="#fff" /> : <LoginTextButton>
          Entrar no sistema
        </LoginTextButton>}

      </LoginButon>
    </SigningView>
  );
}
