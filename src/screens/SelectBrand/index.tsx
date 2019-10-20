import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {ScrollView, View, FlatList} from 'react-native';
import {ScreenMainContainer} from '../Landing/styles';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import styled from 'styled-components/native';
import {Routes} from '../../router/routes';
import {SearchBar} from '../../components/common/SearchBar';
import {SharedElement} from 'react-native-motion';
import {constant} from '../../Config';

export const SelectBrand = (props: any) => {
  const {heightPercentageToDP} = useResponsiveHelper();
  const [searchText, setSearchText] = React.useState('');
  return (
    <ScrollView>
      <View style={{minHeight: heightPercentageToDP(100)}}>
        <ScreenMainContainer>
          <Headline type="bold center xLarge" style={{fontWeight: '900'}}>
            Choose Your Brand
          </Headline>
          <SearchText type="center">What'd you like to choose ?</SearchText>
          <SharedElement id={constant.searchBarId}>
            <View>
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
          <ChooseBrand navigation={props.navigation} />
        </ScreenMainContainer>
      </View>
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
    img: 'http://www.tap2sell.com/img/apple1_1542100473.png',
    name: 'Apple',
    _id: '1',
  },
  {
    img: 'http://www.tap2sell.com/img/Samsung_1542101267.png',
    name: 'Samsung',
    _id: '2',
  },
  {
    img: 'http://www.tap2sell.com/img/mi_1542101570.png',
    name: 'Xiaomi',
    _id: '3',
  },
  {
    img: 'http://www.tap2sell.com/img/oneplus_1542102251.png',
    name: 'OnePlus',
    _id: '4',
  },
  {
    img: 'http://www.tap2sell.com/img/oppo_1542103475.png',
    name: 'Oppo',
    _id: '5',
  },
  {
    img: 'http://www.tap2sell.com/img/htc_1542103627.png',
    name: 'HTC',
    _id: '6',
  },
  {
    img: 'http://www.tap2sell.com/img/Gionee_1542103768.png',
    name: 'Gionee',
    _id: '7',
  },
];

const ChooseBrand = (props: any) => {
  return (
    <ChooseBrandContainer
      data={BrandData}
      renderItem={({item}) => (
        <BrandCard
          name={item.name}
          img={item.img}
          onPress={() => props.navigation.navigate(Routes.selectDevice)}
        />
      )}
      keyExtractor={item => item._id}
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
        style={[{resizeMode: 'contain'}]}
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

const ChooseBrandContainer = styled(FlatList)`
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
