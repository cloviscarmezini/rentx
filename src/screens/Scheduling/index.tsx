import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';

import ArrowRightSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps, generateInterval } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';

import { getPlatformDate } from '../../utils/getPlatformDate';

import { CarDTO } from '../../dtos/CarDTO';

interface SchedulingParamsProps {
  car: CarDTO;
};

interface RentalPeriodProps {
    startFormated: string;
    endFormated: string;
}

export function Scheduling() {
    const route = useRoute();
    const { car } = route.params as SchedulingParamsProps;

    const theme = useTheme();
    const navigation = useNavigation();

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);



    function handleSchedulingDetails() {
        if(!rentalPeriod.startFormated || !rentalPeriod.endFormated) {
            Alert.alert('Selecione o período de locação');

            return;
        }

        navigation.navigate('SchedulingDetails', { 
            car,
            dates: Object.keys(markedDates) 
        });
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);

        const interval = generateInterval(start, end);

        setMarkedDates(interval);

        setRentalPeriod({
            startFormated: format(getPlatformDate(new Date(start.timestamp)), 'dd/MM/yyyy'),
            endFormated: format(getPlatformDate(new Date(end.timestamp)), 'dd/MM/yyyy')
        })
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
                Escolha uma{'\n'}
                data de início e{'\n'}
                fim do aluguel
            </Title>

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={!!rentalPeriod.startFormated}>
                        {rentalPeriod.startFormated}
                    </DateValue>
                </DateInfo>
                <ArrowRightSvg />
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormated}>
                        {rentalPeriod.endFormated}
                    </DateValue>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
            <Calendar
                markedDates={markedDates}
                onDayPress={handleChangeDate}
            />
        </Content>

        <Footer>
            <Button 
                title="Confirmar"
                onPress={handleSchedulingDetails}
                enabled={!!rentalPeriod.startFormated}
            />
        </Footer>
    </Container>
    );
    }