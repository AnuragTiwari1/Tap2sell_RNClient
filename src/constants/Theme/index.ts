import {colors, IColour} from './colors';

export interface IBasicTheme {
  colors: IColour;
}

export const xTiny = 1;
export const tiny = 2;
export const small = 3;
export const base = 5;
export const large = 7;
export const xLarge = 10;

export interface IStyledTheme {
  spacing: {
    xTiny: number;
    tiny: number;
    small: number;
    base: number;
    large: number;
    xLarge: number;
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
  },
  elements: {},
};
