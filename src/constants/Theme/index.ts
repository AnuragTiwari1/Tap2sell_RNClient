import {colors, IColour} from './colors';

interface IThemeBasic {
  colors: Partial<IColour>;
}

export const Theme: Partial<IThemeBasic> = {
  colors: colors,
};
