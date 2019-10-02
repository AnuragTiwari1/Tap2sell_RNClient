import {colors, IColour} from './colors';

export interface ITheme {
  basic: {
    colors: Partial<IColour>;
  };
  styled: {
    spacing: {
      xTiny: number;
      tiny: number;
      small: number;
      base: number;
      large: number;
      xLarge: number;
    };
  };
  elements: any;
}

export const Theme: Partial<ITheme> = {
  basic: {
    colors: colors,
  },
  styled: {
    spacing: {
      xTiny: 1,
      tiny: 2,
      small: 3,
      base: 7,
      large: 7,
      xLarge: 10,
    },
  },
};
