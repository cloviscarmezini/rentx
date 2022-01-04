import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import * as ImagePicker from 'expo-image-picker';

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
  Section,
} from './styles';

import { useTheme } from 'styled-components';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { Spacer } from '../../components/Spacer';

export function Profile() {
    const { user, signOut } = useAuth();
    const theme = useTheme();
    const [option, setOption] = useState<'dataEdit'|'passwordEdit'>('dataEdit');
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);
    const [avatar, setAvatar] = useState(user.avatar);

    async function handleSignOut() {
        try {
            await signOut();
        } catch(error) {
            Alert.alert('Erro no logout')
        }
    }

    function handleChangeOption(newOption: 'dataEdit'|'passwordEdit') {
        setOption(newOption);
    }

    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if(result.cancelled) {
            return;
        }

        if(result.uri) {
            setAvatar(result.uri);
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            { !!avatar &&
                                <Photo source={{ uri: avatar}} />
                            }
                            <PhotoButton onPress={handleSelectAvatar} >
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
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

                        { option === 'dataEdit' && (
                            <Section>
                                <Input
                                    iconName="user"
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    defaultValue={name}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={setName}
                                />
                                <Input
                                    iconName="mail"
                                    editable={false}
                                    defaultValue={user.email}
                                    style={{ marginBottom: 10 }}
                                />
                                <Input
                                    iconName="credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={driverLicense}
                                    onChangeText={setDriverLicense}
                                />
                            </Section>
                        )}
                        { option === 'passwordEdit' && (
                            <Section>
                                <Input
                                    iconName="lock"
                                    placeholder="Senha atual"
                                    autoCorrect={false}
                                    secureTextEntry
                                />
                                <Spacer />
                                <Input
                                    iconName="lock"
                                    placeholder="Nova Senha"
                                    autoCorrect={false}
                                    secureTextEntry
                                />
                                <Spacer />
                                <Input
                                    iconName="lock"
                                    placeholder="Confirmar Senha"
                                    autoCorrect={false}
                                    secureTextEntry
                                />
                            </Section>
                        )}

                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}