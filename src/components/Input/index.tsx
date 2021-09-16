import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  InputText,
  IconContainer,
  ChangeVisibilityButtonContainer
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  secureTextEntry?: boolean;
  value?: string;
}

export function Input({ 
  iconName,
  secureTextEntry=false,
  value,
  ...rest 
}: InputProps) {
  const theme = useTheme();
  const [isHide, setIsHide] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleChangeTextVisibility() {
    setIsHide(!isHide);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={(isFilled || isFocused) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText
        secureTextEntry={secureTextEntry && isHide}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        isFocused={isFocused}
        {...rest}
      />

      { secureTextEntry && (
        <ChangeVisibilityButtonContainer isFocused={isFocused}>
          <BorderlessButton
            onPress={handleChangeTextVisibility}
          >
            <Feather
              name={ isHide ? "eye" : "eye-off"}
              size={24}
              color={theme.colors.text_detail}
            />
          </BorderlessButton>
        </ChangeVisibilityButtonContainer>
      )}
    </Container>
  );
}