import React, {useState} from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Spacer } from '../../../components/Spacer';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';
import { useTheme } from 'styled-components';

interface SecondStepParams {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();

  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as SecondStepParams;

  async function handleRegister() {
    if(!password || !passwordConfirm) {
      return Alert.alert('ops', 'Insira uma senha e confirme para continuar');
    }
    if(password !== passwordConfirm) {
      return Alert.alert('ops', 'Senhas não coincidem');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    }).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        nextScreenRoute: 'SignIn'
      });
    }).catch(error => {
      Alert.alert('Ops', 'Ocorreu um erro');
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header> 
                <BackButton />
                <Steps>
                  <Bullet />
                  <Bullet active/>
                </Steps>
            </Header>

            <Form>
              <FormTitle>02. Senha</FormTitle>
              <Input
                iconName="lock"
                placeholder="Senha"
                secureTextEntry
                onChangeText={setPassword}
              />
              <Spacer />
              <Input
                iconName="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                onChangeText={setPasswordConfirm}
              />
            </Form>
            <Button
              title="Cadastrar"
              onPress={handleRegister}
              enabled={!!password && !!passwordConfirm}
              color={(password && passwordConfirm) ? theme.colors.seccess : theme.colors.main}
            />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}