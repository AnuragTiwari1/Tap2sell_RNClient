import styled from 'styled-components/native';
import {headerHeight, small} from '../../constants/Theme';

export const HeaderContainer = styled.View`
  min-height: ${headerHeight};
  background-color: #fff;
  padding: ${small}%;
`;

export const ScreenMainContainer = styled.View`
  flex: 5;
  padding: ${props => props.theme.styled.spacing.base}px;
`;

export const OfferContainer = styled.View`
  padding-left: ${small}%;
  flex: 2;
`;
