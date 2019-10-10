import React from 'react';
import styled from 'styled-components';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export const LinearGradientButton = styled(Button).attrs(props => ({
  ViewComponent: LinearGradient, // Don't forget this!
  linearGradientProps: {
    colors: ['red', 'pink'],
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
  },
}));
