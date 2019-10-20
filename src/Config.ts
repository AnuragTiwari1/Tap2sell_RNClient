import {Platform} from 'react-native';

export default {
  isAndroid: Platform.OS === 'android',
  logGeneral: false,
  logNetworkErrors: false,
  isTablet: false,
};

export const constant = {
  searchBarId: 'searchBarId',
};
