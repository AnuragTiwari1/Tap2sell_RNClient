import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import styled from 'styled-components/native';
import Phone from '../../assets/icons/smartphone.svg';
import {AppText as Text} from '../../components/common/AppText';
import {FlexButton, FullWidthButton} from '../../components/common/Buttons';
import {
  base,
  borderRadius,
  headerHeight,
  small,
  Theme,
  xLarge,
} from '../../constants/Theme';
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
import {OptionContainer} from './components/common';

type ITestTypes =
  | 'switchOn'
  | 'age'
  | 'condition'
  | 'askForTest'
  | 'askUserForTest';

interface ISensorCardData {
  status?: 'working' | 'failed' | 'checked';
  iconName: string;
  iconFamily: string;
  sensorName: string;
}

export const TestScreen = () => {
  const navigation = useNavigation<{step: ITestTypes}>();

  switch (navigation.getParam('step')) {
    case 'switchOn':
      return (
        <DoesPhoneSwitchOn
          onSuccess={() =>
            navigation.navigate(Routes.testDevice, {step: 'age'})
          }
        />
      );
    case 'age':
      return (
        <SelectPhoneAge
          onSubmit={() => {
            navigation.navigate(Routes.testDevice, {step: 'askForTest'});
          }}
        />
      );

    case 'askForTest':
      return (
        <AskForTest
          onLastStep={() =>
            navigation.navigate(Routes.testDevice, {step: 'age'})
          }
        />
      );
    case 'askUserForTest':
      return <UserTest />;
    default:
      return (
        // <AskForTest
        //   onLastStep={() =>
        //     navigation.navigate(Routes.testDevice, {step: 'age'})
        //   }
        // />
        // <SelectPhoneAge />
        <SelectPhoneCondition />
        // <UserTest />
      );
    // return <DoesPhoneSwitchOn />;
  }
};

const SelectPhoneAge = ({onSubmit}: {onSubmit: () => void}) => {
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
        <OptionContainer>
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
        </OptionContainer>
        <FullWidthButton title="Next" onPress={onSubmit} />
      </Container>
    </ScrollView>
  );
};

const AskForTest = ({onLastStep}: {onLastStep: () => void}) => {
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

const UserTest = () => {
  const initialData: ISensorCardData[] = [
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'wifi',
      status: 'failed',
    },
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'bluetooth',
      status: 'working',
    },
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'gps',
      status: 'working',
    },
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'touch',
      status: 'failed',
    },
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'button',
    },
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'camera',
    },
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'bluetooth',
      status: 'working',
    },
    {
      iconName: 'wifi',
      iconFamily: 'feather',
      sensorName: 'gps',
      status: 'working',
    },
  ];

  const [data, setData] = React.useState(initialData);
  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: `${xLarge}%`}}
          data={data}
          numColumns={2}
          ListHeaderComponent={
            <View style={{backgroundColor: '#fff'}}>
              <Title type="center">
                Select all that do<Text type="bold"> NOT </Text>work
              </Title>
            </View>
          }
          keyExtractor={(item, index) => `${item.sensorName}-${index}`}
          renderItem={({item, index}) => {
            return (
              <SensorCard
                {...item}
                onPress={() => {
                  data[index].status =
                    data[index].status === 'checked' ? undefined : 'checked';
                  setData([...data]);
                }}
              />
            );
          }}
        />
      </View>

      <FullWidthButton title="Next" />
    </View>
  );
};

interface ISensorCardProps extends ISensorCardData {
  onPress: Function;
}

const SensorCard = ({
  status,
  iconName,
  iconFamily,
  sensorName,
  onPress,
}: ISensorCardProps) => {
  const color = !status || status === 'working' ? '#fff' : '#ffd9a2';
  const invertedColor = color === '#fff' ? '#ffd9a2' : '#fff';
  return (
    <StyledSensorCardContainer
      style={[{backgroundColor: color}]}
      disabled={status === 'working' || status === 'failed'}
      onPress={onPress}>
      {status === 'working' || status === 'failed' ? (
        <View
          style={[
            styles.sensorStatusTextContainer,
            {backgroundColor: status === 'working' ? '#efefef' : '#fff'},
          ]}>
          <Text
            type="small"
            style={{
              color: status === 'working' ? Theme.basic.colors.primary : 'red',
              paddingVertical: `${small}%`,
            }}>
            {status}
          </Text>
        </View>
      ) : (
        <Text />
      )}
      <StyledIcon name={iconName} type={iconFamily} color={invertedColor} />
      <Text
        type="center bold"
        style={{
          marginVertical: `${xLarge}%`,
          color: invertedColor,
        }}>
        {sensorName}
      </Text>
    </StyledSensorCardContainer>
  );
};
const StyledSensorCardContainer = styled.TouchableOpacity`
  border-width: 2;
  border-color: #ffd9a2;
  flex: 1;
  margin: ${small}%;
  border-radius: ${borderRadius};
`;

const StyledIcon = styled(Icon).attrs(() => ({
  size: 60,
  containerStyle: {
    paddingHorizontal: `${base}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: `${small}%`,
  },
}))``;

const styles = StyleSheet.create({
  sensorStatusTextContainer: {
    borderRadius: 3 * borderRadius,
    margin: `${small}%`,
    paddingHorizontal: `${xLarge}%`,
    alignSelf: 'flex-end',
  },
});

const SelectPhoneCondition = () => {
  const initialData: IConditionObj[] = [
    {
      title: 'Excellent',
      subtitle: 'Just like a new ,Fully working, zero scratch',
      checked: true,
    },
    {
      title: 'Good',
      subtitle: 'Minor marks and scratches,Fully working, no dent or crack',
      checked: false,
    },
    {
      title: 'Average',
      subtitle: 'Major scratches on body, Display work properly',
      checked: false,
    },
    {
      title: 'Below Average',
      subtitle: 'Heavy dents,crack and scratches on body',
      checked: false,
    },
  ];
  const [data, setData] = React.useState(initialData);
  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: `${base}%`}}
          data={data}
          ListHeaderComponent={
            <View style={{backgroundColor: '#fff'}}>
              <Title type="center">Select your phone Condition</Title>
            </View>
          }
          keyExtractor={(item, index) => `${item.sensorName}-${index}`}
          renderItem={({item, index}) => {
            return (
              <PhoneConditionCard
                {...item}
                onPress={() => {
                  const newData = data.map(e => ({...e, checked: false}));
                  newData[index].checked = newData[index].checked
                    ? false
                    : true;
                  setData([...newData]);
                }}
              />
            );
          }}
        />
      </View>
      <FullWidthButton title="Finish" />
    </View>
  );
};

interface IConditionObj {
  title: string;
  subtitle: string;
  checked: boolean;
}

const PhoneConditionCard = ({
  title,
  subtitle,
  checked,
  onPress,
}: IConditionObj & {onPress: (e: any) => void}) => {
  const color = checked ? '#fff' : '#ffd9a2';
  const invertedColor = color === '#fff' ? '#ffd9a2' : '#fff';
  return (
    <StyledConditionCardContainer
      style={[{backgroundColor: invertedColor}]}
      onPress={onPress}>
      <Text type="bold" style={{color, marginBottom: `${small}%`}}>
        {title}
      </Text>
      <Text type="base" style={{color}}>
        {subtitle}
      </Text>
    </StyledConditionCardContainer>
  );
};

const StyledConditionCardContainer = styled(StyledSensorCardContainer)`
  padding: ${base}%;
`;
