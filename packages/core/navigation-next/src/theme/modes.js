// @flow

import { colors } from '@atlaskit/theme';

import modeGenerator from './modeGenerator';

export const light = modeGenerator({
  product: {
    text: colors.N0,
    background: colors.B500,
  },
  container: {
    text: colors.N500,
    textActive: colors.B400,
    textHeading: colors.N200,
    background: colors.N20,
    backgroundActive: colors.N30A,
    backgroundInteract: colors.B50,
    backgroundSkeleton: colors.N40,
  },
});

export const dark = modeGenerator({
  product: {
    text: colors.DN500,
    background: colors.DN10,
  },
  container: {
    text: colors.DN500,
    background: colors.DN10,
  },
});

export const settings = modeGenerator({
  product: {
    text: colors.N0,
    background: colors.N800,
  },
  container: {
    text: colors.N0,
    background: colors.N800,
  },
});
