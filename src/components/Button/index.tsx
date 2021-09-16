import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';


import {
  Container,
  Title
} from './styles';

interface ButtonProps extends RectButtonProps{
  title: string;
  color?: string;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({ 
  title,
  color,
  enabled=true,
  isLoading=false,
  light=false,
  ...rest 
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      color={color}
      enabled={enabled && !isLoading}
      style={{ opacity: (!enabled || isLoading) ? 0.5 : 1 }}
    >
      {isLoading
        ? <ActivityIndicator color={theme.colors.shape}/>
        : <Title light={light}>{title}</Title>
      }
    </Container>
  );
}