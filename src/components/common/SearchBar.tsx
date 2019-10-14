import React from 'react';
import styled from 'styled-components/native';
import {Input, InputProps} from 'react-native-elements';
import {Animated} from 'react-native';
import {SearchIcon, baseIcon, ClearIcon} from '../Icon/common';
import {useResponsiveHelper} from '../../utils/styles/responsive';
import {getFontStyleObject} from '../../utils/styles/fonts';

export const SearchBar = (props: InputProps) => {
  const [isEmpty, setEmpty] = React.useState(!props.value);
  //FIXME:
  const input = React.useRef({} as any);
  React.useEffect(() => {
    setEmpty(!props.value);
  }, [props.value]);

  const {widthPercentageToDP} = useResponsiveHelper();

  return (
    <SearchContainer>
      {/*
        //FIXME: fix the type here
      */}
      <StyledInput
        ref={input}
        rightIcon={
          <IconContainer>
            {isEmpty ? (
              <SearchIcon size={widthPercentageToDP(baseIcon)} />
            ) : (
              <RotatedInView>
                <ClearIcon
                  size={widthPercentageToDP(baseIcon)}
                  underlayColor="#F7F7F7"
                  onPress={() => {
                    input.current.clear();
                    if (typeof props.onChangeText === 'function') {
                      props.onChangeText('');
                    }
                  }}
                />
              </RotatedInView>
            )}
          </IconContainer>
        }
        {...props}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  background-color: #fff;
`;

const StyledInput = styled(Input).attrs(props => ({
  containerStyle: {},
  inputContainerStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: props.theme.basic.colors.searchBg,
    margin: props.theme.styled.spacing.xTiny,
    borderWidth: 0,
  },
  inputStyle: {
    marginLeft: 10,
    ...getFontStyleObject({family: 'Lato', weight: 'Bold'}),
  },
}))``;

const IconContainer = styled.View`
  margin-right: ${props => props.theme.styled.spacing.tiny}px;
`;

const RotatedInView = ({
  children,
  initialAngle = 0,
  finalAngle = 90,
}: {
  children: React.ReactElement<any>;
  initialAngle?: number;
  finalAngle?: number;
}) => {
  const [rotation] = React.useState(new Animated.Value(initialAngle));

  React.useEffect(() => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [rotation]);

  const rotationAngle = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: [`${initialAngle}deg`, `${finalAngle}deg`],
  });

  return (
    <Animated.View style={{transform: [{rotate: rotationAngle}]}}>
      {children}
    </Animated.View>
  );
};
