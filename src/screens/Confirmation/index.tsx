import React from 'react';

import { StatusBar, useWindowDimensions  } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

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

interface ConfirmationParamsProps {
    title: string;
    message?: string;
    nextScreenRoute: string;
}

export function Confirmation() {
    const theme = useTheme();
    const route = useRoute();

    const { title, message, nextScreenRoute } = route.params as ConfirmationParamsProps;
    
    const navigation = useNavigation();

    const { width } = useWindowDimensions();

    function handleCompleteRental() {
      navigation.navigate(nextScreenRoute);
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
                <Title>{ title }</Title>

                <Message>
                    {message}
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