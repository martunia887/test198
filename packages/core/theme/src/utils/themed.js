// @flow
/* eslint-disable prefer-rest-params */
// TODO: Add a ticket
// eslint-disable-next-line
import getTheme from './getTheme';
import { type ThemedValue, type ThemeProps } from '../types';

type Value = string | number;
type Modes = { light: Value, dark: Value };
type VariantModes = { [string]: Modes };

function themedVariants(variantProp, variants) {
  return (props: ?ThemeProps) => {
    const theme = getTheme(props);
    if (props && props[variantProp] && variants) {
      const modes = variants[props[variantProp]];
      if (modes) {
        return modes[theme.mode];
      }
    }
    return '';
  };
}

export default function themed(
  modesOrVariant: Modes | string,
  variantModes: ?VariantModes,
): ThemedValue {
  if (typeof modesOrVariant === 'string') {
    return themedVariants(modesOrVariant, variantModes);
  }
  const modes = modesOrVariant;
  return (props: ?ThemeProps) => {
    const theme = getTheme(props);
    return modes[theme.mode];
  };
}
