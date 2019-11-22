import React from 'react';
import {NativeEventEmitter, View} from 'react-native';
import {AppText as Text} from '../../../components/common/AppText';
import {AudioModule, BatteryModule} from '../../../NativeModules';
import {TestingSpinner} from './TestingSpinner';

export const TestCharging = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');

  React.useEffect(() => {
    // as a listener
    var onBatteryStateChanged = (state: any) => {
      if (state.charging) {
        setSensorStatus('pass');
      } // {level: 0.95, charging: true}
    };
    const eventEmitter = new NativeEventEmitter(BatteryModule);

    // to attach a listener
    eventEmitter.addListener('batteryChange', onBatteryStateChanged);
    // to remove a listener
    return eventEmitter.removeListener('batteryChange', () => {});
  }, []);

  React.useEffect(() => {
    handleStatusChange('pending');
    BatteryModule.isCharging().then((isCharging: boolean) => {
      if (isCharging) setSensorStatus('pass');
    });
  }, [handleStatusChange]);

  React.useEffect(() => {
    handleStatusChange(sensorStatus);
  }, [handleStatusChange, sensorStatus]);

  return (
    <>
      <View>
        {
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
        }
      </View>
      <TestingSpinner
        name="battery-charging-50"
        type="material-community"
        status={sensorStatus}
      />
    </>
  );
};

export const TestVolumeUpButton = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');

  /**
   * volume button test
   */
  React.useEffect(() => {
    // as a listener
    const eventEmitter = new NativeEventEmitter(AudioModule);
    eventEmitter.addListener('buttonPress', event => {
      if (event.volumeUp) {
        setSensorStatus('pass');
      }
    });
    // to remove a listener
    return eventEmitter.removeListener('buttonPress', () => {});
  }, [handleStatusChange]);

  React.useEffect(() => {
    handleStatusChange(sensorStatus);
  }, [handleStatusChange, sensorStatus]);

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

export const TestVolumeDownButton = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');

  /**
   * volume button test
   */
  React.useEffect(() => {
    // as a listener
    const eventEmitter = new NativeEventEmitter(AudioModule);
    eventEmitter.addListener('buttonPress', event => {
      if (event.volumeDown) {
        setSensorStatus('pass');
      }
    });
    // to remove a listener
    return eventEmitter.removeListener('buttonPress', () => {});
  }, [handleStatusChange]);

  React.useEffect(() => {
    handleStatusChange(sensorStatus);
  }, [handleStatusChange, sensorStatus]);

  return (
    <>
      <View>
        {
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
        }
      </View>
      <TestingSpinner
        name="volume-down"
        type="font-awesome"
        status={sensorStatus}
      />
    </>
  );
};
