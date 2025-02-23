import React, {ReactNode} from 'react';
import {StyleSheet, TextStyle, TextProps} from 'react-native';
import {Text, withTheme, ThemeProps} from 'react-native-elements';
import {getFontStyleObject} from '../../utils/styles/fonts';
import {IColour} from '../../constants/Theme/colors';

interface IProps
  extends Partial<
      ThemeProps<{
        colors: IColour;
      }>
    >,
    TextProps {
  children: string | ReactNode;
  style?: TextStyle;
  type?: string;
}

const getType = (type: keyof IStyles, theme: any) => {
  return styles[type]
    ? typeof styles[type] === 'function'
      ? styles[type](theme)
      : styles[type]
    : {};
};

export const AppText = withTheme((props: IProps) => {
  const {children, style, type = '', theme} = props;
  //map array of type to styles obj
  const textStyles = [
    //to comply with styled components style all styles must be array
    StyleSheet.flatten([
      styles.text,
      // FIXME: fix e type must be some key of IStyles
      type.split(' ').map(e => getType(e, theme)),
      style,
    ]),
  ];
  return (
    <Text {...props} style={textStyles}>
      {children}
    </Text>
  );
});

interface IStyles {
  text: any;
  bold: any;
  center: any;
  primary: any;
  small: any;
  muted: any;
  header: any;
  white: any;
  dullWhite: any;
  base: any;
  'bold-italic': any;
  xLarge: any;
  large: any;
  underline: any;
  right: any;
  label: any;
}

const styles: IStyles = {
  text: {
    fontSize: 20,
    ...getFontStyleObject(),
  },
  bold: {
    ...getFontStyleObject({family: 'Lato', weight: 'Bold'}),
  },
  primary: (theme: any) => ({
    color: theme.colors.primary,
  }),
  white: {
    color: '#ffffff',
  },
  dullWhite: {
    color: '#FBEFE1',
  },
  small: {
    fontSize: 14,
  },
  base: {
    fontSize: 17,
  },
  xLarge: {
    fontSize: 30,
  },
  large: {
    fontSize: 22,
  },
  center: {
    textAlign: 'center',
  },
  right: {textAlign: 'right', alignSelf: 'stretch'},
  muted: (theme: any) => ({
    color: theme.colors.grey2,
  }),
  label: {
    fontSize: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
  },
  'bold-italic': {
    ...getFontStyleObject({family: 'Lato', weight: 'BoldItalic'}),
  },
  underline: {
    textDecorationLine: 'underline',
  },
};
