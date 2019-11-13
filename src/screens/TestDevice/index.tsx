import React from 'react';
import {
  ScrollView,
  View,
  Animated,
  NativeEventEmitter,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import {CheckBox, Icon, withTheme, IconProps} from 'react-native-elements';
import styled from 'styled-components/native';
import Phone from '../../assets/icons/smartphone.svg';
import {AppText as Text} from '../../components/common/AppText';
import {FullWidthButton, FlexButton} from '../../components/common/Buttons';
import {base, headerHeight, large, small} from '../../constants/Theme';
import {useNavigation} from '../../hooks/useNavigation';
import {getFontStyleObject} from '../../utils/styles/fonts';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {
  BluetoothModule,
  BatteryModule,
  CameraModule,
  AudioModule,
} from '../../NativeModules';

type ITestTypes =
  | 'switchOn'
  | 'age'
  | 'condition'
  | 'askForTest'
  | 'testBluetooth';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
  } catch (err) {
    // alert('Camera permission err', err);
    console.warn(err);
  }
}

async function requestMicPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
  } catch (err) {
    // alert('Camera permission err', err);
    console.warn(err);
  }
}

export const TestScreen = () => {
  const navigation = useNavigation<{step: ITestTypes}>();

  switch (navigation.getParam('step')) {
    case 'switchOn':
      return <DoesPhoneSwitchOn />;
    case 'age':
      return <SelectPhoneAge />;

    case 'askForTest':
      return <AskForTest />;
    default:
      return <AskForTest />;
    // return <DoesPhoneSwitchOn />;
  }
};

const DoesPhoneSwitchOn = () => {
  const {widthPercentageToDP, heightPercentageToDP} = useResponsiveHelper();
  const [checked, setChecked] = React.useState(1);

  return (
    <ScrollView>
      <Container style={[{height: heightPercentageToDP(100) - headerHeight}]}>
        <Title>Does the phone switch on?</Title>
        <Phone
          width={widthPercentageToDP(30)}
          height={widthPercentageToDP(30)}
          style={{
            marginVertical: `${base}%`,
          }}
        />

        <View style={{marginTop: `${base}%`, flexDirection: 'row'}}>
          <Option
            title="Yes"
            checked={checked === 1}
            center
            onPress={() => setChecked(1)}
          />
          <Option
            title="No"
            checked={checked === 2}
            center
            onPress={() => setChecked(2)}
          />
        </View>
        <FullWidthButton title="Next" />
      </Container>
    </ScrollView>
  );
};

const SelectPhoneAge = () => {
  const {widthPercentageToDP, heightPercentageToDP} = useResponsiveHelper();
  const [checked, setChecked] = React.useState(1);

  return (
    <ScrollView>
      <Container style={[{height: heightPercentageToDP(100) - headerHeight}]}>
        <Title type="center">
          How Old is your phone?
          <Text type="center">{`\n (in months)`}</Text>
        </Title>
        <Phone
          width={widthPercentageToDP(30)}
          height={widthPercentageToDP(30)}
          style={{
            marginVertical: `${base}%`,
          }}
        />
        <View
          style={{
            marginTop: `${base}%`,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Option
            title="1-3"
            checked={checked === 1}
            center
            onPress={() => setChecked(1)}
          />
          <Option
            title="3-6"
            checked={checked === 2}
            center
            onPress={() => setChecked(2)}
          />
          <Option
            title="6-11"
            checked={checked === 3}
            center
            onPress={() => setChecked(3)}
          />
          <Option
            title="> 11"
            checked={checked === 4}
            center
            onPress={() => setChecked(4)}
          />
        </View>
        <FullWidthButton title="Next" />
      </Container>
    </ScrollView>
  );
};

const AskForTest = () => {
  const {widthPercentageToDP, heightPercentageToDP} = useResponsiveHelper();
  const [step, setStep] = React.useState(6);
  const [sensorStatus, setSensorStatus] = React.useState('willTest' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored'
    | 'willTest');
  const [canSkip, setCanSkip] = React.useState(false);
  const btnText = sensorStatus === 'pending' && canSkip ? 'Skip' : 'Next';
  const isFirstRender = React.useRef(true);
  const speaker = React.useRef();
  const vibration = React.useRef();
  const showBtn =
    (sensorStatus === 'pending' && canSkip) ||
    sensorStatus === 'errored' ||
    sensorStatus === 'willTest' ||
    sensorStatus === 'fail';

  const _renderBtn = step => {
    switch (step) {
      case 8:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {sensorStatus === 'pending' ? (
              <FlexButton
                title="Test"
                onPress={() => {
                  const result = speaker.current.test();
                  if (result) {
                    setSensorStatus('pass');
                  } else setSensorStatus('fail');
                }}
              />
            ) : (
              <></>
            )}
            <FlexButton title={btnText} onPress={() => setStep(step + 1)} />
          </View>
        );

      case 9:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {sensorStatus === 'pending' ? (
              <FlexButton
                title="Test"
                onPress={() => {
                  const result = vibration.current.test();
                  if (result) {
                    setSensorStatus('pass');
                  } else setSensorStatus('fail');
                }}
              />
            ) : (
              <></>
            )}
            <FlexButton title={btnText} onPress={() => setStep(step + 1)} />
          </View>
        );

      default:
        return (
          <FullWidthButton title={btnText} onPress={() => setStep(step + 1)} />
        );
    }
  };

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setSensorStatus('pending');
      setCanSkip(false);
      setTimeout(() => setCanSkip(true), 2500);
    }
  }, [step]);

  React.useEffect(() => {
    if (sensorStatus === 'pass') setTimeout(() => setStep(step + 1), 1500);
  }, [sensorStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Container
        style={[
          {
            height: heightPercentageToDP(100) - headerHeight,
            justifyContent: 'space-between',
          },
        ]}>
        {
          {
            0: (
              <>
                <Title type="center">Test devices hardware?</Title>
                <Phone
                  width={widthPercentageToDP(30)}
                  height={widthPercentageToDP(30)}
                  style={{
                    marginVertical: `${base}%`,
                  }}
                />
              </>
            ),
            1: (
              <TestBluetooth
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            2: (
              <TestBattery
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            3: (
              <TestCharging
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            4: (
              <TestBackCamera
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            5: (
              <TestFrontCamera
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            6: (
              <>
                <Title type="center">Test devices hardware?</Title>
                <Phone
                  width={widthPercentageToDP(30)}
                  height={widthPercentageToDP(30)}
                  style={{
                    marginVertical: `${base}%`,
                  }}
                />
              </>
            ),
            7: (
              <TestMicrophone
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            8: <TestSpeaker ref={speaker} />,
            9: <TestVibration ref={vibration} />,
            10: (
              <TestVolumeUpButton
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            11: (
              <TestVolumeDownButton
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
          }[step as 0 | 1 | 2]
        }
        {showBtn ? _renderBtn(step) : <View />}
      </Container>
    </ScrollView>
  );
};

const Option = styled(CheckBox).attrs(props => ({
  checkedIcon: <></>,
  uncheckedIcon: <></>,
  containerStyle: {
    paddingHorizontal: `${large}%`,
    backgroundColor: props.checked ? '#FFD9A2' : '#FFF',
    borderWidth: 2,
    borderColor: '#FFD9A2',
    borderRadius: 0,
    paddingBottom: `${small}%`,
  },
  textStyle: {
    ...getFontStyleObject({family: 'Lato', weight: 'Regular'}),
    color: !props.checked ? '#FFD9A2' : '#FFF',
    fontSize: 20,
    padding: `${small}%`,
  },
}))``;

const Title = styled(Text)`
  margin-vertical: ${base}%;
`;

const Container = styled.View`
  align-items: center;
  justify-content: space-between;
`;

const TestBackCamera = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    pendingText="Testing device back camera"
    failedText="Back Camera didn't worked"
    passText="Back Camera working fine"
    testSensor={() =>
      requestCameraPermission().then(() => {
        return CameraModule.isBackCameraWorking();
      })
    }
    iconType="font-awesome"
    iconName="camera"
    handleStatusChange={handleStatusChange}
  />
);

const TestFrontCamera = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    pendingText="Testing device front camera"
    failedText="Front Camera didn't worked"
    passText="Front Camera working fine"
    testSensor={async () => {
      try {
        await requestCameraPermission();
        const outcome = CameraModule.isFrontCameraWorking();
        return outcome;
      } catch (error) {
        handleStatusChange('errored');
      }
    }}
    iconType="font-awesome"
    iconName="camera"
    handleStatusChange={handleStatusChange}
  />
);

const TestMicrophone = ({
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
                AudioModule.stopRecording();
              }
            });
          } else if (event.eventProperty === 'NaN') {
            Alert.alert('Caught Error');
            AudioModule.stopRecording();
          }
        });
        AudioModule.testMicrophone();

        return eventEmitter.removeListener('micAudioChange', () => {});
      })
      .catch(() => handleStatusChange('failed'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    handleStatusChange('pending');
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
                pending:
                  'Testing Microphone! we are recording your voice samples so speak up',
                pass: 'Microphone is working fine',
                fail: 'Microphone is not working',
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

const TestCharging = ({
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

const TestVolumeUpButton = ({
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
      <View>
        {
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
        }
      </View>
      <TestingSpinner
        name="volume-up"
        type="font-awesome"
        status={sensorStatus}
      />
    </>
  );
};

const TestVolumeDownButton = ({
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

const TestSpeaker = React.forwardRef(({}, ref) => {
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
                ? 'yellow'
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

const TestVibration = React.forwardRef(({}, ref) => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');

  const [checked, setChecked] = React.useState(0);
  const [sound, setSound] = React.useState(2);
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
                ? 'yellow'
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

const TestBluetooth = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    testSensor={BluetoothModule.isBluetoothWorking}
    iconName="bluetooth-b"
    iconType="font-awesome"
    pendingText="Testing Bluetooth Sensor"
    passText="Bluetooth is working"
    failedText="Bluetooth is failed"
    handleStatusChange={handleStatusChange}
  />
);

const TestBattery = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    testSensor={() =>
      BatteryModule.getBatteryHealth().then(
        (status: string) => status === 'Good',
      )
    }
    iconName="md-battery-charging"
    iconType="ionicon"
    pendingText="Testing Device Battery"
    passText="Battery health is good"
    failedText="Failed to determine battery health"
    handleStatusChange={handleStatusChange}
  />
);

const BasicSensorTest = withTheme<{
  handleStatusChange: (x: any) => void;
  testSensor: () => Promise<boolean>;
  passText: string;
  failedText: string;
  pendingText: string;
  iconName: string;
  iconType: string;
}>(props => {
  const [sensorStatus, setSensorStatus] = React.useState('pending' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored');
  React.useEffect(() => {
    setTimeout(
      () =>
        props
          .testSensor()
          .then((status: boolean) => {
            if (status) setSensorStatus('pass');
            else setSensorStatus('fail');
          })
          .catch(() => setSensorStatus('errored')),
      2000,
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    props.handleStatusChange(sensorStatus);
  }, [sensorStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View>
        {
          <Text type="muted bold center">
            {
              {
                pending: props.pendingText,
                pass: props.passText,
                fail: props.failedText,
                errored: 'Testing Failed. You can skip the test for now',
              }[sensorStatus]
            }
          </Text>
        }
      </View>
      <TestingSpinner
        name={props.iconName}
        type={props.iconType}
        status={sensorStatus}
      />
    </>
  );
});

const TestingSpinner = withTheme<IconProps & {status: string}>(props => {
  const {theme, status, ...rest} = props;
  const [rotation] = React.useState(new Animated.Value(0));
  const rotationAngle = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotation]);
  React.useEffect(() => {
    if (status !== 'pending') {
      rotation.stopAnimation();
    }
  }, [rotation, status]);
  const color =
    status === 'pending'
      ? theme.colors.primary
      : status === 'pass'
      ? 'green'
      : 'red';
  return (
    <View>
      <Animated.View
        style={{
          transform: [{rotate: rotationAngle}],
        }}>
        <Icon name="spinner-3" type="evilicon" color={color} size={350} />
      </Animated.View>
      <Icon
        size={100}
        color={color}
        containerStyle={{
          position: 'absolute',
          top: 150,
          left: 175,
        }}
        iconStyle={{
          position: 'absolute',
        }}
        {...rest}
      />
    </View>
  );
});
