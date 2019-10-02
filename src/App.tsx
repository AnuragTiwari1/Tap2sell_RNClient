import React from 'react';
import {SharedElementRenderer} from 'react-native-motion';
import Landing from './screens/Landing';
import {Theme} from './constants/Theme';
import {Provider} from 'react-redux';
import store from './redux/store';
import {ThemeProvider} from './Providers/ThemeProvider';
import {DimensionProvider} from './Providers/DimensionProvider';

const App = () => {
  return (
    <Provider store={store}>
      <DimensionProvider>
        <SharedElementRenderer>
          <ThemeProvider theme={Theme}>
            <Landing />
          </ThemeProvider>
        </SharedElementRenderer>
      </DimensionProvider>
    </Provider>
  );
};

export default App;
