import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {walkthroughable} from 'react-native-copilot';
import {
  Badge,
  Header as ElementsHeader,
  Icon,
  InputProps,
} from 'react-native-elements';
import {SharedElement} from 'react-native-motion';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {AppText as Text} from '../../components/common/AppText';
import {SearchBar} from '../../components/common/SearchBar';
import {smallIcon} from '../../components/Icon/common';
import {constant} from '../../Config';
import {base, headerHeight, large, small, xLarge} from '../../constants/Theme';
import {Routes} from '../../router/routes';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {IntroCarousal} from './components/IntroCarousal';
import {
  OfferCard,
  OfferCardScroll,
  OfferContainer,
  ScreenMainContainer,
} from './styles';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

export const Landing: React.FC<NavigationStackScreenProps> = props => {
  const {heightPercentageToDP} = useResponsiveHelper();
  const [searchText, setSearchText] = React.useState('');

  return (
    <ScrollView>
      <View style={[{minHeight: heightPercentageToDP(100)}]}>
        <ScreenMainContainer>
          <Text type="bold">Want to sell your gadget?</Text>
          <SharedElement id={constant.searchBarId}>
            <View>
              <AnimatedSearchBar
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search your device here..."
                onFocus={() =>
                  props.navigation.navigate(Routes.selectDevice, {
                    activateSearch: true,
                  })
                }
              />
            </View>
          </SharedElement>
          <IntroCarousal navigation={props.navigation} />
        </ScreenMainContainer>
        <OfferContainer>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text type="bold">Offers</Text>
            <Text type="bold primary small" style={{paddingEnd: `${base}%`}}>
              View All
            </Text>
          </View>
          <OfferCardScroll>
            <OfferListItems
              index={0}
              iconName="tag"
              text="This is the most the most exciting offer only for you grab this
                one."
            />
            <OfferListItems
              index={1}
              iconName="tag"
              text="This is the most the most exciting offer only for you grab this
                one."
            />
            <OfferListItems
              index={2}
              iconName="tag"
              text="This is the most the most exciting offer only for you grab this
                one."
            />
            <OfferListItems
              index={3}
              iconName="tag"
              text="This is the most the most exciting offer only for you grab this
                one."
            />
            <OfferListItems
              index={4}
              iconName="tag"
              text="This is the most the most exciting offer only for you grab this
                one."
            />
          </OfferCardScroll>
        </OfferContainer>
      </View>
    </ScrollView>
  );
};

const OfferListItems = ({
  index,
  iconName,
  iconType = 'antdesign',
  text,
}: {
  index: number;
  iconName: string;
  iconType?: string;
  text: string;
}) => {
  const {widthPercentageToDP} = useResponsiveHelper();
  return (
    <OfferCard index={index}>
      <Icon
        name={iconName}
        type={iconType}
        color="white"
        size={widthPercentageToDP(smallIcon)}
        containerStyle={{marginBottom: widthPercentageToDP(small + 1)}}
      />
      <Text type="white base bold-italic">{text}</Text>
    </OfferCard>
  );
};

export const Header = () => {
  return (
    <ElementsHeader
      containerStyle={{
        backgroundColor: `#fff`,
        height: headerHeight,
        paddingBottom: `${base}%`,
      }}
      leftComponent={
        <View
          style={{
            marginHorizontal: `${large}%`,
          }}>
          <Icon name="user" type="feather" />
        </View>
      }
      centerComponent={<Text type="header bold">Tap2sell</Text>}
      centerContainerStyle={{margin: `${small}%`}}
      rightComponent={
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: xLarge,
          }}>
          <Icon name="shopping-cart" type="feather" />

          <View style={{marginHorizontal: xLarge * 1.5}}>
            <Icon name="bell" type="feather" containerStyle={{}} />
            <Badge
              status="primary"
              containerStyle={{position: 'absolute', right: 0}}
            />
          </View>
        </View>
      }
    />
  );
};

export const AnimatedSearchBar = (props: InputProps) => {
  return <SearchBar {...props} />;
};
