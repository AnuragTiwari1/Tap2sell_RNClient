import React from 'react';
import {CheckBox} from 'react-native-elements';
import styled from 'styled-components/native';
import {large, small, base} from '../../../constants/Theme';
import {getFontStyleObject} from '../../../utils/styles/fonts';
import {AppText as Text} from '../../../components/common/AppText';

export const Option = styled(CheckBox).attrs(props => ({
  checkedIcon: <></>,
  uncheckedIcon: <></>,
  containerStyle: {
    paddingHorizontal: `${large}%`,
    backgroundColor: props.checked ? '#FFD9A2' : '#FFF',
    borderWidth: 2,
    borderColor: '#FFD9A2',
    borderRadius: 0,
    paddingBottom: `${small}%`,
  },
  textStyle: {
    ...getFontStyleObject({family: 'Lato', weight: 'Regular'}),
    color: !props.checked ? '#FFD9A2' : '#FFF',
    fontSize: 20,
    padding: `${small}%`,
  },
}))``;

export const Title = styled(Text)`
  margin-vertical: ${base}%;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: space-between;
`;
