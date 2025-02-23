import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import {base, tiny, Theme} from '../../constants/Theme';

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
  titleStyle: {
    marginVertical: `${tiny + 0.5}%`,
    fontSize: 18,
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

export const FlexInvertedButton = styled(Button).attrs(() => ({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Theme.basic.colors.primary,
  },
  containerStyle: {
    marginHorizontal: `${base}%`,
    flex: 1,
    marginBottom: `${base}%`,
  },
  titleStyle: {
    color: Theme.basic.colors.primary,
  },
}))``;
