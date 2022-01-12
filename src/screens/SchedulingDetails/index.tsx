import React, { useEffect, useState } from 'react';

import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/auth';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Brand,
  Name,
  Description,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

interface CarDataProps {
  brand: string;
  name: string;
  rent: {
      period: string;
      price: number;
  };
}

import { CarDTO } from '../../dtos/CarDTO';

import { getPlatformDate } from '../../utils/getPlatformDate';

interface SchedulingDetailsParamsProps {
  car: CarDTO;
  dates: string[];
};

interface RentalPeriodProps {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const route = useRoute();
  const theme = useTheme();
  const navigation = useNavigation();

  const { user } = useAuth();
  const { car, dates } = route.params as SchedulingDetailsParamsProps;
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
  const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const netInfo = useNetInfo();

  const rentQuantity = Number(dates.length);

  const rentTotal = Number(car.price * rentQuantity);

  async function fetchUpdatedCar() {
    const response = await api.get(`/cars/${car.id}`);
    setUpdatedCar(response.data);
  }

  useEffect(() => {
    netInfo.isConnected === true && fetchUpdatedCar();
  }, [netInfo.isConnected]);

  async function handleConfirmRental() {
    setIsSubmiting(true);

    const data = {
      user_id: user.user_id,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    }

    await api.post('/rentals', data).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Carro Alugado',
        message: `Agora você só precisa ir\naté uma concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute: 'Home'
      });
    })
    .catch(error => {
      console.log(error);
      setIsSubmiting(false);
      Alert.alert('Ocorreu um erro')
    });
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, []);

  return (
    <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
            <BackButton onPress={() => {}} /> 
        </Header>

        <CarImages>
          <ImageSlider
            imagesUrls={
              !!updatedCar.photos
              ? updatedCar.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </CarImages>

        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{car.price}</Price>
            </Rent>
          </Details>

          { updatedCar.accessories &&
            <Accessories>
              { updatedCar.accessories.map(accessory => (
                <Accessory name={accessory.name} key={accessory.type} icon={getAccessoryIcon(accessory.type)}/>
              ))}
            </Accessories>
          }

          <RentalPeriod>
            <CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(24)}
              color={theme.colors.shape}
            />

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>
                {`R$ ${car.price} x${rentQuantity} diárias`}
              </RentalPriceQuota>
              <RentalPriceTotal>
                R$ {rentTotal}
              </RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Content>
        <Footer>
          <Button
            title="Alugar agora"
            color={theme.colors.seccess}
            onPress={handleConfirmRental}
            isLoading={isSubmiting}
          />
        </Footer>
    </Container>
  );
}