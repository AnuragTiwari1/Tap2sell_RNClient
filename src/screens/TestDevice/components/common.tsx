import React from 'react';
import {CheckBox} from 'react-native-elements';
import styled from 'styled-components/native';
import {AppText as Text} from '../../../components/common/AppText';
import {base, large} from '../../../constants/Theme';
import {getFontStyleObject} from '../../../utils/styles/fonts';

export const Option = styled(CheckBox).attrs(props => ({
  checkedIcon: <></>,
  uncheckedIcon: <></>,
  containerStyle: {
    backgroundColor: props.checked ? '#FFD9A2' : '#FFF',
    borderWidth: 2,
    borderColor: '#FFD9A2',
    borderRadius: 0,
    minWidth: '30%',
    paddingVertical: `${base}%`,
    flex: 1,
  },
  textStyle: {
    ...getFontStyleObject({family: 'Lato', weight: 'Regular'}),
    color: !props.checked ? '#FFD9A2' : '#FFF',
    fontSize: 20,
  },
}))``;

export const Title = styled(Text)`
  margin-vertical: ${base}%;
`;

export const OptionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin-top: ${base}%;
  margin-horizontal: ${large}%;
`;
