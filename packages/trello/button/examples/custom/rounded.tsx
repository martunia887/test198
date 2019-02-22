import * as React from 'react';
import Button from '../../src';
import { ButtonProps } from '@atlaskit/button';

const RoundButtonTheme = (
  nachosTheme: Function,
  { appearance = 'default', state = 'default', ...rest },
) => {
  const {
    buttonStyles: nachosButtonStyles,
    spinnerStyles,
    iconStyles,
  } = nachosTheme({ appearance, state, ...rest });

  return {
    buttonStyles: {
      ...nachosButtonStyles,
      ...{
        borderRadius: '50%',
      },
    },
    spinnerStyles,
    iconStyles,
  };
};

export default (nachosProps: ButtonProps) => (
  <Button {...nachosProps} theme={RoundButtonTheme} />
);
