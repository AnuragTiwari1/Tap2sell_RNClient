import React from 'react';
import {SharedElementRenderer} from 'react-native-motion';
import {Theme} from './constants/Theme';
import {Provider} from 'react-redux';
import store from './redux/store';
import {ThemeProvider} from './Providers/ThemeProvider';
import {DimensionProvider} from './Providers/DimensionProvider';
import {NetworkProvider} from 'react-native-offline';
import {StatusBar} from 'react-native';
import AppNavigator from './router';

type IScreens = 'login' | 'landing';
const App = () => {
  return (
    <Provider store={store}>
      <DimensionProvider>
        <SharedElementRenderer>
          <ThemeProvider theme={Theme}>
            <NetworkProvider>
              <StatusBar backgroundColor="white" barStyle="dark-content" />
              <AppNavigator />
            </NetworkProvider>
          </ThemeProvider>
        </SharedElementRenderer>
      </DimensionProvider>
    </Provider>
  );
};

export default App;
