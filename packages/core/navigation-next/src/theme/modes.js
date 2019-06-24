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
    textSubtle: colors.N200,
    background: colors.N20,
    backgroundHint: colors.N30,
    backgroundStatic: colors.N30,
    backgroundInteract: colors.B50,
    backgroundSkeleton: colors.N40,
    backgroundSeparator: colors.N30A,
  },
});

export const dark = modeGenerator({
  product: {
    text: colors.DN500,
    background: colors.DN0,
  },
  container: {
    text: colors.DN600,
    background: colors.DN20,
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
