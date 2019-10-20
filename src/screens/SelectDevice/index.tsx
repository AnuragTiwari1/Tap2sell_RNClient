import React from 'react';
import {AppText as Text} from '../../components/common/AppText';
import {ScrollView, View} from 'react-native';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import styled from 'styled-components/native';
import {BackIcon, baseIcon} from '../../components/Icon/common';
import {SearchBar} from '../../components/common/SearchBar';
import {SharedElement} from 'react-native-motion';
import {constant} from '../../Config';
import {base, borderRadius} from '../../constants/Theme';
// import {FlatList} from 'react-native-gesture-handler';

export const SelectDevices = (props: any) => {
  const {widthPercentageToDP} = useResponsiveHelper();
  const [searchText, setSearchText] = React.useState('');

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <SharedElement sourceId={constant.searchBarId}>
        <View>
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
        </View>
      </SharedElement>
      {/* <FlatList /> */}
      <DevicesRow
        name="Asus ZenFone Max M2"
        imgUrl="https://rukminim1.flixcart.com/image/312/312/jp02t8w0/mobile/z/z/e/asus-zenfone-max-m2-zb632kl-4a004in-original-imafbcafmv6tgqjz.jpeg?q=70"
      />
      <DevicesRow
        name="Asus 6Z"
        imgUrl="https://rukminim1.flixcart.com/image/312/312/k1118cw0/mobile/g/p/n/asus-6z-zs630kl-6a042ww-original-imafkzqyusfjpgyj.jpeg?q=70"
      />
      <DevicesRow
        name="Samsung Galaxy A50s"
        imgUrl="https://rukminim1.flixcart.com/image/312/312/k0flmkw0/mobile/s/a/y/samsung-galaxy-a50s-sm-a507fzlwins-original-imafk8h5xtdt3ggv.jpeg?q=70"
      />
      <DevicesRow
        name="Samsung Galaxy A20"
        imgUrl="https://rukminim1.flixcart.com/image/312/312/ju79hu80/mobile/4/v/n/samsung-galaxy-a20-sm-a205fzbgins-original-imaffdvk3rztygm5.jpeg?q=70"
      />
      <DevicesRow
        name="Redmi Note 7 Pro"
        imgUrl="https://rukminim1.flixcart.com/image/312/312/jyyqc280/mobile/x/s/d/mi-redmi-note-7-pro-mzb8433in-original-imafj36gfh9gfr7g.jpeg?q=70"
      />
      <DevicesRow
        name="OPPO K1"
        imgUrl="https://rukminim1.flixcart.com/image/312/312/jrqo70w0/mobile/r/d/z/oppo-k1-cph1893-original-imafdgxvmqwufx7d.jpeg?q=70"
      />
      <DevicesRow
        name="OPPO A5"
        imgUrl="https://rukminim1.flixcart.com/image/312/312/ju79hu80/mobile/y/y/k/oppo-a5-cph1809-original-imaf9f378sdqknhv.jpeg?q=70"
      />
    </ScrollView>
  );
};

const DevicesRow = ({name, imgUrl}: {name: string; imgUrl: string}) => {
  return (
    <DeviceRowContainer>
      <StyledImage
        source={{
          uri: imgUrl,
        }}
        resizeMode="center"
      />
      <TextContainer>
        <Text type="bold" style={{marginBottom: '2%'}}>
          {name}
        </Text>
        <Text type="base" style={{marginBottom: '5%', marginStart: '1%'}}>
          3 GB RAM | 32 GB ROM...
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

const DeviceRowContainer = styled.View`
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
