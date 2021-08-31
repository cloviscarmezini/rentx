import React from 'react';

import { StatusBar, useWindowDimensions  } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

export function SchedulingComplete() {
    const { width } = useWindowDimensions();
    const theme = useTheme();

    const navigation = useNavigation();

    function handleCompleteRental() {
      navigation.navigate('Home');
    }

    return (
        <Container>
            
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <LogoSvg width={width}/>

            <Content>
                <DoneSvg height={80} width={80}/>
                <Title>Carro Alugado</Title>

                <Message>
                    Agora você só precisa ir {'\n'}
                    até uma concessionária da RENTX {'\n'}
                    pegar o seu automóvel.
                </Message>
            </Content>
            <Footer>
                <ConfirmButton
                    title="Ok"
                    color={theme.colors.shape_dark}
                    onPress={handleCompleteRental}
                />
            </Footer>
        </Container>
    );
}