import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Routes} from './routes';
import Login from '../screens/Login';
import {Landing, Header} from '../screens/Landing';
import {SelectBrand} from '../screens/SelectBrand';
import {SelectDevices} from '../screens/SelectDevice';
import {TestScreen} from '../screens/TestDevice';

const defaultHeaderObject = {
  header: () => <Header />,
};

const AppNavigator = createSwitchNavigator(
  {
    [Routes.login]: {
      screen: Login,
    },
    AppRoutes: createStackNavigator(
      {
        [Routes.testDevice]: {
          screen: TestScreen,
        },
        [Routes.landing]: {
          screen: Landing,
        },
        [Routes.selectBrand]: {
          screen: SelectBrand,
        },
        [Routes.selectDevice]: {
          screen: SelectDevices,
          navigationOptions: {
            header: null,
          },
        },
      },
      {
        defaultNavigationOptions: {...defaultHeaderObject},
      },
    ),
  },
  {
    initialRouteName: 'AppRoutes',
  },
);

export default createAppContainer(AppNavigator);
