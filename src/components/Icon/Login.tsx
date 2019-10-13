import React from 'react';
import {Icon} from 'react-native-elements';
import {withTheme} from 'react-native-elements';
import {IIcons} from './common';

export const EmailIcon = withTheme<IIcons>(({theme, ...rest}) => {
  return (
    <Icon
      name="envelope"
      type="font-awesome"
      color={theme.colors ? theme.colors.primary : undefined}
      {...rest}
    />
  );
});

export const PasswordIcon = withTheme<IIcons>(({theme, ...rest}) => {
  return (
    <Icon
      name="lock"
      type="font-awesome"
      color={theme.colors ? theme.colors.primary : undefined}
      {...rest}
    />
  );
});
