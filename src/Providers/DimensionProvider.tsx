import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';

interface IDimension {
  height: number;
  width: number;
  isLandscape: boolean;
}

export const DimensionContext = React.createContext<IDimension>({
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  isLandscape: Dimensions.get('window').width > Dimensions.get('window').height,
});
export const DimensionProvider = ({
  children,
}: {
  children: React.ReactElement<any>;
}) => {
  const [dimension, setDimension] = React.useState(getActualDimensions(
    Dimensions.get('window').height,
    Dimensions.get('window').width,
  ) as IDimension);

  return (
    <>
      <View
        style={styles.container}
        onLayout={e => {
          const {width, height} = e.nativeEvent.layout;
          const changedDimension = getActualDimensions(height, width);
          //check if dimensions changed actually
          if (
            (changedDimension.width !== dimension.width &&
              changedDimension.height !== dimension.height) ||
            changedDimension.isLandscape !== dimension.isLandscape
          ) {
            setDimension(changedDimension);
          }
        }}
      />
      <DimensionContext.Provider value={dimension}>
        {children}
      </DimensionContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    position: 'absolute',
  },
});

export const useDimensions = () => React.useContext(DimensionContext);

const getActualDimensions = (height: number, width: number): IDimension => ({
  height: height < width ? width : height,
  width: width > height ? height : width,
  isLandscape: width > height,
});
