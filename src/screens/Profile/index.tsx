import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionsTitle,
} from './styles';

import { useTheme } from 'styled-components';

export function Profile() {
    const theme = useTheme();
    const [option, setOption] = useState<'dataEdit'|'passwordEdit'>('dataEdit');

    function handleSignOut() {

    }

    function handleChangeOption(newOption: 'dataEdit'|'passwordEdit') {
        setOption(newOption);
    }

    return (
        <Container>
            <Header>
                <HeaderTop>
                    <BackButton color={theme.colors.shape}/>
                    <HeaderTitle>Editar Perfil</HeaderTitle>
                    <LogoutButton onPress={handleSignOut}>
                        <Feather
                            name="power"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeaderTop>
                <PhotoContainer>
                    <Photo source={{ uri: "https://avatars.githubusercontent.com/u/48700098?v=4"}} />
                    <PhotoButton onPress={() => {}} >
                        <Feather
                            name="camera"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </PhotoButton>
                </PhotoContainer>
            </Header>

            <Content>
                <Options>
                    <Option
                        active={option==='dataEdit'}
                        onPress={() => handleChangeOption('dataEdit')}
                    >
                        <OptionsTitle active={option==='dataEdit'}>
                            Dados
                        </OptionsTitle>
                    </Option>
                    <Option
                        active={option==='passwordEdit'}
                        onPress={() => handleChangeOption('passwordEdit')}
                    >
                        <OptionsTitle active={option==='passwordEdit'}>
                            Trocar senha
                        </OptionsTitle>
                    </Option>
                </Options>
            </Content>
        </Container>
    );
}