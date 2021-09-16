import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Spacer } from '../../components/Spacer';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Footer,
  Form
} from './styles';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const theme = useTheme();

    async function handleSignIn() {
        try {
            const schema = yup.object().shape({
                email: yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: yup.string().required('Senha obrigatória'),
            });
    
            await schema.validate({email, password});

            Alert.alert('login efetuado');
        } catch(error) {
            if(error instanceof yup.ValidationError) {
                return Alert.alert(error.message)
            }

            return Alert.alert('E-mail ou senha inválidos')
        };
    }

    function handleRegister() {
        navigation.navigate('SignUpFirstStep');
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>
                            Estamos {'\n'}
                            quase lá.
                        </Title>
                        <Subtitle>
                            Faça seu login para começar {'\n'}
                            uma experiência incrível.
                        </Subtitle>
                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Spacer />
                        <Input
                            iconName="lock"
                            placeholder="Senha"
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login" 
                            onPress={handleSignIn}
                            enabled={!!email && !!password}
                            isLoading={false}
                        />
                        <Spacer />
                        <Button
                            title="Criar conta gratuita" 
                            onPress={handleRegister}
                            color={theme.colors.background_secondary}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
} 