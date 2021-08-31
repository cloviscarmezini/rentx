import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { BorderlessButtonProps } from 'react-native-gesture-handler';

import {
    Container
} from './styles';

interface BackButtonProps extends BorderlessButtonProps{
    color?: string;
}

export function BackButton({ color }: BackButtonProps) {
    const theme = useTheme();

    const navigation = useNavigation();

    function handleGoBack() {
        if(navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    return (
        <Container onPress={handleGoBack}>
            <MaterialIcons
                name="chevron-left"
                size={24}
                color={color ? color : theme.colors.text}
            />
        </Container>
    );
}