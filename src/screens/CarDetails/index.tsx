import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';
import api from '../../services/api';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Details,
  Brand,
  Name,
  Description,
  Rent,
  Period,
  Price,
  About,
  CarImages,
  Accessories,
  Footer,
  OfflineInfo
} from './styles';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/model/Car'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface CarDetailsParamsProps {
  car: ModelCar;
};

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const netInfo = useNetInfo();
  const { car } = route.params as CarDetailsParamsProps;

  const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);

  const scrollY = useSharedValue(0);

  const theme = useTheme();

  const statusBarHeight = getStatusBarHeight();

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  async function fetchUpdatedCar() {
    const response = await api.get(`/cars/${car.id}`);
    setUpdatedCar(response.data);
  }

  useEffect(() => {
    netInfo.isConnected === true && fetchUpdatedCar();
  }, [netInfo.isConnected]);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, statusBarHeight + 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleScheduling() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Animated.View
          style={[
            headerStyle,
            styles.header,
            { backgroundColor:  theme.colors.background_secondary}
          ]}
        >
          <Header>
              <BackButton /> 
          </Header>

          <Animated.View style={sliderCarsAnimationStyle}>
            <CarImages>
              <ImageSlider
                imagesUrls={
                  !!updatedCar.photos
                  ? updatedCar.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
                }
              />
            </CarImages>
          </Animated.View>
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: statusBarHeight + 160,
          }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{ netInfo.isConnected === true ? `R$ ${car.price}` : '...' }</Price>
            </Rent>
          </Details>

          { updatedCar.accessories &&
            <Accessories>
              { 
                updatedCar.accessories.map(accessory => (
                  <Accessory
                    name={accessory.name}
                    key={accessory.type}
                    icon={getAccessoryIcon(accessory.type)}
                  />
                ))
              }
            </Accessories>
          }

          <About>
            {car.about}
          </About>
        </Animated.ScrollView>
        <Footer>
          <Button
            title="Escolher o período do aluguel" 
            onPress={handleScheduling}
            enabled={netInfo.isConnected === true}
          />

          {
            netInfo.isConnected === false &&
            <OfflineInfo>
              Conecte-se a Internet para ver mais detalhes e agendar seu carro.
            </OfflineInfo>
          }
        </Footer>

    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
})