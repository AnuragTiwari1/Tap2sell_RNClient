import React from 'react';
import {
  ScrollView,
  View,
  Animated,
  NativeEventEmitter,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {CheckBox, Icon, withTheme, IconProps} from 'react-native-elements';
import styled from 'styled-components/native';
import Phone from '../../assets/icons/smartphone.svg';
import {AppText as Text} from '../../components/common/AppText';
import {FullWidthButton} from '../../components/common/Buttons';
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
  /**
   * vibration test
   */
  // React.useEffect(() => {
  //   AudioModule.testVibration().then(console.log); //will always return 2
  // }, []);

  /**
   * volume button test
   */
  // React.useEffect(() => {
  //   const eventEmitter = new NativeEventEmitter(AudioModule);
  //   eventEmitter.addListener('buttonPress', event => {
  //     console.log(event.volumeUp, event.volumeDown);
  //   });
  // }, []);

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
  const [step, setStep] = React.useState(0);
  const [sensorStatus, setSensorStatus] = React.useState('willTest' as
    | 'pending'
    | 'pass'
    | 'fail'
    | 'errored'
    | 'willTest');
  const [canSkip, setCanSkip] = React.useState(false);
  const btnText = sensorStatus === 'pending' && canSkip ? 'Skip' : 'Next';
  const isFirstRender = React.useRef(true);

  const showBtn =
    (sensorStatus === 'pending' && canSkip) ||
    sensorStatus === 'errored' ||
    sensorStatus === 'willTest' ||
    sensorStatus === 'fail';

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
    if (sensorStatus === 'pass') setTimeout(() => setStep(step + 1), 3000);
  }, [sensorStatus, step]);

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
              <TestMicrophone
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
          }[step as 0 | 1 | 2]
        }
        {showBtn ? (
          <FullWidthButton title={btnText} onPress={() => setStep(step + 1)} />
        ) : (
          <View />
        )}
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
          console.log(event.eventProperty);
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
              } else handleStatusChange('pass');
            });
          }
        });
        AudioModule.testMicrophone();

        // BluetoothModule.isBluetoothHeadsetConnected().then(console.log);
        // AudioModule.testSpeaker().then(console.log);
      })
      .catch(() => handleStatusChange('failed'));
  }, [handleStatusChange]);

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

/**
 * battery test
 */
// React.useEffect(() => {
//   BatteryModule.getBatteryLevel().then(level => {
//     console.log(level); // between 0 and 1
//   });

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
  }, [props]);

  React.useEffect(() => {
    props.handleStatusChange(sensorStatus);
  }, [props, sensorStatus]);

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
