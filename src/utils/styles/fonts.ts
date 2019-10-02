import Config from '../../Config';

interface IWeights {
  [key: string]:
    | '400'
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}
const fonts = {
  DenkOne: {
    weights: {
      Regular: '400',
      Bold: '700',
    } as IWeights,
  },
  Lato: {
    weights: {
      Regular: '400',
    } as IWeights,
  },
};

interface IParams {
  family?: 'DenkOne' | 'Lato';
  weight?: 'Regular' | 'Bold';
}

export const getFontStyleObject = (params: IParams = {}) => {
  const {family = 'Lato', weight = 'Regular'} = params;

  const {weights} = fonts[family];

  if (Config.isAndroid) {
    const suffix = weights[weight] ? weight : '';
    return {fontFamily: family + (suffix.length ? `-${suffix}` : '')};
  }

  return {
    fontFamily: family,
    fontWeight: weights[weight] || weights.Regular,
  };
};
