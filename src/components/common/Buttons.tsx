import styled from 'styled-components';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {large, base} from '../../constants/Theme';

export const LinearGradientButton = styled(Button).attrs(() => ({
  ViewComponent: LinearGradient, // Don't forget this!
  linearGradientProps: {
    colors: ['red', 'pink'],
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
  },
}));

export const FullWidthButton = styled(Button).attrs(() => ({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  containerStyle: {
    width: '100%',
  },
}))``;

export const FlexButton = styled(Button).attrs(() => ({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  containerStyle: {
    marginHorizontal: `${base}%`,
    flex: 1,
    marginBottom: `${base}%`,
  },
}))``;
