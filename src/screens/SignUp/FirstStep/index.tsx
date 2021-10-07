import React, {useState} from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Spacer } from '../../../components/Spacer';

import * as yup from 'yup';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';

export function FirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation();

  async function handleSecondStep() {
    try {
      const schema = yup.object().shape({
        driverLicense: yup.string().required('CNH é obrigatória'),
        email: yup.string().required('E-mail é obrigatório').email('Insira um e-mail válido'),
        name: yup.string().required('Nome é obrigatório'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch(error) {
      if(error instanceof yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <BackButton />
                <Steps>
                  <Bullet active/>
                  <Bullet />
                </Steps>
            </Header>

            <Title>
              Cria sua{'\n'}conta
            </Title>
            <Subtitle>
              Faça seu cadastro de{'\n'}forma rápida e fácil.
            </Subtitle>
 
            <Form>
              <FormTitle>01. Dados</FormTitle>
              <Input
                iconName="user"
                placeholder="Nome"
                value={name}
                onChangeText={setName}
              />
              <Spacer />
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <Spacer />
              <Input
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
                value={driverLicense}
                onChangeText={setDriverLicense}
              />
            </Form>
            
            <Button 
              title="Próximo"
              onPress={handleSecondStep}
            />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}