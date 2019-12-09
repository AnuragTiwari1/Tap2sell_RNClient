import React from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  NativeEventSubscription,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import Phone from '../../assets/icons/smartphone.svg';
import {AppText as Text} from '../../components/common/AppText';
import {
  FlexButton,
  FlexInvertedButton,
  FullWidthButton,
} from '../../components/common/Buttons';
import {base, borderRadius, small, Theme, xLarge} from '../../constants/Theme';
import {useNavigation} from '../../hooks/useNavigation';
import {IHealth, IPhoneAge} from '../../redux/device';
import {IStore} from '../../redux/store';
import {Routes} from '../../router/routes';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {
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
import {ISensorStatus} from './components/BasicSensorTest';
import {OptionContainer} from './components/common';

type ITestTypes =
  | 'switchOn'
  | 'age'
  | 'condition'
  | 'askForTest'
  | 'askUserForTest'
  | 'selectDocuments';

interface ISensorCardData {
  status?: 'working' | 'failed' | 'checked';
  iconName: string;
  iconFamily: string;
  sensorName: string;
}

const mapSensorStatusToHealth = (status: ISensorStatus): IHealth => {
  switch (status) {
    case 'pass':
      return 'working';
    case 'fail':
      return 'notWorking';
    default:
      return 'notTested';
  }
};

export const TestScreen = ({
  device,
  setDevice,
}: {
  device: any;
  setDevice: any;
}) => {
  const navigation = useNavigation<{step: ITestTypes}>();
  const backHandler = React.useRef<NativeEventSubscription | null>(null);
  React.useEffect(() => {
    backHandler.current = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackClick,
    );
    return () => {
      if (backHandler.current) backHandler.current.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBackClick = () => {
    if (navigation.isFocused()) {
      Alert.alert(
        'Exit Testing?',
        'All the progress will be lost. Do you want to continue?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate(Routes.selectDevice)},
        ],
        {cancelable: true},
      );
      return true;
    }
  };

  switch (navigation.getParam('step')) {
    case 'switchOn':
      return (
        <DoesPhoneSwitchOn
          onSuccess={() => navigation.push(Routes.testDevice, {step: 'age'})}
        />
      );
    case 'age':
      return (
        <SelectPhoneAge
          onSubmit={phoneAge => {
            setDevice({
              ...device,
              phoneAge,
            });
            navigation.push(Routes.testDevice, {step: 'askForTest'});
          }}
        />
      );

    case 'askForTest':
      return (
        <AskForTest
          onLastStep={() =>
            navigation.push(Routes.testDevice, {step: 'selectDocuments'})
          }
          onSkip={() =>
            navigation.push(Routes.testDevice, {step: 'askUserForTest'})
          }
          {...{device, setDevice}}
        />
      );
    case 'selectDocuments':
      return (
        <SelectDocuments
          onSubmit={() => {
            navigation.push(Routes.testDevice, {step: 'condition'});
          }}
          documents={device.documents}
          setDocuments={(name, status) => {
            setDevice({
              ...device,
              documents: {
                ...device.documents,
                [name]: status,
              },
            });
          }}
        />
      );
    case 'askUserForTest':
      return (
        <UserTest
          onSubmit={() =>
            navigation.push(Routes.testDevice, {step: 'selectDocuments'})
          }
        />
      );

    case 'condition':
      return (
        <SelectPhoneCondition
          onSubmit={condition => {
            setDevice({
              ...device,
              overallCondition: condition,
            });
            navigation.navigate(Routes.deviceReport);
          }}
        />
      );
    default:
      return (
        <DoesPhoneSwitchOn
          onSuccess={() => navigation.push(Routes.testDevice, {step: 'age'})}
        />
      );
  }
};

export default connect(
  (state: IStore) => ({
    device: state.deviceReducer,
  }),
  dispatch => ({
    setDevice: (payload: any) => {
      dispatch({type: 'setState', payload});
    },
  }),
)(TestScreen);

interface IDocument {
  iconName: string;
  iconType: string;
  checked: boolean;
  title: string;
  name: 'validBill' | 'charger' | 'warranty' | 'box';
}
const SelectDocuments = ({
  onSubmit,
  documents,
  setDocuments,
}: {
  onSubmit: (e: any) => void;
  documents: any;
  setDocuments: (name: string, status: boolean) => void;
}) => {
  const [lDocuments, setLDocuments] = React.useState<IDocument[]>([
    {
      iconName: 'file-document-box-multiple-outline',
      iconType: 'material-community',
      checked: documents.validBill,
      title: 'Valid Bill',
      name: 'validBill',
    },
    {
      iconName: 'usb',
      iconType: 'material-community',
      checked: documents.charger,
      title: 'Original Charger',
      name: 'charger',
    },
    {
      iconName: 'barcode-scan',
      iconType: 'material-community',
      checked: documents.warranty,
      title: 'Warranty',
      name: 'warranty',
    },
    {
      iconName: 'inbox',
      iconType: 'feather',
      checked: documents.box,
      title: 'Box',
      name: 'box',
    },
  ]);

  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>
      <Title type="center">Select all that you have</Title>
      <FlatList
        data={lDocuments}
        numColumns={2}
        renderItem={({item, index}) => (
          <DocumentCard
            onPress={() => {
              lDocuments[index].checked = !lDocuments[index].checked;
              setDocuments(lDocuments[index].name, lDocuments[index].checked);
              setLDocuments([...lDocuments]);
            }}
            {...item}
          />
        )}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />
      <FullWidthButton title="Next" onPress={onSubmit} />
    </ScrollView>
  );
};

const DocumentCard = ({
  iconName,
  iconType,
  title,
  checked,
  onPress,
}: IDocument & {onPress: (e: any) => void}) => {
  const color = !checked ? '#fff' : '#ffd9a2';
  const invertedColor = color === '#fff' ? '#ffd9a2' : '#fff';
  return (
    <StyledSensorCardContainer {...{onPress}}>
      <View style={{backgroundColor: color}}>
        <StyledIcon name={iconName} type={iconType} color={invertedColor} />
        <Text
          type="center bold"
          style={{
            marginVertical: `${xLarge}%`,
            color: invertedColor,
          }}>
          {title}
        </Text>
      </View>
    </StyledSensorCardContainer>
  );
};

const SelectPhoneAge = ({onSubmit}: {onSubmit: (e: IPhoneAge) => void}) => {
  const {widthPercentageToDP} = useResponsiveHelper();
  const [checked, setChecked] = React.useState<IPhoneAge>('0-3');

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}>
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
          title="0-3"
          checked={checked === '0-3'}
          center
          onPress={() => setChecked('0-3')}
        />
        <Option
          title="3-6"
          checked={checked === '3-6'}
          center
          onPress={() => setChecked('3-6')}
        />
        <Option
          title="6-11"
          checked={checked === '6-11'}
          center
          onPress={() => setChecked('6-11')}
        />
        <Option
          title="> 11"
          checked={checked === '11+'}
          center
          onPress={() => setChecked('11+')}
        />
      </OptionContainer>
      <FullWidthButton title="Next" onPress={() => onSubmit(checked)} />
    </ScrollView>
  );
};

const AskForTest = ({
  onLastStep,
  onSkip,
  device,
  setDevice,
}: {
  onLastStep: Function;
  onSkip: Function;
  device: any;
  setDevice: Function;
}) => {
  const {widthPercentageToDP} = useResponsiveHelper();
  const [step, setStep] = React.useState(0);
  const [sensorStatus, setSensorStatus] = React.useState<ISensorStatus>(
    'pending',
  );
  const [canSkip, setCanSkip] = React.useState(false);
  const btnText = sensorStatus === 'pending' && canSkip ? 'Skip' : 'Next';
  const isFirstRender = React.useRef(true);
  const speaker = React.useRef<any>();
  const vibration = React.useRef<any>();
  const showBtn =
    (sensorStatus === 'pending' && canSkip) ||
    sensorStatus === 'errored' ||
    sensorStatus === 'fail' ||
    step === 0;

  const _renderBtn = () => {
    switch (step) {
      case 7:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {sensorStatus === 'pending' ? (
              <FlexButton
                title="Test"
                onPress={() => {
                  const result =
                    !!speaker.current &&
                    typeof speaker.current.test === 'function' &&
                    speaker.current.test();
                  if (result) {
                    setDevice({
                      ...device,
                      functionalState: {
                        ...device.functionalState,
                        speaker: mapSensorStatusToHealth('pass'),
                      },
                    });
                    setSensorStatus('pass');
                  } else {
                    setDevice({
                      ...device,
                      functionalState: {
                        ...device.functionalState,
                        speaker: mapSensorStatusToHealth('fail'),
                      },
                    });
                    setSensorStatus('fail');
                  }
                }}
              />
            ) : (
              <></>
            )}
            <FlexInvertedButton
              title={btnText}
              onPress={() => setStep(step + 1)}
            />
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
                    setDevice({
                      ...device,
                      functionalState: {
                        ...device.functionalState,
                        vibration: mapSensorStatusToHealth('pass'),
                      },
                    });
                    setSensorStatus('pass');
                  } else {
                    setDevice({
                      ...device,
                      functionalState: {
                        ...device.functionalState,
                        vibration: mapSensorStatusToHealth('fail'),
                      },
                    });
                    setSensorStatus('fail');
                  }
                }}
              />
            ) : (
              <></>
            )}
            <FlexInvertedButton
              title={btnText}
              onPress={() => setStep(step + 1)}
            />
          </View>
        );
      case 0:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <FlexButton title="Test Now" onPress={() => setStep(step + 1)} />
            <FlexInvertedButton
              title="Skip"
              onPress={() => {
                Alert.alert(
                  'Skip Automated testing?',
                  'You should only skip test if app is not compatible to your phone. Do you want to continue?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => onSkip()},
                  ],
                  {cancelable: true},
                );
              }}
            />
          </View>
        );
      default:
        return (
          <>
            {sensorStatus !== 'pending' || canSkip ? (
              <FullWidthButton
                title={btnText}
                onPress={() => setStep(step + 1)}
              />
            ) : (
              <></>
            )}
          </>
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
    if (step === 11) onLastStep(); //will be last function executed so must be last step +1
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}>
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
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    bluetooth: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
          2: (
            <TestBattery
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    battery: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
          3: (
            <TestCharging
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    charging: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
          4: (
            <TestBackCamera
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    backCamera: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
          5: (
            <TestFrontCamera
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    frontCamera: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
          6: (
            <TestMicrophone
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    microphone: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
          7: <TestSpeaker ref={speaker} />,
          8: <TestVibration ref={vibration} />,
          9: (
            <TestVolumeUpButton
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    volumeUpButton: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
          10: (
            <TestVolumeDownButton
              handleStatusChange={status => {
                setDevice({
                  ...device,
                  functionalState: {
                    ...device.functionalState,
                    volumeDownButton: mapSensorStatusToHealth(status),
                  },
                });
                setSensorStatus(status);
              }}
            />
          ),
        }[step as 0 | 1 | 2]
      }
      {showBtn ? _renderBtn() : <View />}
    </ScrollView>
  );
};

const UserTest = ({onSubmit}: {onSubmit: (e: any) => void}) => {
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

      <FullWidthButton title="Next" onPress={onSubmit} />
    </View>
  );
};

const SensorCard = ({
  status,
  iconName,
  iconFamily,
  sensorName,
  onPress,
}: ISensorCardData & {
  onPress: (e: any) => void;
}) => {
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

const SelectPhoneCondition = ({onSubmit}: {onSubmit: (e: any) => void}) => {
  const [condition, setCondition] = React.useState('excellent');
  const initialData: IConditionObj[] = [
    {
      title: 'Excellent',
      subtitle: 'Just like a new ,Fully working, zero scratch',
      checked: true,
      condition: 'excellent',
    },
    {
      title: 'Good',
      subtitle: 'Minor marks and scratches,Fully working, no dent or crack',
      checked: false,
      condition: 'good',
    },
    {
      title: 'Average',
      subtitle: 'Major scratches on body, Display work properly',
      checked: false,
      condition: 'average',
    },
    {
      title: 'Below Average',
      subtitle: 'Heavy dents,crack and scratches on body',
      checked: false,
      condition: 'poor',
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
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({item, index}) => {
            return (
              <PhoneConditionCard
                {...item}
                onPress={() => {
                  const newData = data.map(e => ({...e, checked: false}));
                  newData[index].checked = true;
                  setCondition(newData[index].condition);
                  setData([...newData]);
                }}
              />
            );
          }}
        />
      </View>
      <FullWidthButton title="Finish" onPress={() => onSubmit(condition)} />
    </View>
  );
};

interface IConditionObj {
  title: string;
  subtitle: string;
  checked: boolean;
  condition: string;
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
