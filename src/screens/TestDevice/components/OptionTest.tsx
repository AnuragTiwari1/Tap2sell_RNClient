import React from 'react';
import {
  Alert,
  TouchableOpacity,
  Vibration,
  View,
  NativeEventEmitter,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppText as Text} from '../../../components/common/AppText';
import {base, Theme} from '../../../constants/Theme';
import {AudioModule, BluetoothModule} from '../../../NativeModules';
import {Option} from './common';
import {TestingSpinner} from './TestingSpinner';
import {requestMicPermission} from './utils';

export const TestSpeaker = React.forwardRef(({}, ref) => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');

  const [checked, setChecked] = React.useState(0);
  const [sound, setSound] = React.useState(-1);

  const setupModule = async (func: () => void) => {
    try {
      const isBluetoothSpeakerConnected = await BluetoothModule.isBluetoothHeadsetConnected();
      const isWiredHeadsetConnected = await AudioModule.isWiredHeadsetConnected();
      if (isWiredHeadsetConnected) {
        Alert.alert('Please disconnect the Wired Headset');
        return;
      } else if (isBluetoothSpeakerConnected) {
        Alert.alert('Please disconnect the External Speakers');
        return;
      } else {
        func();
      }
    } catch (error) {
      setSensorStatus('errored');
    }
  };

  React.useImperativeHandle(ref, () => ({
    test() {
      const result = checked === sound;
      if (result) setSensorStatus('pass');
      else setSensorStatus('fail');
      return result;
    },
  }));

  React.useEffect(() => {
    setupModule(() => AudioModule.testSpeaker().then(setSound));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View>
        {
          <Text type="muted bold center">
            {
              {
                pending: 'Testing Speakers',
                pass: 'Speakers working fine',
                fail: 'Speaker failed',
                errored: 'Testing Failed. You can skip the test for now',
              }[sensorStatus]
            }
          </Text>
        }
      </View>
      <TouchableOpacity
        onPress={() => {
          setupModule(() => AudioModule.replay().then(setSound));
        }}>
        <>
          <Icon
            name="volume"
            type="foundation"
            size={80}
            color={
              sensorStatus === 'pending'
                ? Theme.basic.colors.primary
                : sensorStatus === 'pass'
                ? 'green'
                : 'red'
            }
          />
          <Text>Tap to Play/Replay</Text>
        </>
      </TouchableOpacity>
      <View
        style={{
          marginTop: `${base}%`,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Option
          title="1"
          checked={checked === 1}
          center
          onPress={() => setChecked(1)}
        />
        <Option
          title="2"
          checked={checked === 2}
          center
          onPress={() => setChecked(2)}
        />
        <Option
          title="3"
          checked={checked === 3}
          center
          onPress={() => setChecked(3)}
        />
        <Option
          title="4"
          checked={checked === 4}
          center
          onPress={() => setChecked(4)}
        />
        <Option
          title="5"
          checked={checked === 5}
          center
          onPress={() => setChecked(4)}
        />
        <Option
          title="6"
          checked={checked === 6}
          center
          onPress={() => setChecked(4)}
        />
      </View>
    </>
  );
});

export const TestVibration = React.forwardRef(({}, ref) => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');

  const [checked, setChecked] = React.useState(0);
  const [sound] = React.useState(2);
  const PATTERN = [0, 500, 1000, 500, 1000]; //will always return 2

  React.useImperativeHandle(ref, () => ({
    test() {
      const result = checked === sound;
      if (result) setSensorStatus('pass');
      else setSensorStatus('fail');
      return result;
    },
  }));

  /**
   * vibration test
   */
  React.useEffect(() => {
    Vibration.vibrate(PATTERN);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View>
        {
          <Text type="muted bold center">
            {
              {
                pending: 'Testing Vibration',
                pass: 'Vibration working fine',
                fail: 'Vibration failed',
                errored: 'Testing Failed. You can skip the test for now',
              }[sensorStatus]
            }
          </Text>
        }
      </View>
      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(PATTERN);
        }}>
        <>
          <Icon
            name="vibrate"
            type="material-community"
            size={80}
            color={
              sensorStatus === 'pending'
                ? Theme.basic.colors.primary
                : sensorStatus === 'pass'
                ? 'green'
                : 'red'
            }
          />
          <Text>Tap to Play/Replay</Text>
        </>
      </TouchableOpacity>
      <View
        style={{
          marginTop: `${base}%`,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Option
          title="1"
          checked={checked === 1}
          center
          onPress={() => setChecked(1)}
        />
        <Option
          title="2"
          checked={checked === 2}
          center
          onPress={() => setChecked(2)}
        />
        <Option
          title="3"
          checked={checked === 3}
          center
          onPress={() => setChecked(3)}
        />
        <Option
          title="4"
          checked={checked === 4}
          center
          onPress={() => setChecked(4)}
        />
        <Option
          title="5"
          checked={checked === 5}
          center
          onPress={() => setChecked(4)}
        />
        <Option
          title="6"
          checked={checked === 6}
          center
          onPress={() => setChecked(4)}
        />
      </View>
    </>
  );
});

export const TestMicrophone = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');

  const isAlertActive = React.useRef(false);

  React.useEffect(() => {
    /**
     * Audio Test
     */
    requestMicPermission()
      .then(() => {
        const eventEmitter = new NativeEventEmitter(AudioModule);
        eventEmitter.addListener('micAudioChange', event => {
          if (event.eventProperty > 80) {
            AudioModule.isWiredHeadsetConnected().then((bool: boolean) => {
              if (bool) {
                if (isAlertActive.current) {
                } else
                  Alert.alert(
                    'remove earphone',
                    'we have detected earphone please remove them to continue',
                    [
                      {
                        text: 'OK',
                        onPress: () => (isAlertActive.current = false),
                      },
                    ],
                  );
                isAlertActive.current = true;
              } else {
                handleStatusChange('pass');
                setSensorStatus('pass');
                AudioModule.stopRecording();
              }
            });
          } else if (event.eventProperty === 'NaN') {
            Alert.alert('Caught Error');
            AudioModule.stopRecording();
          }
        });
        AudioModule.testMicrophone();

        return () => {
          eventEmitter.removeListener('micAudioChange', () => {});
          AudioModule.stopRecording();
        };
      })
      .catch(() => handleStatusChange('failed'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: `${base}%`,
        }}>
        <Text type="muted bold center">
          {
            {
              pending:
                'Testing Microphone! we are recording your voice samples so speak up',
              pass: 'Microphone is working fine',
              fail: 'Microphone is not working',
              errored: 'Test Failed. You can skip the test for now',
            }[sensorStatus]
          }
        </Text>
      </View>
      <View style={{flex: 2}}>
        <TestingSpinner
          name="microphone"
          type="font-awesome"
          status={sensorStatus}
        />
      </View>
    </>
  );
};
