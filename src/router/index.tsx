import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Routes} from './routes';
import Login from '../screens/Login';
import {Landing, Header} from '../screens/Landing';
import {SelectBrand} from '../screens/SelectBrand';
import {SelectDevices} from '../screens/SelectDevice';

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
