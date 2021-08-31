import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';

import { Load } from '../../components/Load';
import { BackButton } from '../../components/BackButton';

import { CarDTO } from '../../dtos/CarDTO';

import {
    Container,
    Header,
    Title,
    SubTitle,
    CarsList,
    Content,
    Appointments,
    AppointmentTitle,
    AppointmentQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
} from './styles';
import { Car } from '../../components/Car';

interface MySchedulesProps {
    id: string;
    user_id: string;
    car: CarDTO[];
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const [cars, setCars] = useState<MySchedulesProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();

    useEffect(() => {
        getUserSchedules();
    }, []);

    async function getUserSchedules() {
        try {
            const response = await api.get(`schedules_byuser?user_id=1`);

            setCars(response.data);
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            
            <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
            />

            <Header>
                <BackButton
                    onPress={() => {}} 
                    color={theme.colors.shape}
                />
                <Title>
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>
                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>
            </Header>
            { isLoading ? (
                <Load /> 
            ) : (
                <Content>
                    <Appointments>
                        <AppointmentTitle>
                            Agendamentos feitos
                        </AppointmentTitle>
                        <AppointmentQuantity>
                            { cars.length }
                        </AppointmentQuantity>
                    </Appointments>

                    <CarsList 
                        data={cars}
                        keyExtractor={item => item.car.id}
                        renderItem={({ item }) =>
                            <CarWrapper> 
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>
                                        PERÍODO
                                    </CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>
                                            {item.startDate}
                                        </CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20} 
                                            color={theme.colors.text}
                                            style={{marginHorizontal:10}}
                                        />
                                        <CarFooterDate>
                                            {item.endDate}
                                        </CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        }
                    />
                </Content>
            )}
        </Container>
    );
}