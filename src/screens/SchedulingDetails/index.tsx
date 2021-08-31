import React, { useEffect, useState } from 'react';

import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

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
import api from '../../services/api';

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

  const { car, dates } = route.params as SchedulingDetailsParamsProps;
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const rentQuantity = Number(dates.length);

  async function handleConfirmRental() {
    setIsSubmiting(true);

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: rentalPeriod.start,
      endDate: rentalPeriod.end
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    }).then(response => {
      navigation.navigate('SchedulingComplete')
    })
    .catch(error => {
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
          <ImageSlider imagesUrls={car.photos}/>
        </CarImages>

        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>{car.rent.price}</Price>
            </Rent>
          </Details>

          <Accessories>
            { car.accessories.map(accessory => (
              <Accessory name={accessory.name} key={accessory.type} icon={getAccessoryIcon(accessory.type)}/>
            ))}
          </Accessories>

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
                {`R$ ${car.rent.price} x${rentQuantity} diárias`}
              </RentalPriceQuota>
              <RentalPriceTotal>
                R$ {car.rent.price * rentQuantity}
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