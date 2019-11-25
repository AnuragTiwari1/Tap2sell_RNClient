import React from 'react';
import {Animated, View, StyleSheet} from 'react-native';
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
    status === 'pending' && !!theme.colors
      ? theme.colors.grey4
      : status === 'pass'
      ? 'green'
      : 'red';
  return (
    <View>
      <Animated.View
        style={{
          transform: [{rotate: rotationAngle}],
        }}>
        <Icon name="loading1" type="antdesign" color={color} size={200} />
      </Animated.View>
      {status !== 'pending' && (
        <View
          style={[
            styles.circularBand,
            {
              borderColor: color,
            },
          ]}
        />
      )}
      <Icon
        size={100}
        color={color}
        containerStyle={styles.iconContainer}
        iconStyle={styles.iconStyle}
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  circularBand: {
    borderWidth: 14,
    borderRadius: 100,
    position: 'absolute',
    height: 200,
    width: 200,
    top: 0,
    left: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 105,
    left: 100,
  },
  iconStyle: {
    position: 'absolute',
  },
});
