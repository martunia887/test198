// @flow

import { brightness } from 'chromatism';
import type {
  Text,
  Background,
  ItemTheme,
  CustomisableThemeProperties,
} from './types';
import * as presets from './presets';

const { global: globalTheme } = presets;

// eslint-disable-next-line import/prefer-default-export
export const createGlobalTheme = (
  text: Text,
  background: Background,
): CustomisableThemeProperties => {
  const active: Background = brightness(10, background).hex;

  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: brightness(-10, background).hex,
    },
    active: {
      background: active,
    },
    selected: {
      background: brightness(-20, background).hex,
      text,
    },
    focus: {
      outline: text,
    },
    dragging: {
      background: active,
    },
  };

  // Here we take the default global theme and selectively override some of the customisable values
  // with values based on the function input. We are currently not encouraging the overriding of
  // these default properties.
  const customisedGlobal: CustomisableThemeProperties = {
    background: {
      primary: background,
      secondary: background,
      tertiary: globalTheme.background.tertiary,
    },
    text,
    subText: brightness(20, text).hex,
    keyline: globalTheme.keyline,
    item,
    dropdown: globalTheme.dropdown,
  };

  return customisedGlobal;
};
