import React from 'react';
import {NativeEventEmitter, ScrollView, View} from 'react-native';
import Phone from '../../assets/icons/smartphone.svg';
import {AppText as Text} from '../../components/common/AppText';
import {FlexButton, FullWidthButton} from '../../components/common/Buttons';
import {base, headerHeight} from '../../constants/Theme';
import {useNavigation} from '../../hooks/useNavigation';
import {AudioModule, BatteryModule} from '../../NativeModules';
import {Routes} from '../../router/routes';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {
  Container,
  DoesPhoneSwitchOn,
  Option,
  TestBackCamera,
  TestBattery,
  TestBluetooth,
  TestFrontCamera,
  TestingSpinner,
  TestMicrophone,
  TestSpeaker,
  TestVibration,
  Title,
} from './components';

type ITestTypes =
  | 'switchOn'
  | 'age'
  | 'condition'
  | 'askForTest'
  | 'testBluetooth';

export const TestScreen = () => {
  const navigation = useNavigation<{step: ITestTypes}>();

  switch (navigation.getParam('step')) {
    case 'switchOn':
      return <DoesPhoneSwitchOn />;
    case 'age':
      return <SelectPhoneAge />;

    case 'askForTest':
      return (
        <AskForTest
          onLastStep={() =>
            navigation.navigate(Routes.testDevice, {step: 'age'})
          }
        />
      );
    default:
      return (
        <AskForTest
          onLastStep={() =>
            navigation.navigate(Routes.testDevice, {step: 'age'})
          }
        />
      );
    // return <DoesPhoneSwitchOn />;
  }
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

const AskForTest = ({onLastStep}) => {
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
  const speaker = React.useRef();
  const vibration = React.useRef();
  const showBtn =
    (sensorStatus === 'pending' && canSkip) ||
    sensorStatus === 'errored' ||
    sensorStatus === 'willTest' ||
    sensorStatus === 'fail';

  const _renderBtn = () => {
    switch (step) {
      case 7:
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

      case 8:
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
    if (sensorStatus === 'pass') {
      setTimeout(() => setStep(step + 1), 1500);
    }
  }, [sensorStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (step === 10) onLastStep();
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Container
        style={[
          {
            height: heightPercentageToDP(100) - headerHeight,
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        {
          {
            0: (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Title type="center">Test devices hardware?</Title>
                </View>
                <View style={{flex: 2}}>
                  <Phone
                    width={widthPercentageToDP(30)}
                    height={widthPercentageToDP(30)}
                    style={{
                      marginVertical: `${base}%`,
                    }}
                  />
                </View>
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
            7: <TestSpeaker ref={speaker} />,
            8: <TestVibration ref={vibration} />,
            9: (
              <TestVolumeUpButton
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
            10: (
              <TestVolumeDownButton
                handleStatusChange={status => setSensorStatus(status)}
              />
            ),
          }[step as 0 | 1 | 2]
        }
        {showBtn ? _renderBtn() : <View />}
      </Container>
    </ScrollView>
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
