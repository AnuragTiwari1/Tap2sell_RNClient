// declare module here which are missinf @types
declare module 'react-native-motion';

import 'styled-components';
import {IBasicTheme, IStyledTheme} from './src/constants/Theme';
declare module 'styled-components' {
  export interface DefaultTheme {
    basic: IBasicTheme;
    styled: IStyledTheme;
  }
}
