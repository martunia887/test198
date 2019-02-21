import * as React from 'react';
import Button from '../../src/components/Button';
import { ButtonProps, ThemeProps } from '../../src/types';
import NachosButtonTheme from './NachosButtonTheme';

const RoundButtonTheme = (
  adgTheme: Function,
  { appearance = 'default', state = 'default', ...rest }: ThemeProps,
) => {
  const {
    buttonStyles: nachosButtonStyles,
    spinnerStyles,
    iconStyles,
  } = NachosButtonTheme(adgTheme, { appearance, state, ...rest });

  return {
    buttonStyles: {
      ...nachosButtonStyles,
      ...{
        borderRadius: '50%'
      }
    },
    spinnerStyles,
    iconStyles,
  };
};

export default (nachosProps: ButtonProps) => (
  <Button theme={RoundButtonTheme} {...nachosProps} />
);