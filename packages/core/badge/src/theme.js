// @flow

import { createTheme } from '@atlaskit/theme';
import {
  G50,
  N40,
  DN70,
  R400,
  B400,
  B100,
  G500,
  DN400,
  N0,
  R50,
  N800,
  DN900,
  DN0,
  B500,
  R500,
} from '@atlaskit/theme/colors';

export type ThemeAppearance =
  | 'added'
  | 'default'
  | 'important'
  | 'primary'
  | 'primaryInverted'
  | 'removed'
  | {};

export type ThemeMode = 'dark' | 'light';

export type ThemeProps = {
  appearance: ThemeAppearance,
  mode: ThemeMode,
};

export type ThemeTokens = {
  backgroundColor: string,
  textColor: string,
};

export const backgroundColors = {
  added: { light: G50, dark: G50 },
  default: { light: N40, dark: DN70 },
  important: { light: R400, dark: R400 },
  primary: { light: B400, dark: B100 },
  /* Note that primary inverted is a temporary implementation. Once navigation has
  context of the nav location to pass down, this will be moved to the primary when
  viewed in a global context. */
  primaryInverted: { light: N0, dark: DN400 },
  removed: { light: R50, dark: R50 },
};

export const textColors = {
  added: { light: G500, dark: G500 },
  default: { light: N800, dark: DN900 },
  important: { light: N0, dark: N0 },
  primary: { light: N0, dark: DN0 },
  primaryInverted: { light: B500, dark: DN0 },
  removed: { light: R500, dark: R500 },
};

export const Theme = createTheme<ThemeTokens, ThemeProps>(
  ({ appearance, mode }) => {
    if (typeof appearance === 'object') {
      return {
        backgroundColor: backgroundColors.default.light,
        textColor: textColors.default.light,
        ...appearance,
      };
    }
    return {
      backgroundColor: backgroundColors[appearance][mode],
      textColor: textColors[appearance][mode],
    };
  },
);
