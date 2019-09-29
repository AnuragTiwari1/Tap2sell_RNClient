import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import Landing from './screens/Landing';
import {Theme} from './constants/Theme';
import {SharedElementRenderer} from 'react-native-motion';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SharedElementRenderer>
        <ThemeProvider theme={Theme}>
          <Landing />
        </ThemeProvider>
      </SharedElementRenderer>
    </Provider>
  );
};

export default App;
