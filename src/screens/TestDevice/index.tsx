import React from 'react';
import {ScrollView, View} from 'react-native';
import Phone from '../../assets/icons/smartphone.svg';
import {AppText as Text} from '../../components/common/AppText';
import {FlexButton, FullWidthButton} from '../../components/common/Buttons';
import {base, headerHeight} from '../../constants/Theme';
import {useNavigation} from '../../hooks/useNavigation';
import {Routes} from '../../router/routes';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {
  Container,
  DoesPhoneSwitchOn,
  Option,
  TestBackCamera,
  TestBattery,
  TestBluetooth,
  TestCharging,
  TestFrontCamera,
  TestMicrophone,
  TestSpeaker,
  TestVibration,
  TestVolumeDownButton,
  TestVolumeUpButton,
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
