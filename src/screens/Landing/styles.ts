import styled from 'styled-components/native';
import {Text} from 'react-native-elements';
import {CenteredText} from '../../components/common/AppText';
import {small, base, large, xLarge} from '../../constants/Theme';

export const ScrollView = styled.ScrollView`
  background-color: ${props => props.theme.basic.colors.searchBg};
`;

export const Container = styled.View``;

export const LogoContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

export const InputAndButtonContainer = styled.View`
  padding-left: ${xLarge}%;
  padding-right: ${xLarge}%;
  flex: 3;
`;

export const AppTitle = styled(Text)`
  font-family: DenkOne-Regular;
  margin-bottom: ${xLarge}%;
`;

export const Subtitle = styled(CenteredText)`
  margin-left: 15%;
  margin-right: 15%;
`;
