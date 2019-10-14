import React from 'react';
import {AppText as Text} from '../../../components/common/AppText';
import {
  IntroContainer,
  CarousalContainer,
  ImageContainer,
  CarousalCard,
  IconAssetsContainer,
  TextContainer,
  Image,
} from './IntroCarousalStyles';
import {Avatar} from 'react-native-elements';
import {View} from 'react-native';
import {useResponsiveHelper} from '../../../utils/styles/responsive';
import Svg, {Line} from 'react-native-svg';
import Phone from '../../../assets/icons/smartphone.svg';
import Tablet from '../../../assets/icons/tablet.svg';
import Television from '../../../assets/icons/television.svg';

export const IntroCarousal = () => {
  const {widthPercentageToDP} = useResponsiveHelper();
  return (
    <IntroContainer>
      <Text type="bold">How it Works ?</Text>
      <CarousalContainer>
        <CarousalCard>
          <IconAssets />
          <TextContainer>
            <Text type="bold dullWhite header">Get Your Device Price</Text>
            <Text type="dullWhite base">
              We'll help you unlock the best selling price based on the present
              condition of your gadget and the current market price
            </Text>
          </TextContainer>
        </CarousalCard>
      </CarousalContainer>

      <Text type="bold">Sell Your Gadgets</Text>
      <ImageContainer>
        <Gadget
          name="Smartphone"
          svgIcon={
            <Phone
              width={widthPercentageToDP(10)}
              height={widthPercentageToDP(10)}
            />
          }
        />
        <Gadget
          name="Tablet"
          svgIcon={
            <Tablet
              width={widthPercentageToDP(10)}
              height={widthPercentageToDP(10)}
            />
          }
        />
        <Gadget
          name="Television"
          svgIcon={
            <Television
              width={widthPercentageToDP(10)}
              height={widthPercentageToDP(10)}
            />
          }
        />
      </ImageContainer>
    </IntroContainer>
  );
};

const IconAssets = () => {
  const {widthPercentageToDP} = useResponsiveHelper();
  return (
    <IconAssetsContainer>
      <Avatar rounded size={widthPercentageToDP(12)} />
      <Svg width="8" height="100">
        <Line x1="0" y1="15" x2="0" y2="85" stroke="#DEDEDE" strokeWidth="7" />
      </Svg>
    </IconAssetsContainer>
  );
};

const Gadget = ({name, svgIcon}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Image>{svgIcon}</Image>
      <Text type="small center">{name}</Text>
    </View>
  );
};
