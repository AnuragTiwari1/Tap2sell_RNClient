import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {
  BatteryModule,
  BluetoothModule,
  CameraModule,
  AudioModule,
} from '../../NativeModules';
import {
  PermissionsAndroid,
  NativeEventEmitter,
  DeviceEventEmitter,
} from 'react-native';

export const TestScreen = () => {
  const [testName, setTestName] = React.useState('Speaker');

  /**
   * battery test
   */
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

  /**
   * bluetooth test
   */
  // React.useEffect(() => {
  //   BluetoothModule.isBluetoothWorking().then(console.log);
  // }, []);

  /**
   * camera test
   */
  // React.useEffect(() => {
  //   CameraModule.isFrontCameraWorking().then(console.log);
  // }, []);

  // React.useEffect(() => {
  //   requestCameraPermission().then(() => {
  //     CameraModule.isBackCameraWorking().then(console.log);
  //   });
  // }, []);

  // async function requestCameraPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // requestExternalWritePermission();
  //     } else {
  //       alert('CAMERA permission denied');
  //     }
  //   } catch (err) {
  //     // alert('Camera permission err', err);
  //     console.warn(err);
  //   }
  // }

  /**
   * Audio Test
   */
  // React.useEffect(() => {
  //   requestMicPermission().then(() => {
  //     const eventEmitter = new NativeEventEmitter(AudioModule);
  //     eventEmitter.addListener('micAudioChange', event => {
  //       console.log(event.eventProperty);
  //     });

  //     // AudioModule.testMicrophone().then(console.log);
  //     // AudioModule.isWiredHeadsetConnected().then(console.log);
  //     // BluetoothModule.isBluetoothHeadsetConnected().then(console.log);
  //     AudioModule.testSpeaker().then(console.log);
  //   });
  // }, []);

  // async function requestMicPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // requestExternalWritePermission();
  //     } else {
  //       alert('Microphone permission denied');
  //     }
  //   } catch (err) {
  //     // alert('Camera permission err', err);
  //     console.warn(err);
  //   }
  // }

  /**
   * vibration test
   */
  // React.useEffect(() => {
  //   AudioModule.testVibration().then(console.log); //will always return 2
  // }, []);

  /**
   * volume button test
   */
  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(AudioModule);
    eventEmitter.addListener('buttonPress', event => {
      console.log(event.volumeUp, event.volumeDown);
    });
  }, []);

  return (
    <Text
      onPress={() => {
        // AudioModule.replay()
        //   .then(console.log)
        //   .catch(console.log);
      }}>
      {testName}
    </Text>
  );
};
