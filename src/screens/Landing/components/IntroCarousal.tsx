import React from 'react';
import {AppText as Text} from '../../../components/common/AppText';
import {
  IntroContainer,
  CarousalContainer,
  ImageContainer,
  IconAssetsContainer,
  TextContainer,
  Image,
  StyledCarousel,
} from './IntroCarousalStyles';
import {Avatar, withTheme, ThemeProps} from 'react-native-elements';
import {View, TouchableOpacity} from 'react-native';
import {useResponsiveHelper} from '../../../utils/styles/responsive';
import Svg, {Line} from 'react-native-svg';
import Phone from '../../../assets/icons/smartphone.svg';
import Tablet from '../../../assets/icons/tablet.svg';
import Television from '../../../assets/icons/television.svg';
import {Pagination} from 'react-native-snap-carousel';
import {Routes} from '../../../router/routes';

interface ICardItem {
  title: string;
  body: string;
}
export const IntroCarousal = (props: any) => {
  const {widthPercentageToDP} = useResponsiveHelper();
  return (
    <IntroContainer>
      <Text type="bold">How it Works ?</Text>

      <MyCarousel
        data={[
          {
            title: 'Get Your Device Price',
            body: `We'll help you unlock the best selling price based on the present condition of your gadget and the current market price`,
          },
          {
            title: 'Schedule Free Pickup',
            body: `On accepting the price offered for your device, we'll arrange a free pick up`,
          },
          {
            title: 'Get Paid Instantly',
            body: `Instant Cash will be handed over to you at time of pickup or through payment mode of your choice`,
          },
        ]}
      />

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
          onIconClick={() => props.navigation.navigate(Routes.selectBrand)}
        />
        <Gadget
          name="Tablet"
          svgIcon={
            <Tablet
              width={widthPercentageToDP(10)}
              height={widthPercentageToDP(10)}
            />
          }
          onIconClick={() => props.navigation.navigate(Routes.selectBrand)}
        />
        <Gadget
          name="Television"
          svgIcon={
            <Television
              width={widthPercentageToDP(10)}
              height={widthPercentageToDP(10)}
            />
          }
          onIconClick={() => props.navigation.navigate(Routes.selectBrand)}
        />
      </ImageContainer>
    </IntroContainer>
  );
};

const MyCarousel = ({data}: {data: ICardItem[]}) => {
  const [index, setIndex] = React.useState(0);
  const _renderItem = ({item}: {item: ICardItem}) => {
    return (
      <TextContainer>
        <Text type="bold white header">{item.title}</Text>
        <Text type="white bold base">{item.body}</Text>
      </TextContainer>
    );
  };

  return (
    <>
      <CarousalContainer>
        <View style={{flexDirection: 'row'}}>
          <IconAssets index={index} />
          <StyledCarousel
            data={data}
            renderItem={_renderItem}
            onSnapToItem={setIndex}
          />
        </View>
        <Pagination
          dotsLength={3}
          activeDotIndex={index}
          containerStyle={{
            width: 36,
            height: 15,
            paddingVertical: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </CarousalContainer>
    </>
  );
};

const IconAssets = withTheme(
  (props: {index: number} & Partial<ThemeProps<any>>) => {
    const {widthPercentageToDP} = useResponsiveHelper();
    const {primary} = props.theme.colors || {primary: 'green'};
    const icons = ['rupee', 'shopping-cart', 'money'];

    return (
      <IconAssetsContainer>
        <Avatar
          rounded
          overlayContainerStyle={{
            backgroundColor: primary,
          }}
          icon={{
            name: `${icons[props.index % icons.length]}`,
            type: 'font-awesome',
            color: 'white',
            size: widthPercentageToDP(8),
          }}
          size={widthPercentageToDP(12)}
        />
        <Svg width="8" height="100">
          <Line
            x1="0"
            y1="15"
            x2="0"
            y2="85"
            stroke="#FDFDFD"
            strokeWidth="7"
          />
        </Svg>
      </IconAssetsContainer>
    );
  },
);

const Gadget = ({
  name,
  svgIcon,
  onIconClick,
}: {
  name: string;
  svgIcon: any;
  onIconClick: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
      onPress={onIconClick}>
      <Image>{svgIcon}</Image>
      <Text type="small center">{name}</Text>
    </TouchableOpacity>
  );
};
