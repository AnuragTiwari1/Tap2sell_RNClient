import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {SharedElement} from 'react-native-motion';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import styled from 'styled-components/native';
import {AppText as Text} from '../../components/common/AppText';
import {SearchBar} from '../../components/common/SearchBar';
import {constant} from '../../Config';
import {base} from '../../constants/Theme';
import {useNavigation} from '../../hooks/useNavigation';
import {Routes} from '../../router/routes';
import {ScreenMainContainer} from '../Landing/styles';

export const SelectBrand: React.FC<
  NavigationStackScreenProps<{activeSearch: boolean}>
> = (props: any) => {
  const [searchText, setSearchText] = React.useState('');
  return (
    <ScrollView stickyHeaderIndices={[2]}>
      <Headline type="bold center xLarge" style={{fontWeight: '900'}}>
        Choose Your Brand
      </Headline>
      <SearchText type="center">What'd you like to choose ?</SearchText>
      <SharedElement id={constant.searchBarId}>
        <View style={{marginHorizontal: `${base}%`}}>
          <SearchBar
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
      <ScreenMainContainer>
        <ChooseBrand />
      </ScreenMainContainer>
    </ScrollView>
  );
};

interface IBrandLogo {
  img: string;
  name: string;
  _id: string;
}

const BrandData: IBrandLogo[] = [
  {
    img: 'https://source.android.com/setup/images/Android_symbol_green_RGB.png',
    name: 'Apple',
    _id: '1',
  },
  {
    img: 'https://source.android.com/setup/images/Android_symbol_green_RGB.png',
    name: 'Samsung',
    _id: '2',
  },
  {
    img: 'https://source.android.com/setup/images/Android_symbol_green_RGB.png',
    name: 'Xiaomi',
    _id: '3',
  },
  {
    img: 'https://source.android.com/setup/images/Android_symbol_green_RGB.png',
    name: 'OnePlus',
    _id: '4',
  },
  {
    img: 'https://source.android.com/setup/images/Android_symbol_green_RGB.png',
    name: 'Oppo',
    _id: '5',
  },
  {
    img: 'https://source.android.com/setup/images/Android_symbol_green_RGB.png',
    name: 'HTC',
    _id: '6',
  },
  {
    img: 'https://source.android.com/setup/images/Android_symbol_green_RGB.png',
    name: 'Gionee',
    _id: '7',
  },
];

const ChooseBrand = () => {
  const {navigate} = useNavigation();
  return (
    <ChooseBrandContainer
      data={BrandData}
      renderItem={({item}: {item: IBrandLogo}) => (
        <BrandCard
          name={item.name}
          img={item.img}
          onPress={() => navigate(Routes.selectDevice)}
        />
      )}
      keyExtractor={(item: IBrandLogo) => item._id}
      numColumns={2}
    />
  );
};

const BrandCard = (
  props: Partial<IBrandLogo> & {
    onPress: () => void;
  },
) => {
  return (
    <BrandContainer onPress={props.onPress}>
      <BrandLogo
        style={{resizeMode: 'contain'}}
        source={{
          uri: props.img,
        }}
      />
      <Text type="large center">{props.name}</Text>
    </BrandContainer>
  );
};

const BrandContainer = styled.TouchableOpacity`
  margin-vertical: ${props => props.theme.styled.spacing.small};
  background-color: #f4f4f4;
  padding-vertical: ${props => props.theme.styled.spacing.large}px;
  flex: 1;
  margin-horizontal: ${props => props.theme.styled.spacing.small};
`;

const BrandLogo = styled.Image`
  height: 50px;
  margin-bottom: ${props => props.theme.styled.spacing.small};
`;

const ChooseBrandContainer = styled(FlatList as new () => FlatList<IBrandLogo>)`
  width: 100%;
`;

const Headline = styled(Text)`
  font-weight: 900;
  margin-bottom: ${props => props.theme.styled.spacing.base};
`;

const SearchText = styled(Text)`
  margin-bottom: ${props => props.theme.styled.spacing.small};
  color: ${props => props.theme.basic.colors.grey1};
`;
