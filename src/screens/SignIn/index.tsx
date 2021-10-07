import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as yup from 'yup';

import { useAuth } from '../../hooks/auth'; 

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Spacer } from '../../components/Spacer';

import { database } from '../../database';

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

    const { signIn } = useAuth();

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

            signIn({email, password});
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

    useEffect(() => {
        async function loadData() {
            const usersCollection = database.get('users');
            const users = await usersCollection.query().fetch();
            console.log(users);
        }

        loadData();
    }, []);

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