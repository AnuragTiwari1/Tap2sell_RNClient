import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {BatteryModule} from '../../NativeModules';

export const TestScreen = () => {
  const [testName, setTestName] = React.useState('Battery');

  React.useEffect(() => {
    BatteryModule.getBatteryLevel().then(level => {
      console.log(level); // between 0 and 1
    });

    // check if the device is charging
    BatteryModule.isCharging().then(isCharging => {
      console.log(isCharging); // true or false
    });

    BatteryModule.getBatteryHealth().then(console.log);

    // // as a listener
    // var onBatteryStateChanged = (state) => {
    //   console.log(state) // {level: 0.95, charging: true}
    // };

    // // to attach a listener
    // DeviceBattery.addListener(onBatteryStateChanged);

    // // to remove a listener
    // DeviceBattery.removeListener(onBatteryStateChanged);
  });
  return <Text>{testName}</Text>;
};
