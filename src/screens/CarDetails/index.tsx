import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

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
  About,
  Accessories,
  Footer
} from './styles';

import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface CarDetailsParamsProps {
  car: CarDTO;
};

export function CarDetails() {

  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as CarDetailsParamsProps;

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
        <Header>
            <BackButton /> 
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
              <Price>R${car.rent.price}</Price>
            </Rent>
          </Details>

          <Accessories>
            { 
              car.accessories.map(accessory => (
                <Accessory
                  name={accessory.name}
                  key={accessory.type}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>

          <About>
            {car.about}
          </About>
        </Content>
        <Footer>
          <Button
            title="Escolher o período do aluguel" 
            onPress={handleScheduling}
          />
        </Footer>

    </Container>
  );
}