import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Camera from '~/assets/camera.png';
import api from '~/services/api';
import {
  Container,
  TopContainer,
  ConfirmDeliveryContainer,
  CameraContainer,
  ContainerPicture,
  Picture,
  ButtonShot,
  ButtonNewPicture,
  Cam,
  ButtonSend,
  ButtonSendText,
} from './styles';

export default function ConfirmDelivery({ route, navigation }) {
  const [camera, setCamera] = useState();
  const [picture, setPicture] = useState();
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { order, fileUrl } = route.params;
    if (fileUrl) {
      setPicture(fileUrl);
      navigation.setOptions({title:'Assinatura do cliente'});
    }else{
      navigation.setOptions({title:'Confirmar a entrega'});
    }
    setOrder(order)



  }, [])

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setPicture(data.uri);
    }
  };
  const handleSendPictureAndFinishDelivery = async () => {
    setLoading(true);
    try {
      const data = new FormData();

      data.append('signature',
        {
          type: 'image/jpeg',
          uri: Platform.OS === "android" ? picture : picture.replace("file://", ""),
          name: picture.split("/")[9]
        });
      const response = await api.put(`/orders/${order.id}/enddelivery`, data)
      if (response.data.File) {
        Alert.alert('Sucesso', 'Entrega finalizada com sucesso');
        navigation.push('Dashboard')
      }
    } catch (error) {
      console.tron.warn(`Erro = ${error}`)
    }
    setLoading(false);
  }
  return (
    <Container>
      <TopContainer />
      <ConfirmDeliveryContainer>
        {picture ?
          <ContainerPicture>
            <Picture source={{ uri: picture }}>
              {!order.File ?
                <ButtonNewPicture onPress={() => setPicture(null)} >
                  <Icon name="autorenew" size={22} color="#fff" />
                </ButtonNewPicture>
                : null
              }

            </Picture>
            {!order.File ?
              <ButtonSend onPress={handleSendPictureAndFinishDelivery}>
                {loading ? <ActivityIndicator size={22} color="#fff"></ActivityIndicator>
                  :
                  <ButtonSendText>Enviar</ButtonSendText>
                }

              </ButtonSend>
              :
              null
            }
          </ContainerPicture>
          :
          <CameraContainer
            ref={ref => {
              setCamera(ref);
            }}
            captureAudio={false}
            type={CameraContainer.Constants.Type.back}
            flashMode={CameraContainer.Constants.FlashMode.auto}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera',
              message: 'Nós precisamos de sua permissão para abrir a câmera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}

            onGoogleVisionBarcodesDetected={({ barcodes }) => {
            }}
          >
            <ButtonShot onPress={takePicture} >
              <Cam source={Camera} ></Cam>
            </ButtonShot>
          </CameraContainer>
        }
      </ConfirmDeliveryContainer>
    </Container>
  );
}
