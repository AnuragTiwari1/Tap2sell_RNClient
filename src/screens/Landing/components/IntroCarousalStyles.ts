import styled from 'styled-components/native';
import {small, borderRadiusLarge} from '../../../constants/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';

export const IntroContainer = styled.View`
  align-items: center;
`;

export const CarousalContainer = styled(LinearGradient).attrs(() => ({
  useAngle: true,
  angle: 135,
  angleCenter: {x: 0.5, y: 0.5},
  colors: ['#FFD9A2', '#FF8686'],
}))`
  width: 100%;
  margin-vertical: ${small}%;
  padding: ${props => props.theme.styled.spacing.base}px;
  border-radius: ${borderRadiusLarge};
  align-items: center;
  padding-bottom: ${props => props.theme.styled.spacing.tiny}px;
`;

export const IconAssetsContainer = styled.View`
  align-items: center;
  margin-end: ${props => props.theme.styled.spacing.tiny}px;
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

export const StyledCarousel = styled(Carousel).attrs(props => ({
  itemWidth: props.theme.styled.specification.carouselWidth,
  sliderWidth: props.theme.styled.specification.carouselWidth,
  autoplay: true,
  enableMomentum: true,
  lockScrollWhileSnapping: true,
  autoplayDelay: 3000,
  loop: true,
}))``;
