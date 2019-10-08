/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {SafeAreaView} from 'react-native';
import {
  ScrollView,
  Container,
  LogoContainer,
  InputAndButtonContainer,
  AppTitle,
  Subtitle,
} from './styles';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {Input} from 'react-native-elements';
import {EmailIcon, PasswordIcon} from '../../components/Icon/Login';
import {tinyIcon} from '../../components/Icon/common';

const Landing = () => {
  const {heightPercentageToDP, widthPercentageToDP} = useResponsiveHelper();
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Container style={[{height: heightPercentageToDP(100)}]}>
          <LogoContainer>
            <AppTitle style={[{fontSize: heightPercentageToDP(10)}]}>
              Tap2sell
            </AppTitle>
            <Subtitle>Sell Your Used Mobile Online for Instant Cash</Subtitle>
          </LogoContainer>
          <InputAndButtonContainer>
            <Input
              placeholder="Email"
              leftIcon={<EmailIcon size={widthPercentageToDP(tinyIcon)} />}
            />
            <Input
              placeholder="Password"
              leftIcon={<PasswordIcon size={widthPercentageToDP(tinyIcon)} />}
            />
            <Text type="bold primary small center">FORGOT PASSWORD?</Text>
          </InputAndButtonContainer>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Landing;
