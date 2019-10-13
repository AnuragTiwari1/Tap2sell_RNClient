import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {View, ScrollView} from 'react-native';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {HeaderContainer, ScreenMainContainer, OfferContainer} from './styles';
import {SearchBar} from '../../components/common/SearchBar';
import {InputProps} from 'react-native-elements';

export const Landing = () => {
  const {heightPercentageToDP} = useResponsiveHelper();
  const [searchText, setSearchText] = React.useState('');

  return (
    <ScrollView>
      <View style={[{height: heightPercentageToDP(100)}]}>
        <Header />
        <ScreenMainContainer>
          <Text type="bold">Want to sell your gadget?</Text>
          <AnimatedSearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search your device here..."
          />
        </ScreenMainContainer>
        <OfferContainer />
      </View>
    </ScrollView>
  );
};

const Header = () => {
  return (
    <HeaderContainer>
      <Text type="header bold">Tap2sell</Text>
    </HeaderContainer>
  );
};

const AnimatedSearchBar = (props: InputProps) => {
  return <SearchBar {...props} />;
};
