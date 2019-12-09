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

export const DeviceReport = () => {
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text type="center">Your Phone's Condition Report</Text>
        <Text style={{marginTop: `${small}%`}} type="center primary large">
          Get ₹5000/- Now
        </Text>
        <Overview />
        <Functional />
        <PhoneAge />
        <OverallCondition />
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

const Overview = () => {
  const status: Record<string, string> = {
    ram: '4GB',
    storage: '32GB',
    'android version': '9',
  };
  return (
    <>
      <Title>Overview</Title>
      <BaseContainer>
        <TextContainer>
          <StyledImage
            source={{
              uri:
                'https://rukminim1.flixcart.com/image/312/312/jp02t8w0/mobile/z/z/e/asus-zenfone-max-m2-zb632kl-4a004in-original-imafbcafmv6tgqjz.jpeg?q=70',
            }}
            resizeMode="center"
          />
          <Text style={{marginVertical: `${base}%`, width: '50%'}}>
            Asus zenfone max pro m2
          </Text>
        </TextContainer>
        {Object.keys(status).map((e, i) => (
          <TextContainer key={i}>
            <StatusTitle>{e}</StatusTitle>
            <Text type="muted">{status[e]}</Text>
          </TextContainer>
        ))}
      </BaseContainer>
    </>
  );
};

const Functional = () => {
  const status: Record<string, boolean> = {
    'touch display': true,
    'front camera': true,
    'back camera': true,
    wifi: true,
    bluetooth: false,
  };

  return (
    <>
      <Title>Functional Condition</Title>
      <BaseContainer style={[{paddingTop: `${base}%`}]}>
        {Object.keys(status).map((e, i) => (
          <TextContainer key={i}>
            <StatusTitle>{e}</StatusTitle>
            {status[e] ? <CheckedIcon /> : <CloseIcon />}
          </TextContainer>
        ))}
      </BaseContainer>
    </>
  );
};

const PhoneAge = () => {
  return (
    <>
      <Title>Phone Age</Title>
      <BaseContainer style={[{paddingTop: `${base}%`}]}>
        <TextContainer>
          <StatusTitle>Age</StatusTitle>
          <Text type="muted">11+ Years</Text>
        </TextContainer>
      </BaseContainer>
    </>
  );
};

const OverallCondition = () => {
  return (
    <>
      <Title>Overall Condition</Title>
      <BaseContainer style={[{paddingTop: `${base}%`}]}>
        <TextContainer>
          <StatusTitle style={{flex: 1}}>Excellent</StatusTitle>
          <Text style={{flex: 2}} type="muted">
            Just like a new ,Fully working, zero scratch
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

export default DeviceReport;
