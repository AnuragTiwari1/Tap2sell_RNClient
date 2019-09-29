export interface IColour {
  primary: string;
  secondary: string;
  grey0: string;
  grey1: string;
  grey2: string;
  grey3: string;
  grey4: string;
  grey5: string;
  greyOutline: string;
  searchBg: string;
  success: string;
  error: string;
  warning: string;
  divider: string;
}

export const colors: Partial<IColour> = {
  primary: '#00d474',
  secondary: '#00af60',
  grey0: '#121212',
  grey1: '#1a1a1a',
  grey2: '#353535',
  grey3: '#828282',
  grey4: '#cfcfcf',
  grey5: '#f8f8f8',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
};
