import React from 'react';
import {ScrollView, View, Linking} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Phone from '../../../assets/icons/smartphone.svg';
import {AppText as Text} from '../../../components/common/AppText';
import {FlexButton, FullWidthButton} from '../../../components/common/Buttons';
import {base, borderRadius, large} from '../../../constants/Theme';
import {useResponsiveHelper} from '../../../utils/styles/responsive';
import {Option, OptionContainer, Title} from './common';
import {useNavigation} from '../../../hooks/useNavigation';
import {Routes} from '../../../router/routes';
import Config from '../../../Config';

export const DoesPhoneSwitchOn = ({onSuccess}: {onSuccess: Function}) => {
  const {widthPercentageToDP} = useResponsiveHelper();
  const [checked, setChecked] = React.useState(1);
  const BottomSheet = React.useRef<null | RBSheet>(null);
  const {navigate} = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <Title>Does the phone switch on?</Title>
      <Phone
        width={widthPercentageToDP(30)}
        height={widthPercentageToDP(30)}
        style={{
          marginVertical: `${base}%`,
        }}
      />

      <OptionContainer>
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
      </OptionContainer>
      <FullWidthButton
        title="Next"
        onPress={() => {
          if (checked === 2) {
            !!BottomSheet.current && BottomSheet.current.open();
          } else onSuccess();
        }}
      />
      <RBSheet
        ref={ref => {
          BottomSheet.current = ref;
        }}
        animationType={'slide'}
        height={175}
        customStyles={{
          container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          },
        }}>
        <>
          <Text type="center" style={{paddingTop: `${large}%`}}>
            <Text type="large">No price for this phone</Text>
            <Text>{`\n`}but you can request a repair at our shop</Text>
          </Text>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text
                type="underline"
                onPress={() => navigate(`${Routes.landing}`)}>
                Go to Landing
              </Text>
            </View>

            <FlexButton
              title="Repair Now"
              onPress={() => {
                Linking.openURL(`tel:${Config.myPhone}`);
              }}
            />
          </View>
        </>
      </RBSheet>
    </ScrollView>
  );
};
