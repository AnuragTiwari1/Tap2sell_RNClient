import {colors, IColour} from './colors';
import {getFontStyleObject} from '../../utils/styles/fonts';
export interface IBasicTheme {
  colors: IColour;
}
// spacing
export const xTiny = 1;
export const tiny = 2;
export const small = 3;
export const base = 5;
export const large = 7;
export const xLarge = 10;

//specification
export const buttonHeight = 48;
export const headerHeight = 55;
export const borderRadius = 6;
export const borderRadiusLarge = 15;
export const OfferCardWidth = 37;

// TODO: add Theme types
const elements = {
  Input: {
    inputContainerStyle: {
      borderBottomWidth: 0.6,
      borderWidth: 0.6,
      borderRadius,
    },
    inputStyle: {
      marginTop: `${tiny}%`,
      marginBottom: `${tiny}%`,
      minHeight: 40,
      ...getFontStyleObject(),
    },
    leftIconContainerStyle: {
      marginLeft: `${small}%`,
      marginRight: `${small}%`,
    },
    containerStyle: {
      marginVertical: `${small}%`,
      paddingHorizontal: 0,
    },
  },
  Button: {
    buttonStyle: {
      minHeight: buttonHeight,
      borderRadius,
    },
    titleStyle: {
      ...getFontStyleObject({family: 'Lato', weight: 'Bold'}),
    },
  },
  SearchBar: {
    containerStyle: {
      backgroundColor: '#FFF',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      padding: 0,
    },
    inputContainerStyle: {
      borderRadius,
      borderWidth: 0,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    searchIcon: null,
  },
};

export interface IStyledTheme {
  spacing: {
    xTiny: number;
    tiny: number;
    small: number;
    base: number;
    large: number;
    xLarge: number;
  };
  specification: {
    OfferCardWidth: number;
  };
}
export interface ITheme {
  basic: IBasicTheme;
  styled: IStyledTheme;
  elements: any;
}

export const Theme: ITheme = {
  basic: {
    colors,
  },
  styled: {
    spacing: {
      xTiny,
      tiny,
      small,
      base,
      large,
      xLarge,
    },
    specification: {
      OfferCardWidth,
    },
  },
  elements,
};
