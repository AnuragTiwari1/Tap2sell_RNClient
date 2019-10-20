import React from 'react';
import {ThemeProvider as ElementsThemeProvider} from 'react-native-elements';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {
  ITheme,
  xTiny,
  tiny,
  small,
  base,
  large,
  xLarge,
  OfferCardWidth,
  carousalWidth,
  brandLogoWidth,
  deviceLogoHeight,
} from '../../constants/Theme';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {useDimensions} from '../DimensionProvider';

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: ITheme;
  children: React.ReactElement;
}): React.ReactElement<any> => {
  const {widthPercentageToDP, heightPercentageToDP} = useResponsiveHelper();
  const {isLandscape} = useDimensions();

  if (theme.styled) {
    theme.styled.spacing = {
      xTiny: widthPercentageToDP(xTiny),
      tiny: widthPercentageToDP(tiny),
      small: widthPercentageToDP(small),
      base: widthPercentageToDP(base),
      large: widthPercentageToDP(large),
      xLarge: widthPercentageToDP(xLarge),
    };
    theme.styled.specification = {
      OfferCardWidth: isLandscape
        ? heightPercentageToDP(OfferCardWidth)
        : widthPercentageToDP(OfferCardWidth),
      carouselWidth: isLandscape
        ? heightPercentageToDP(carousalWidth)
        : widthPercentageToDP(carousalWidth),
      brandLogoWidth: widthPercentageToDP(brandLogoWidth),
      deviceLogoHeight: heightPercentageToDP(deviceLogoHeight),
    };
  }

  return (
    <ElementsThemeProvider theme={{...theme.basic, ...theme.elements}}>
      <StyledThemeProvider
        theme={{basic: {...theme.basic}, styled: {...theme.styled}}}>
        {children}
      </StyledThemeProvider>
    </ElementsThemeProvider>
  );
};
