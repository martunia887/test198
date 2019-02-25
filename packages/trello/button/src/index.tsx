import AkButton, { ButtonProps } from '@atlaskit/button';
import nachosTheme from './theme';
import * as React from 'react';
export { ButtonGroup } from '@atlaskit/button';

export default (buttonProps: typeof ButtonProps) => {
  let theme = nachosTheme;
  if (buttonProps.theme) {
    theme = (adgTheme, themeProps) =>
      buttonProps.theme(x => nachosTheme(adgTheme, x), themeProps);
  }

  return <AkButton {...buttonProps} theme={theme} />;
};
