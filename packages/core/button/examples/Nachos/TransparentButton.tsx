import * as React from 'react';
import Button from '../../src/components/Button';
import { ButtonProps, ThemeProps } from '../../src/types';
import { nachosColors as colors } from './colors';
import NachosButtonTheme from './NachosButtonTheme';

const backgrounds = {
  default: {
    default: 'rgba(255, 255, 255, 0.3)',
    hover: 'rgba(255, 255, 255, 0.2)',
    active: 'rgba(255, 255, 255, 0.1)',
  },
  subtle: {
    default: 'none',
    hover: 'rgba(0,0,0,.3)',
    active: 'rgba(0,0,0,.3)',
  },
  danger: {
    default: colors['red-500'],
    hover: colors['red-600'],
    active: colors['red-600'],
  },
  help: {
    default: colors['sky-500'],
    hover: colors['sky-600'],
    active: colors['sky-600'],
  }
};

const getButtonStyles = ({ appearance, state }) => {
  const background = backgrounds[appearance][state];

  return {
    border: 'none',
    background,
    borderColor: 'none',
    boxShadow: 'none',
    color: colors.N0,
    cursor: 'pointer',
    fontWeight: appearance === 'subtle' ? 'normal' : 'bold',
    textDecoration: appearance === 'subtle' ? 'underline' : 'none',
  };
};

const TransparentButtonTheme = (
  adgTheme: Function,
  { appearance = 'default', state = 'default', ...rest }: ThemeProps,
) => {
  const {
    buttonStyles: nachosButtonStyles,
    spinnerStyles: nachosSpinnerStyles,
    iconStyles: nachosIconStyles,
  } = NachosButtonTheme(adgTheme, { appearance, state, ...rest });

  return {
    buttonStyles: {
      ...nachosButtonStyles,
      ...getButtonStyles({ appearance, state, ...rest }),
    },
    spinnerStyles: {
      ...nachosSpinnerStyles,
      ...{
        color: colors.N0,
      }
    },
    iconStyles: {
      ...nachosIconStyles,
      ...{
        color: colors.N0,
      }
    },
  };
};

export default (nachosProps: ButtonProps) => (
  <Button theme={TransparentButtonTheme} {...nachosProps} />
);

