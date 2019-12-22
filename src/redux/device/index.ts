export type IHealth = 'working' | 'notWorking' | 'notTested';
export type IPhoneAge = '0-3' | '3-6' | '6-11' | '11+';
export type ICondition = 'excellent' | 'good' | 'average' | 'poor';

export const conditionText = {
  excellent: 'Just like a new ,Fully working, zero scratch',
  good: 'Minor marks and scratches,Fully working, no dent or crack',
  average: 'Major scratches on body, Display work properly',
  poor: 'Heavy dents,crack and scratches on body',
};
export interface IFunctionalState {
  bluetooth: IHealth;
  battery: IHealth;
  charging: IHealth;
  frontCamera: IHealth;
  backCamera: IHealth;
  microphone: IHealth;
  speaker: IHealth;
  vibration: IHealth;
  volumeUpButton: IHealth;
  volumeDownButton: IHealth;
  wifi: IHealth;
  gps: IHealth;
  touchScreen: IHealth;
}
export interface IGeneralDetails {
  name: string;
  ram: number;
  storage: number;
  androidVersion?: string;
  imgUrl: string;
}

export interface IDeviceState {
  generalDetails: IGeneralDetails | null;
  functionalState: IFunctionalState;
  phoneAge: IPhoneAge;
  overallCondition: ICondition;
  documents: {
    validBill: boolean;
    charger: boolean;
    warranty: boolean;
    box: boolean;
  };
}

const initialState: IDeviceState = {
  generalDetails: null,
  functionalState: {
    bluetooth: 'notTested',
    battery: 'notTested',
    charging: 'notTested',
    frontCamera: 'notTested',
    backCamera: 'notTested',
    microphone: 'notTested',
    speaker: 'notTested',
    vibration: 'notTested',
    volumeUpButton: 'notTested',
    volumeDownButton: 'notTested',
    wifi: 'notTested',
    gps: 'notTested',
    touchScreen: 'notTested',
  },
  phoneAge: '0-3',
  overallCondition: 'average',
  documents: {
    validBill: false,
    charger: false,
    warranty: false,
    box: false,
  },
};

const deviceReducer = (
  state = initialState,
  {type, payload}: {type: any; payload: any},
): IDeviceState => {
  switch (type) {
    case 'setState':
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default deviceReducer;
