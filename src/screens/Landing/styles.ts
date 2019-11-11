import styled from 'styled-components/native';
import {headerHeight, small, borderRadius} from '../../constants/Theme';

const color = ['#6B90D0', '#962CDD', '#FFCB7D'];
export const HeaderContainer = styled.View`
  height: ${headerHeight};
  background-color: #fff;
  padding: ${small}%;
`;

export const ScreenMainContainer = styled.View`
  padding: ${props => props.theme.styled.spacing.base}px;
  padding-bottom: 0px;
`;

export const OfferContainer = styled.View`
  flex: 1;
  min-height: 200px;
  padding-vertical: ${props => props.theme.styled.spacing.base}px;
  padding-left: ${props => props.theme.styled.spacing.base}px;
`;

export const OfferCardScroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {height: '100%'},
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  margin-top: ${props => props.theme.styled.spacing.small};
`;

export const OfferCard = styled.View<{index: number}>`
  border-radius: ${borderRadius};
  padding: ${props => props.theme.styled.spacing.small}px;
  background-color: ${props => color[props.index % 3]};
  margin-horizontal: ${props => props.theme.styled.spacing.small};
  max-width: ${props => props.theme.styled.specification.OfferCardWidth};
  min-height: 100%;
  align-items: flex-start;
`;
