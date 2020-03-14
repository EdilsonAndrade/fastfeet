import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns';
import {signoutRequest} from '~/store/modules/auth/actions';
import AvatarPng from '~/assets/fakeavatar.png'
import {
  ProfileContainer,
  Avatar,
  SmallContainer,
  Label,
  DeliveryManInfo,
  LogoutButton,
  LogoutText
} from './styles';


export default function Profile() {
  const deliveryMan = useSelector(state => state.auth)
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('');

  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(signoutRequest())
  }

  useEffect(() => {
    setFormattedCreatedAt(format(parseISO(deliveryMan.createdAt), 'dd/MM/yyyy'));
  }, [])
  const formatedDate = deliveryMan
  return (
    <ProfileContainer >
      <Avatar source={deliveryMan.avatar ? { uri: deliveryMan.avatar.url} : AvatarPng }/>
      <SmallContainer>
        <Label>Nome completo</Label>
        <DeliveryManInfo>
          {deliveryMan.name}
        </DeliveryManInfo>
        <Label>Email</Label>
        <DeliveryManInfo>
          {deliveryMan.email}
        </DeliveryManInfo>
        <Label>Data do cadastro</Label>
        <DeliveryManInfo>
          {formattedCreatedAt}
        </DeliveryManInfo>
        <LogoutButton title="Logout" onPress={handleLogout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </SmallContainer>

    </ProfileContainer>
  );
}
