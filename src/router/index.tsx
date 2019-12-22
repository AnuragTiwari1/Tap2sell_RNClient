import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  CongoScreen,
  CreateProfile,
  SchedulePickup,
} from '../screens/CreateProfile';
import DeviceReport from '../screens/DeviceReport';
import {Header, Landing} from '../screens/Landing';
import Login from '../screens/Login';
import {SelectBrand} from '../screens/SelectBrand';
import SelectDevices from '../screens/SelectDevice';
import TestScreen from '../screens/TestDevice';
import {Routes} from './routes';

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
        // [Routes.intro]: {
        //   screen: Intro,
        // },
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
    // initialRouteName: `${Routes.login}`,
    initialRouteName: 'AppRoutes',
  },
);

export default createAppContainer(AppNavigator);
