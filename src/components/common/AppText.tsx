import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, withTheme, ThemeProps} from 'react-native-elements';
import {getFontStyleObject} from '../../utils/styles/fonts';
import styled, {CSSProperties} from 'styled-components';
import {IColour} from '../../constants/Theme/colors';

interface IProps
  extends Partial<
    ThemeProps<{
      colors: IColour;
    }>
  > {
  children: string;
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
    color: theme.colors.secondary,
  }),
  small: {
    fontSize: 16,
  },
  center: {
    textAlign: 'center',
  },
};

export const CenteredText = styled(AppText)`
  text-align: center;
`;
