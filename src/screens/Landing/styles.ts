import styled from 'styled-components/native';
import {Text} from 'react-native-elements';
import {xLarge, base} from '../../constants/Theme';
import {AppText} from '../../components/common/AppText';

export const ScrollView = styled.ScrollView`
  background-color: ${props => props.theme.basic.colors.searchBg};
`;

export const Container = styled.View``;

export const LogoContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

export const InputAndButtonContainer = styled.View`
  padding-left: ${xLarge}%;
  padding-right: ${xLarge}%;
  flex: 4;
  justify-content: space-around;
`;

export const AppTitle = styled(Text)`
  font-family: DenkOne-Regular;
  margin-bottom: ${xLarge}%;
  color: ${props => props.theme.basic.colors.secondary};
`;

export const Subtitle = styled(AppText)`
  margin-left: 15%;
  margin-right: 15%;
  font-weight: 100;
  font-family: Lato-Bold;
`;

export const ForgotPassword = styled(AppText)`
  margin: ${base}% 0;
`;
