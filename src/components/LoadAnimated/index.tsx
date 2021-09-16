import React from 'react';
import LootieView from 'lottie-react-native';

import loadCar from '../../assets/load_car.json';

import { Container } from './styles';

export function LoadAnimated() {
    return (
        <Container>
            <LootieView 
                source={loadCar}
                style={{
                    height: 200
                }}
                resizeMode="contain"
                autoPlay
                loop
            />
        </Container>
    );
}