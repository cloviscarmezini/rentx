import { FlatList } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 325px;
    
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.header};
    padding: 25px;

    padding-top: ${getStatusBarHeight() + 32}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;

  margin-top: 24px;
`

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;

  margin-top: 18px;
`

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;
`;

export const AppointmentTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;

  margin-top: 18px;
`;

export const AppointmentQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;

  margin-top: 18px;
`;

export const CarsList = styled(FlatList)`
  
`

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;

  margin-top: -10px;
`;

export const CarFooterTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;