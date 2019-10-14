import styled from 'styled-components/native';
import {small, borderRadiusLarge} from '../../../constants/Theme';

export const IntroContainer = styled.View`
  align-items: center;
`;

export const CarousalContainer = styled.View`
  width: 100%;
  margin-vertical: ${small}%;
  background-color: #ff8686;
  border-radius: ${borderRadiusLarge};
`;

export const CarousalCard = styled.View`
  flex-direction: row;
  padding: ${props => props.theme.styled.spacing.base}px;
`;

export const IconAssetsContainer = styled.View`
  align-items: center;
  margin-end: ${props => props.theme.styled.spacing.base}px;
`;

export const TextContainer = styled.View`
  flex: 1;
  justify-content: space-around;
`;

export const ImageContainer = styled.View`
  min-height: 40px;
  width: 100%;
  background-color: ${props => props.theme.basic.colors.searchBg};
  flex-direction: row;
  margin-top: ${small}%;
  padding: ${props => props.theme.styled.spacing.small}px;
  justify-content: space-between;
  align-items: center;
  border-radius: ${borderRadiusLarge};
`;

export const Image = styled.View`
  margin-vertical: ${props => props.theme.styled.spacing.tiny}px;
`;
