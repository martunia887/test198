// @flow
import { hex2rgba } from './utils';
export default {
  // Reds
  R50: '#FFEBE6',
  R75: '#FFBDAD',
  R100: '#FF8F73',
  R200: '#FF7452',
  R300: '#FF5630',
  R400: '#DE350B',
  R500: '#BF2600',

  // Yellows
  Y50: '#FFFAE6',
  Y75: '#FFF0B3',
  Y100: '#FFE380',
  Y200: '#FFC400',
  Y300: '#FFAB00',
  Y400: '#FF991F',
  Y500: '#FF8B00',

  // Greens
  G50: '#E3FCEF',
  G75: '#ABF5D1',
  G100: '#79F2C0',
  G200: '#57D9A3',
  G300: '#36B37E',
  G400: '#00875A',
  G500: '#006644',

  // Blues
  B50: '#DEEBFF',
  B75: '#B3D4FF',
  B100: '#4C9AFF',
  B200: '#2684FF',
  B300: '#0065FF',
  B400: '#0052CC',
  B500: '#0747A6',

  // Purples
  P50: '#EAE6FF',
  P75: '#C0B6F2',
  P100: '#998DD9',
  P200: '#8777D9',
  P300: '#6554C0',
  P400: '#5243AA',
  P500: '#403294',

  // Teals
  T50: '#E6FCFF',
  T75: '#B3F5FF',
  T100: '#79E2F2',
  T200: '#00C7E6',
  T300: '#00B8D9',
  T400: '#00A3BF',
  T500: '#008DA6',

  // Neutrals
  N0: '#FFFFFF',
  N10: '#FAFBFC',
  N20: '#F4F5F7',
  N30: '#EBECF0',
  N40: '#DFE1E6',
  N50: '#C1C7D0',
  N60: '#B3BAC5',
  N70: '#A5ADBA',
  N80: '#97A0AF',
  N90: '#8993A4',
  N100: '#7A869A',
  N200: '#6B778C',
  N300: '#5E6C84',
  N400: '#505F79',
  N500: '#42526E',
  N600: '#344563',
  N700: '#253858',
  N800: '#172B4D',

  // ATTENTION: update the tints if you update this
  N900: '#091E42',

  // Each tint is made of N900 and an alpha channel
  N10A: 'rgba(9, 30, 66, 0.02)',
  N20A: 'rgba(9, 30, 66, 0.04)',
  N30A: 'rgba(9, 30, 66, 0.08)',
  N40A: 'rgba(9, 30, 66, 0.13)',
  N50A: 'rgba(9, 30, 66, 0.25)',
  N60A: 'rgba(9, 30, 66, 0.31)',
  N70A: 'rgba(9, 30, 66, 0.36)',
  N80A: 'rgba(9, 30, 66, 0.42)',
  N90A: 'rgba(9, 30, 66, 0.48)',
  N100A: 'rgba(9, 30, 66, 0.54)',
  N200A: 'rgba(9, 30, 66, 0.60)',
  N300A: 'rgba(9, 30, 66, 0.66)',
  N400A: 'rgba(9, 30, 66, 0.71)',
  N500A: 'rgba(9, 30, 66, 0.77)',
  N600A: 'rgba(9, 30, 66, 0.82)',
  N700A: 'rgba(9, 30, 66, 0.89)',
  N800A: 'rgba(9, 30, 66, 0.95)',

  // Dark Mode Neutrals
  DN900: '#E6EDFA',
  DN800: '#DCE5F5',
  DN700: '#CED9EB',
  DN600: '#B8C7E0',
  DN500: '#ABBBD6',
  DN400: '#9FB0CC',
  DN300: '#8C9CB8',
  DN200: '#7988A3',
  DN100: '#67758F',
  DN90: '#56637A',
  DN80: '#455166',
  DN70: '#3B475C',
  DN60: '#313D52',
  DN50: '#283447',
  DN40: '#202B3D',
  DN30: '#1B2638',
  DN20: '#121A29',
  DN10: '#0E1624',

  // ATTENTION: update the tints if you update this
  DN0: '#0D1424',

  // Each dark tint is made of DN0 and an alpha channel
  DN800A: 'rgba(13, 20, 36, 0.06)',
  DN700A: 'rgba(13, 20, 36, 0.14)',
  DN600A: 'rgba(13, 20, 36, 0.18)',
  DN500A: 'rgba(13, 20, 36, 0.29)',
  DN400A: 'rgba(13, 20, 36, 0.36)',
  DN300A: 'rgba(13, 20, 36, 0.40)',
  DN200A: 'rgba(13, 20, 36, 0.47)',
  DN100A: 'rgba(13, 20, 36, 0.53)',
  DN90A: 'rgba(13, 20, 36, 0.63)',
  DN80A: 'rgba(13, 20, 36, 0.73)',
  DN70A: 'rgba(13, 20, 36, 0.78)',
  DN60A: 'rgba(13, 20, 36, 0.81)',
  DN50A: 'rgba(13, 20, 36, 0.85)',
  DN40A: 'rgba(13, 20, 36, 0.89)',
  DN30A: 'rgba(13, 20, 36, 0.92)',
  DN20A: 'rgba(13, 20, 36, 0.95)',
  DN10A: 'rgba(13, 20, 36, 0.97)',

  // Transparencies:
  B75A: hex2rgba('#B3D4FF', 0.6),
  B200A: hex2rgba('#2684FF', 0.6),
  transparent: 'transparent',
};
