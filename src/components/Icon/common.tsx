import React from 'react';
import {Icon, IconProps, ThemeProps, withTheme} from 'react-native-elements';
import {IColour} from '../../constants/Theme/colors';

export interface IIcons
  extends Partial<IconProps>,
    Partial<
      ThemeProps<{
        colors: IColour;
      }>
    > {}
export const tinyIcon = 4.0;
export const smallIcon = 6.0;
export const baseIcon = 8.0;
export const normalIcon = 18.0;

export const SearchIcon = withTheme<IIcons>(props => {
  return <Icon name="search" type="material" color="#939393" {...props} />;
});

export const ClearIcon = withTheme<IIcons>(props => {
  return <Icon name="clear" type="material" color="#939393" {...props} />;
});

export const BackIcon = withTheme<IIcons>(props => {
  return (
    <Icon name="md-arrow-round-back" type="ionicon" color="black" {...props} />
  );
});
