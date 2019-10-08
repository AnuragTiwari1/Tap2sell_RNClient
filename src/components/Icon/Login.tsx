import React from 'react';
import {Icon, IconProps, ThemeProps} from 'react-native-elements';
import {withTheme} from 'react-native-elements';
import {IColour} from '../../constants/Theme/colors';

interface IIcons
  extends Partial<IconProps>,
    Partial<
      ThemeProps<{
        colors: IColour;
      }>
    > {}

export const EmailIcon: React.FC<IIcons> = withTheme(({theme, ...rest}) => {
  return (
    <Icon
      name="envelope"
      type="font-awesome"
      color={theme.colors ? theme.colors.primary : undefined}
      {...rest}
    />
  );
});

export const PasswordIcon: React.FC<IIcons> = withTheme(({theme, ...rest}) => {
  return (
    <Icon
      name="lock"
      type="font-awesome"
      color={theme.colors ? theme.colors.primary : undefined}
      {...rest}
    />
  );
});
