import React from 'react';
import {NativeEventEmitter, View} from 'react-native';
import {AppText as Text} from '../../../components/common/AppText';
import {AudioModule, BatteryModule} from '../../../NativeModules';
import {TestingSpinner} from './TestingSpinner';
import {ITestProps} from './BasicTest';
import {ISensorStatus} from './BasicSensorTest';

export const TestCharging = ({handleStatusChange}: ITestProps) => {
  const [sensorStatus, setSensorStatus] = React.useState<ISensorStatus>(
    'pending',
  );

  const onBatteryStateChanged = (state: any) => {
    if (state.charging) {
      setSensorStatus('pass');
      handleStatusChange('pass');
    } // {level: 0.95, charging: true}
  };

  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(BatteryModule);

    // to attach a listener
    eventEmitter.addListener('batteryChange', onBatteryStateChanged);
    // to remove a listener
    return () => eventEmitter.removeListener('batteryChange', () => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // it is required is device is charging already
  React.useEffect(() => {
    handleStatusChange('pending');
    BatteryModule.isCharging().then((isCharging: boolean) => {
      if (isCharging) {
        setSensorStatus('pass');
        handleStatusChange('pass');
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text type="muted bold center">
          {
            {
              pending: 'Plug in the charger to test the charging port',
              pass: 'Charging port is working fine',
              fail: 'Charging Port is not working',
              errored: 'Test Failed. You can skip the test for now',
            }[sensorStatus]
          }
        </Text>
      </View>
      <View style={{flex: 2}}>
        <TestingSpinner
          name="battery-charging-50"
          type="material-community"
          status={sensorStatus}
        />
      </View>
    </>
  );
};

export const TestVolumeUpButton = ({handleStatusChange}: ITestProps) => {
  const [sensorStatus, setSensorStatus] = React.useState<ISensorStatus>(
    'pending',
  );

  /**
   * volume button test
   */
  React.useEffect(() => {
    // as a listener
    const eventEmitter = new NativeEventEmitter(AudioModule);
    eventEmitter.addListener('buttonPress', event => {
      if (event.volumeUp) {
        setSensorStatus('pass');
        handleStatusChange('pass');
      }
    });
    // to remove a listener
    return () => eventEmitter.removeListener('buttonPress', () => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text type="muted bold center">
          {
            {
              pending: 'Press the volume up button',
              pass: 'Volume up button is working fine',
              fail: 'Volume up button is not working',
              errored: 'Test Failed. You can skip the test for now',
            }[sensorStatus]
          }
        </Text>
      </View>
      <View style={{flex: 2}}>
        <TestingSpinner
          name="volume-up"
          type="font-awesome"
          status={sensorStatus}
        />
      </View>
    </>
  );
};

export const TestVolumeDownButton = ({handleStatusChange}: ITestProps) => {
  const [sensorStatus, setSensorStatus] = React.useState<ISensorStatus>(
    'pending',
  );

  /**
   * volume button test
   */
  React.useEffect(() => {
    // as a listener
    const eventEmitter = new NativeEventEmitter(AudioModule);
    eventEmitter.addListener('buttonPress', event => {
      if (event.volumeDown) {
        setSensorStatus('pass');
        handleStatusChange('pass');
      }
    });
    // to remove a listener
    return () => eventEmitter.removeListener('buttonPress', () => {});
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text type="muted bold center">
          {
            {
              pending: 'Press the volume down button',
              pass: 'Volume down button is working fine',
              fail: 'Volume down button is not working',
              errored: 'Test Failed. You can skip the test for now',
            }[sensorStatus]
          }
        </Text>
      </View>
      <View style={{flex: 2}}>
        <TestingSpinner
          name="volume-down"
          type="font-awesome"
          status={sensorStatus}
        />
      </View>
    </>
  );
};
