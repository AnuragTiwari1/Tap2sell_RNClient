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

const Landing = () => {
  const {heightPercentageToDP, widthPercentageToDP} = useResponsiveHelper();
  return (
    <>
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
                placeholder="INPUT WITH ICON"
                leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
              />
            </InputAndButtonContainer>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Landing;
