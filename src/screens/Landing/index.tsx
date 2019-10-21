import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {View, ScrollView} from 'react-native';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {
  HeaderContainer,
  ScreenMainContainer,
  OfferContainer,
  OfferCardScroll,
  OfferCard,
} from './styles';
import {SearchBar} from '../../components/common/SearchBar';
import {InputProps, Icon} from 'react-native-elements';
import {IntroCarousal} from './components/IntroCarousal';
import {base, small} from '../../constants/Theme';
import {smallIcon} from '../../components/Icon/common';
import {constant} from '../../Config';
import {SharedElement} from 'react-native-motion';
import {Routes} from '../../router/routes';
import {NavigationStackScreenProps} from 'react-navigation-stack';

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
    <HeaderContainer>
      <Text type="header bold">Tap2sell</Text>
    </HeaderContainer>
  );
};

export const AnimatedSearchBar = (props: InputProps) => {
  return <SearchBar {...props} />;
};
