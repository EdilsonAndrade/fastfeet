import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { SigningView, Logo, IdInput, LoginButon, LoginTextButton } from './styles';
import api from '~/services/api';
import LogoFastFett from '~/assets/logo.png'
import {signinRequest} from '~/store/modules/auth/actions';
export default function Signin({ navigation }) {
  const [deliveryManId, setDeliveryManId] = useState();
const dispatch = useDispatch();

  const handleSignin = async () =>{
    const response = await api.get(`/deliveryman/${deliveryManId}`);
    console.tron.warn(`resposta = ${JSON.stringify(response.data)}`);

    dispatch(signinRequest(response.data));
    navigation.navigate('Dashboard');
  }
  return (
    <SigningView >
      <Logo source={LogoFastFett} />
      <IdInput keyboardType="numeric" placeholder="Informe seu ID de cadastro" onChangeText={(text)=>setDeliveryManId(text)} ></IdInput>
      <LoginButon onPress={handleSignin} >
        <LoginTextButton>
          Entrar no sistema
        </LoginTextButton>
      </LoginButon>
    </SigningView>
  );
}
