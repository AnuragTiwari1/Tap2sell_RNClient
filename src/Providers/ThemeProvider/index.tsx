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
} from '../../constants/Theme';
import {useResponsiveHelper} from '../../utils/styles/responsive';

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: ITheme;
  children: React.ReactElement;
}): React.ReactElement<any> => {
  const {widthPercentageToDP} = useResponsiveHelper();

  if (theme.styled && theme.styled.spacing) {
    theme.styled.spacing = {
      xTiny: widthPercentageToDP(xTiny),
      tiny: widthPercentageToDP(tiny),
      small: widthPercentageToDP(small),
      base: widthPercentageToDP(base),
      large: widthPercentageToDP(large),
      xLarge: widthPercentageToDP(xLarge),
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
