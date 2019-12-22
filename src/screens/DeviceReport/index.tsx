import React from 'react';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import {AppText as Text} from '../../components/common/AppText';
import {
  base,
  borderRadius,
  large,
  small,
  tiny,
  Theme,
} from '../../constants/Theme';
import {Icon} from 'react-native-elements';
import {FlexButton, FlexInvertedButton} from '../../components/common/Buttons';
import {useNavigation} from '../../hooks/useNavigation';
import {Routes} from '../../router/routes';
import {connect} from 'react-redux';
import {IStore} from '../../redux/store';
import {
  IDeviceState,
  IGeneralDetails,
  IFunctionalState,
  IPhoneAge,
  ICondition,
  conditionText,
} from '../../redux/device';

export const DeviceReport = ({device}: {device: IDeviceState}) => {
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text type="center">Your Phone's Condition Report</Text>
        <Text style={{marginTop: `${small}%`}} type="center primary large">
          Get ₹5000/- Now
        </Text>
        {!!device.generalDetails && <Overview data={device.generalDetails} />}
        <Functional data={device.functionalState} />
        <PhoneAge data={device.phoneAge} />
        <OverallCondition data={device.overallCondition} />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '4%',
        }}>
        <FlexInvertedButton
          title="Re-evaluate"
          onPress={() => {
            navigate(Routes.testDevice, {step: 'switchOn'});
          }}
        />
        <FlexButton
          title="Proceed"
          onPress={() => navigate(Routes.createProfile)}
        />
      </View>
    </View>
  );
};

const Overview = ({data}: {data: IGeneralDetails}) => {
  const {name, imgUrl, ...rest} = data;
  return (
    <>
      <Title>Overview</Title>
      <BaseContainer>
        <TextContainer>
          <StyledImage
            source={{
              uri: imgUrl,
            }}
            resizeMode="center"
          />
          <Text style={{marginVertical: `${base}%`, width: '50%'}}>{name}</Text>
        </TextContainer>
        {Object.keys(rest).map((e, i) => (
          <TextContainer key={i}>
            <StatusTitle>{e}</StatusTitle>
            <Text type="muted">{rest[e]}</Text>
          </TextContainer>
        ))}
      </BaseContainer>
    </>
  );
};

const Functional = ({data}: {data: IFunctionalState}) => {
  return (
    <>
      <Title>Functional Condition</Title>
      <BaseContainer style={[{paddingTop: `${base}%`}]}>
        {Object.keys(data).map((e, i) => (
          <TextContainer key={i}>
            <StatusTitle>{e}</StatusTitle>
            {data[e] !== 'notWorking' ? <CheckedIcon /> : <CloseIcon />}
          </TextContainer>
        ))}
      </BaseContainer>
    </>
  );
};

const PhoneAge = ({data}: {data: IPhoneAge}) => {
  return (
    <>
      <Title>Phone Age</Title>
      <BaseContainer style={[{paddingTop: `${base}%`}]}>
        <TextContainer>
          <StatusTitle>Age</StatusTitle>
          <Text type="muted">{data} Months</Text>
        </TextContainer>
      </BaseContainer>
    </>
  );
};

const OverallCondition = ({data}: {data: ICondition}) => {
  return (
    <>
      <Title>Overall Condition</Title>
      <BaseContainer style={[{paddingTop: `${base}%`}]}>
        <TextContainer>
          <StatusTitle style={{flex: 1, textTransform: 'capitalize'}}>
            {data !== 'poor' ? data : 'Below Average'}
          </StatusTitle>
          <Text style={{flex: 2}} type="muted">
            {conditionText[data]}
          </Text>
        </TextContainer>
      </BaseContainer>
    </>
  );
};

const StyledImage = styled.Image`
  height: ${props => props.theme.styled.specification.deviceLogoHeight};
  width: 10%;
  margin-horizontal: ${base}%;
`;

const Title = styled(Text)`
  margin-top: ${large}%;
  margin-horizontal: ${base}%;
`;

const BaseContainer = styled.View`
  background-color: #f8f8f8;
  padding-horizontal: ${small}%;
  padding-vertical: ${tiny}%;
  margin-horizontal: ${base}%;
  margin-vertical: ${tiny}%;
  border-radius: ${borderRadius};
`;

const TextContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const StatusTitle = styled(Text)`
  text-transform: capitalize;
  margin-bottom: ${base}%};
`;

const CloseIcon = styled(Icon).attrs(() => ({
  name: 'closecircleo',
  type: 'antdesign',
  color: 'red',
}))``;

const CheckedIcon = styled(Icon).attrs(() => ({
  name: 'checkcircleo',
  type: 'antdesign',
  color: Theme.basic.colors.primary,
}))``;

export default connect((state: IStore) => ({
  device: state.deviceReducer,
}))(DeviceReport);
