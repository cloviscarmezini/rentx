import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimated';

import { Ionicons } from '@expo/vector-icons';

import { CarDTO } from '../../dtos/CarDTO';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarsList
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const netInfo = useNetInfo();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });
  
  const theme = useTheme();

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    let isMounted = true;
    
    async function getCars() {
      try {
        const response = await api.get('/cars');
        if(isMounted) {
          setCars(response.data);
        }
      } catch(error) {
        console.log(error);
      } finally {
        if(isMounted) {
          setIsLoading(false);
        }
      }
    }

    getCars();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    if(netInfo.isConnected) {
      Alert.alert('Você está online')
    } else {
      Alert.alert('Você está offline')
    }
  }, [netInfo.isConnected])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          { !isLoading && (
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          )}
        </HeaderContent>
      </Header>

      { isLoading ? (
        <LoadAnimated />
      ) : (
        <CarsList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <Car
              data={item}
              onPress={() => handleCarDetails(item)}
            />
          }
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 22
          }
        ]}>
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]} 
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={30}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})