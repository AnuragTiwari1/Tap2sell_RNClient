import React from 'react';
// import {AppText as Text} from '../../components/common/AppText';
import {ScrollView, View} from 'react-native';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import styled from 'styled-components/native';
import {BackIcon, baseIcon} from '../../components/Icon/common';
import {SearchBar} from '../../components/common/SearchBar';
import {SharedElement} from 'react-native-motion';
import {constant} from '../../Config';
import {base} from '../../constants/Theme';

export const SelectDevices = (props: any) => {
  const {heightPercentageToDP, widthPercentageToDP} = useResponsiveHelper();
  const [searchText, setSearchText] = React.useState('');

  return (
    <ScrollView>
      <View style={[{minHeight: heightPercentageToDP(100)}]}>
        <SharedElement sourceId={constant.searchBarId}>
          <SearchContainer>
            <StyledBackIcon
              size={widthPercentageToDP(baseIcon)}
              onPress={() => props.navigation.goBack()}
            />
            <View style={{flex: 1}}>
              <SearchBar
                getFocus={props.navigation.getParam('activateSearch', false)}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search your device here..."
              />
            </View>
          </SearchContainer>
        </SharedElement>
      </View>
    </ScrollView>
  );
};

const StyledBackIcon = styled(BackIcon).attrs(props => ({
  containerStyle: {marginRight: props.theme.styled.spacing.tiny},
}))``;

const SearchContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding-horizontal: ${base}%;
  align-items: center;
`;
