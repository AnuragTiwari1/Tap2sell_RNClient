import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {getFontStyleObject} from '../../utils/styles/fonts';
import styled from 'styled-components';

interface IProps {
  children: any;
  style?: any;
  type?: any;
}

export const AppText = (props: IProps) => {
  const {children, style} = props;
  //   const textStyles = [styles.text, Theme.typography[type], style];
  const textStyles = [styles.text, style];
  return (
    <Text {...props} style={textStyles}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    ...getFontStyleObject(),
  },
});

export const CenteredText = styled(AppText)`
  text-align: center;
`;
