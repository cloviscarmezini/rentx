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
  enabled?: boolean;
  isLoading?: boolean;
}

export function Button({ 
  title,
  color,
  enabled=true,
  isLoading=false,
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
        : <Title>{title}</Title>
      }
    </Container>
  );
}