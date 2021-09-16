import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

interface InputProps { 
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

`

export const IconContainer = styled.View<InputProps>`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  margin-right: 2px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`

export const InputText = styled(TextInput)<InputProps>`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex: 1;
  height: 56px;
  padding-left: 23px;

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  
  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const ChangeVisibilityButtonContainer = styled.View<InputProps>`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  justify-content: center;
  align-items: center;
  padding: 0 17px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`
