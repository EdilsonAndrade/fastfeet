import React from 'react';
import Background from '~/assets/confirmdeliveryback.png'
import Camera from '~/assets/camera.png'
import {
  Container,
  OrderDetailContainer,
  OrderInfoContent,
  ContainerCamera,
  ConfirmBackground,
  CircleBackCam,
  Cam,
  ButtonSend,
  ButtonSendText

} from './styles';

export default function ConfirmDelivery() {
  return (
    <Container>
      <OrderDetailContainer />
      <OrderInfoContent>
        <ContainerCamera>
          <ConfirmBackground source={Background}>
          </ConfirmBackground>
          <CircleBackCam >
            <Cam source={Camera} ></Cam>
          </CircleBackCam>
          <ButtonSend>
            <ButtonSendText>Enviar</ButtonSendText>
          </ButtonSend>
        </ContainerCamera>

      </OrderInfoContent>
    </Container>
  );
}

