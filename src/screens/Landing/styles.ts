import styled from 'styled-components/native';
import {Text} from 'react-native-elements';
import {CenteredText} from '../../components/common/AppText';
import {xLarge} from '../../constants/Theme';

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
`;

export const AppTitle = styled(Text)`
  font-family: DenkOne-Regular;
  margin-bottom: ${xLarge}%;
  color: ${props => props.theme.basic.colors.secondary};
`;

export const Subtitle = styled(CenteredText)`
  margin-left: 15%;
  margin-right: 15%;
`;
