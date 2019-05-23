// @flow

import { colors } from '@atlaskit/theme';

import modeGenerator from './modeGenerator';

export const light = modeGenerator({
  product: {
    text: colors.N0,
    background: colors.B500,
  },
  global: {
    text: colors.N0,
    background: colors.B300,
  },
});

export const dark = modeGenerator({
  global: {
    text: colors.DN500,
    background: colors.DN10,
  },
  product: {
    text: colors.DN500,
    background: colors.DN10,
  },
});

export const settings = modeGenerator({
  global: {
    text: colors.N0,
    background: colors.N800,
  },
  product: {
    text: colors.N0,
    background: colors.N800,
  },
});
