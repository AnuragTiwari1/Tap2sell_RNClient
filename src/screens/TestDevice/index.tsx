import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {
  BatteryModule,
  BluetoothModule,
  CameraModule,
} from '../../NativeModules';
import {PermissionsAndroid} from 'react-native';

export const TestScreen = () => {
  const [testName, setTestName] = React.useState('Bluetooth');

  // React.useEffect(() => {
  //   BatteryModule.getBatteryLevel().then(level => {
  //     console.log(level); // between 0 and 1
  //   });

  //   // check if the device is charging
  //   BatteryModule.isCharging().then(isCharging => {
  //     console.log(isCharging); // true or false
  //   });

  //   BatteryModule.getBatteryHealth().then(console.log);

  //   // as a listener
  //   var onBatteryStateChanged = (state) => {
  //     console.log(state) // {level: 0.95, charging: true}
  //   };

  //   // to attach a listener
  //   DeviceBattery.addListener(onBatteryStateChanged);

  //   // to remove a listener
  //   DeviceBattery.removeListener(onBatteryStateChanged);
  // });

  // React.useEffect(() => {
  //   BluetoothModule.isBluetoothWorking().then(console.log);
  // }, []);

  React.useEffect(() => {
    CameraModule.isFrontCameraWorking().then(console.log);
  }, []);

  React.useEffect(() => {
    requestCameraPermission().then(() => {
      CameraModule.isBackCameraWorking().then(console.log);
    });
  }, []);

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // requestExternalWritePermission();
      } else {
        alert('CAMERA permission denied');
      }
    } catch (err) {
      // alert('Camera permission err', err);
      console.warn(err);
    }
  }

  return <Text>{testName}</Text>;
};
