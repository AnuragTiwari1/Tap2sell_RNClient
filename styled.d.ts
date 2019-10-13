import {IBasicTheme, IStyledTheme} from './src/constants/Theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basic: IBasicTheme;
    styled: IStyledTheme;
  }
}
