import React from 'react';
import {Animated, View} from 'react-native';
import {Icon, IconProps, withTheme} from 'react-native-elements';

export const TestingSpinner = withTheme<IconProps & {status: string}>(props => {
  const {theme, status, ...rest} = props;
  const [rotation] = React.useState(new Animated.Value(0));
  const rotationAngle = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotation]);
  React.useEffect(() => {
    if (status !== 'pending') {
      rotation.stopAnimation();
    }
  }, [rotation, status]);
  const color =
    status === 'pending'
      ? theme.colors.primary
      : status === 'pass'
      ? 'green'
      : 'red';
  return (
    <View>
      <Animated.View
        style={{
          transform: [{rotate: rotationAngle}],
        }}>
        <Icon
          name="loading1"
          type="antdesign"
          color={color === theme.colors.primary ? theme.colors.grey4 : color}
          size={200}
        />
      </Animated.View>
      <Icon
        size={100}
        color={color}
        containerStyle={{
          position: 'absolute',
          top: 105,
          left: 100,
        }}
        iconStyle={{
          position: 'absolute',
        }}
        {...rest}
      />
    </View>
  );
});
