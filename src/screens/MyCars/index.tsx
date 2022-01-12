import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { useIsFocused } from '@react-navigation/native';

import { format, parseISO } from 'date-fns';

import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';

import { LoadAnimated } from '../../components/LoadAnimated';
import { BackButton } from '../../components/BackButton';

import { Car as ModelCar } from '../../database/model/Car'

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

interface DataProps {
    id: string;
    car: ModelCar[];
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const screenIsFocused = useIsFocused();

    const theme = useTheme();

    useEffect(() => {
        getUserSchedules();
    }, [screenIsFocused]);

    async function getUserSchedules() {
        try {
            const response = await api.get(`/rentals`);

            const formatedData = response.data.map((data: DataProps) => {
                return {
                    ...data,
                    start_date: format(parseISO(data.startDate), 'dd/MM/yyyy'),
                    end_date: format(parseISO(data.startDate), 'dd/MM/yyyy'),
                }
            })

            setCars(formatedData);
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
                <LoadAnimated /> 
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