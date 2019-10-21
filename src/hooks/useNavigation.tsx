import React from 'react';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext,
} from 'react-navigation';

export function useNavigation<Params>() {
  return React.useContext(NavigationContext) as NavigationScreenProp<
    NavigationRoute,
    Params
  >;
}
