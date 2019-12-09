import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Routes} from './routes';
import Login from '../screens/Login';
import {Landing, Header} from '../screens/Landing';
import {SelectBrand} from '../screens/SelectBrand';
import SelectDevices from '../screens/SelectDevice';
import TestScreen from '../screens/TestDevice';
import DeviceReport from '../screens/DeviceReport';
import {
  CreateProfile,
  SchedulePickup,
  CongoScreen,
} from '../screens/CreateProfile';

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
        [Routes.createProfile]: {
          screen: CreateProfile,
        },
        [Routes.schedulePickup]: {
          screen: SchedulePickup,
        },
        [Routes.congo]: {
          screen: CongoScreen,
        },
        [Routes.deviceReport]: {
          screen: DeviceReport,
        },
        [Routes.testDevice]: {
          screen: TestScreen,
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
    initialRouteName: `${Routes.login}`,
  },
);

export default createAppContainer(AppNavigator);
