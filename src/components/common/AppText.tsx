import React, {ReactNode, CSSProperties} from 'react';
import {StyleSheet} from 'react-native';
import {Text, withTheme, ThemeProps} from 'react-native-elements';
import {getFontStyleObject} from '../../utils/styles/fonts';
import {IColour} from '../../constants/Theme/colors';

interface IProps
  extends Partial<
    ThemeProps<{
      colors: IColour;
    }>
  > {
  children: string | ReactNode;
  style?: CSSProperties;
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
      style,
      // FIXME: fix e type must be some key of IStyles
      type.split(' ').map(e => getType(e, theme)),
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
  small: {
    fontSize: 14,
  },
  center: {
    textAlign: 'center',
  },
  muted: (theme: any) => ({
    color: theme.colors.grey2,
  }),
};
