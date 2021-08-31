import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { Ionicons } from '@expo/vector-icons';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarsList,
  MyCarsButton
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  const navigation = useNavigation();

  useEffect(() => {
    getCars();
  }, []);

  async function getCars() {
    try {
      const response = await api.get('/cars');
      setCars(response.data);
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

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
          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>

      { isLoading ? (
        <Load />
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

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={30}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}