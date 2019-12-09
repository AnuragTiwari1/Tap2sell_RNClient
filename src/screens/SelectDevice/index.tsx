import React from 'react';
import {FlatList, View} from 'react-native';
import {SharedElement} from 'react-native-motion';
import styled from 'styled-components/native';
import {AppText as Text} from '../../components/common/AppText';
import {SearchBar} from '../../components/common/SearchBar';
import {BackIcon, baseIcon} from '../../components/Icon/common';
import {constant} from '../../Config';
import {base, borderRadius, tiny, xTiny} from '../../constants/Theme';
import {IGeneralDetails} from '../../redux/device';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {useNavigation} from '../../hooks/useNavigation';
import {connect} from 'react-redux';
import {Routes} from '../../router/routes';

// import {FlatList} from 'react-native-gesture-handler';
const mobileData: IGeneralDetails[] = [
  {
    name: 'Asus ZenFone Max M2',
    storage: 32,
    ram: 4,
    imgUrl:
      'https://rukminim1.flixcart.com/image/312/312/jp02t8w0/mobile/z/z/e/asus-zenfone-max-m2-zb632kl-4a004in-original-imafbcafmv6tgqjz.jpeg?q=70',
  },
  {
    name: 'Asus 6Z',
    storage: 32,
    ram: 4,
    imgUrl:
      'https://rukminim1.flixcart.com/image/312/312/k1118cw0/mobile/g/p/n/asus-6z-zs630kl-6a042ww-original-imafkzqyusfjpgyj.jpeg?q=70',
  },
  {
    name: 'Samsung Galaxy A50s',
    storage: 32,
    ram: 4,
    imgUrl:
      'https://rukminim1.flixcart.com/image/312/312/k0flmkw0/mobile/s/a/y/samsung-galaxy-a50s-sm-a507fzlwins-original-imafk8h5xtdt3ggv.jpeg?q=70',
  },
  {
    name: 'Redmi Note 7 Pro',
    storage: 32,
    ram: 4,
    imgUrl:
      'https://rukminim1.flixcart.com/image/312/312/jyyqc280/mobile/x/s/d/mi-redmi-note-7-pro-mzb8433in-original-imafj36gfh9gfr7g.jpeg?q=70',
  },
  {
    name: 'OPPO K1',
    storage: 32,
    ram: 4,
    imgUrl:
      'https://rukminim1.flixcart.com/image/312/312/jrqo70w0/mobile/r/d/z/oppo-k1-cph1893-original-imafdgxvmqwufx7d.jpeg?q=70',
  },
];
const SelectDevices = ({setDevice}: {setDevice: Function}) => {
  const {widthPercentageToDP} = useResponsiveHelper();
  const [searchText, setSearchText] = React.useState('');
  const {navigate, getParam, goBack} = useNavigation<{
    activateSearch: boolean;
  }>();
  return (
    <>
      <SharedElement sourceId={constant.searchBarId}>
        <View>
          <SearchContainer>
            <StyledBackIcon
              size={widthPercentageToDP(baseIcon)}
              onPress={() => goBack()}
            />
            <View style={{flex: 1}}>
              <SearchBar
                getFocus={getParam('activateSearch', false)}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search your device here..."
              />
            </View>
          </SearchContainer>
        </View>
      </SharedElement>
      <FlatList
        data={mobileData}
        renderItem={({item}) => (
          <DevicesRow
            {...item}
            onPress={() => {
              setDevice(item);
              navigate(`${Routes.testDevice}`);
            }}
          />
        )}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />
    </>
  );
};

export default connect(
  null,
  dispatch => ({
    setDevice: (device: IGeneralDetails) =>
      dispatch({
        type: 'setState',
        payload: {
          generalDetails: device,
        },
      }),
  }),
)(SelectDevices);

const DevicesRow = ({
  name,
  imgUrl,
  ram,
  storage,
  onPress,
}: IGeneralDetails & {onPress: (e: any) => void}) => {
  return (
    <DeviceRowContainer onPress={onPress}>
      <StyledImage
        source={{
          uri: imgUrl,
        }}
        resizeMode="center"
      />
      <TextContainer>
        <Text type="bold" style={{marginBottom: `${tiny}%`}}>
          {name}
        </Text>
        <Text
          type="base"
          style={{marginBottom: `${base}%`, marginStart: `${xTiny}%`}}>
          {ram} GB RAM | {storage} GB ROM...
        </Text>
        <PriceText type="white bold small" style={{borderRadius}}>
          Get Upto ₹5,000
        </PriceText>
      </TextContainer>
    </DeviceRowContainer>
  );
};

const PriceText = styled(Text)`
  align-self: flex-end;
  margin-top: 5%;
  background-color: ${props => props.theme.basic.colors.secondary}
  padding-horizontal: 5%;
  padding-vertical:2%;
`;

const TextContainer = styled.View`
  padding-top: 5%;
  flex: 1;
  margin-right: 5%;
`;

const DeviceRowContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.basic.colors.grey2};
`;

const StyledImage = styled.Image`
  height: ${props => props.theme.styled.specification.deviceLogoHeight};
  width: 10%;
  margin-horizontal: ${base}%;
`;

const StyledBackIcon = styled(BackIcon).attrs(props => ({
  containerStyle: {marginRight: props.theme.styled.spacing.tiny},
}))``;

const SearchContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding-horizontal: ${base}%;
  align-items: center;
  background-color: #fff;
`;
