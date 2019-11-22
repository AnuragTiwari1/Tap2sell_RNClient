import React from 'react';
import {ScrollView, View} from 'react-native';
import Phone from '../../../assets/icons/smartphone.svg';
import {FullWidthButton} from '../../../components/common/Buttons';
import {base, headerHeight} from '../../../constants/Theme';
import {useResponsiveHelper} from '../../../utils/styles/responsive';
import {Container, Title, Option} from './common';

export const DoesPhoneSwitchOn = () => {
  const {widthPercentageToDP, heightPercentageToDP} = useResponsiveHelper();
  const [checked, setChecked] = React.useState(1);

  return (
    <ScrollView>
      <Container style={[{height: heightPercentageToDP(100) - headerHeight}]}>
        <Title>Does the phone switch on?</Title>
        <Phone
          width={widthPercentageToDP(30)}
          height={widthPercentageToDP(30)}
          style={{
            marginVertical: `${base}%`,
          }}
        />

        <View style={{marginTop: `${base}%`, flexDirection: 'row'}}>
          <Option
            title="Yes"
            checked={checked === 1}
            center
            onPress={() => setChecked(1)}
          />
          <Option
            title="No"
            checked={checked === 2}
            center
            onPress={() => setChecked(2)}
          />
        </View>
        <FullWidthButton title="Next" />
      </Container>
    </ScrollView>
  );
};
