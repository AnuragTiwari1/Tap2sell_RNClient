import React from 'react';
import {ScrollView, View} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import styled from 'styled-components/native';
import {base, small, Theme, large} from '../../constants/Theme';
import {getFontStyleObject} from '../../utils/styles/fonts';
import {AppText as Text} from '../../components/common/AppText';
import {Option} from '../TestDevice/components';
import {FullWidthButton} from '../../components/common/Buttons';
import LottieView from 'lottie-react-native';
import {useNavigation} from '../../hooks/useNavigation';
import {Routes} from '../../router/routes';

export const CreateProfile = () => {
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: `${base}%`}}>
        <FormInput
          label="First Name"
          autoCompleteType="name"
          placeholder="enter your first name"
        />
        <FormInput label="Last Name" placeholder="enter your last name" />
        <FormInput
          label="Phone Number"
          placeholder="enter your phone number"
          keyboardType="phone-pad"
          autoCompleteType="tel"
        />
        <FormInput
          label="Email Address"
          placeholder="enter your email"
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <FormInput
          label="Address"
          placeholder="enter your address"
          autoCompleteType="street-address"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
        <FormInput
          label="Postal Code"
          placeholder="enter your pin-code"
          autoCompleteType="postal-code"
        />
      </ScrollView>
      <FullWidthButton
        title="Save & Proceed"
        onPress={() => navigate(Routes.schedulePickup)}
      />
    </View>
  );
};

export const SchedulePickup = () => {
  const [isEditingAddress, setEditingAddress] = React.useState(false);
  const addressInput = React.useRef<Input | null | undefined>();

  const {navigate} = useNavigation();

  React.useEffect(() => {
    if (isEditingAddress && addressInput.current) addressInput.current.focus();
  }, [isEditingAddress]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <ScrollView contentContainerStyle={{padding: `${base}%`}}>
        <Text type="center bold">Schedule free pick-up for your phone</Text>
        <View
          style={{flexDirection: 'row', width: '95%', marginTop: `${base}%`}}>
          <FormInput
            label="Address"
            ref={ref => (addressInput.current = ref)}
            placeholder="enter your address"
            autoCompleteType="street-address"
            multiline
            disabled={!isEditingAddress}
            numberOfLines={3}
            textAlignVertical="top"
            value="Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, behind Rosary school, Bangalore,India"
          />
          <EditIcon
            onPress={() => {
              setEditingAddress(!isEditingAddress);
            }}
          />
        </View>

        <SelectDateOption option={['today', 'tomorrow']} />
        <SelectTimeOption option={['9-12', '12-3', '3-6']} />
      </ScrollView>
      <FullWidthButton
        title="Schedule Now"
        onPress={() => navigate(Routes.congo)}
      />
    </View>
  );
};

const SelectDateOption = ({option}: {option: string[]}) => {
  const [check, setCheck] = React.useState(0);
  return (
    <View style={{marginTop: `${base}%`}}>
      <Text type="label bold">Select Pickup Date</Text>
      <View style={{flexDirection: 'row'}}>
        {option.map((e, i) => (
          <StyledOption
            key={i}
            title={e}
            center
            checked={check === i}
            onPress={() => setCheck(i)}
          />
        ))}
      </View>
    </View>
  );
};

const SelectTimeOption = ({option}: {option: string[]}) => {
  const [check, setCheck] = React.useState(0);
  return (
    <View style={{marginTop: `${base}%`}}>
      <Text type="label bold">Select Time Slot</Text>
      <View style={{flexDirection: 'row'}}>
        {option.map((e, i) => (
          <StyledOption
            key={i}
            title={e}
            center
            checked={check === i}
            onPress={() => setCheck(i)}
          />
        ))}
      </View>
    </View>
  );
};

const StyledOption = styled(Option).attrs(props => ({
  containerStyle: {
    borderColor: props.theme.basic.colors.primary,
    backgroundColor: props.checked ? props.theme.basic.colors.primary : '#FFF',
    paddingVertical: `${small}%`,
  },
  textStyle: {
    ...getFontStyleObject({family: 'Lato', weight: 'Regular'}),
    color: !props.checked ? props.theme.basic.colors.primary : '#FFF',
    fontSize: 16,
  },
}))``;

const EditIcon = styled(Icon).attrs(() => ({
  name: 'edit',
  type: 'feather',
  color: Theme.basic.colors.primary,
  containerStyle: {
    marginTop: `${base}%`,
  },
}))``;

const FormInput = styled(Input).attrs(() => ({
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  inputStyle: {
    marginTop: 0,
    marginBottom: 0,
    minHeight: 40,
    ...getFontStyleObject(),
  },
  leftIconContainerStyle: {
    marginLeft: `${small}%`,
    marginRight: `${small}%`,
  },
  containerStyle: {
    marginVertical: `${small}%`,
    paddingHorizontal: 0,
  },
  labelStyle: {
    color: '#000',
    ...getFontStyleObject({family: 'Lato', weight: 'Bold'}),
  },
}))``;

export const CongoScreen = () => {
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={{marginTop: `${large}%`}} type="large primary bold">
        Pick-Up Scheduled
      </Text>
      <LottieView
        source={require('../../assets/animation/29-motorcycle.json')}
        autoPlay
        loop
        style={{marginHorizontal: '10%', width: '70%', height: '75%'}}
      />
      <FullWidthButton
        title="Back to Home"
        onPress={() => navigate(Routes.landing)}
      />
    </View>
  );
};
