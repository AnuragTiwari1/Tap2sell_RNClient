import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {SafeAreaView, View} from 'react-native';
import {
  ScrollView,
  Container,
  LogoContainer,
  InputAndButtonContainer,
  AppTitle,
  Subtitle,
  ForgotPassword,
} from './styles';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {Input, Button} from 'react-native-elements';
import {EmailIcon, PasswordIcon} from '../../components/Icon/Login';
import {tinyIcon} from '../../components/Icon/common';
import {useDimensions} from '../../Providers/DimensionProvider';
import Config from '../../Config';
import {base} from '../../constants/Theme';
import Logo from '../../assets/icons/search.svg';

const Login = ({setScreen}) => {
  const {heightPercentageToDP, widthPercentageToDP} = useResponsiveHelper();
  const {isLandscape} = useDimensions();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Container style={[{height: heightPercentageToDP(100)}]}>
          <LogoContainer>
            <AppTitle style={[{fontSize: heightPercentageToDP(10)}]}>
              Tap2sell
            </AppTitle>
            <Text type="muted center">
              <Subtitle>Sell Your Used</Subtitle>
              <Text>{isLandscape || Config.isTablet ? '\t' : '\n'}</Text>
              <Subtitle>Mobile Online for Instant Cash</Subtitle>
            </Text>
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
            <ForgotPassword type="bold primary small center">
              FORGOT PASSWORD?
            </ForgotPassword>
            <Button title="LOG IN" onPress={() => setScreen('landing')} />
            <Text
              type="muted center"
              style={{
                marginVertical: `${base}%`,
              }}>
              or connect with
            </Text>
            <View style={{alignItems: 'center', marginBottom: `${base}%`}}>
              <Logo width={120} height={40} />
            </View>
            <Text
              type="center"
              style={{
                marginBottom: `${base}%`,
              }}>
              I'll do it Later..
            </Text>
          </InputAndButtonContainer>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
