import * as React from 'react';
import Textfield from '@atlaskit/textfield';
import nachosTFTheme from './theme';

export type TextFieldTheme = {
  container?: {};
  input?: {};
};

export type TextFieldProps = {
  isFocused?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  theme?: any;
};

export default class TextField extends React.Component<TextFieldProps> {
  render() {
    const { isInvalid, isFocused, isDisabled, theme, ...rest } = this.props;

    const nachosTheme = (adgTheme: any, themeProps: TextFieldProps) => ({
      container: {
        ...nachosTFTheme(adgTheme, themeProps).container,
        ...(this.props.theme && this.props.theme(themeProps).container),
      },
      input: {
        ...nachosTFTheme(adgTheme, themeProps).input,
        ...(this.props.theme && this.props.theme(themeProps).input),
      },
    });

    return (
      <div>
        <Textfield
          isInvalid={isInvalid}
          isFocused={isFocused}
          isDisabled={isDisabled}
          theme={nachosTheme}
          {...rest}
        />
      </div>
    );
  }
}
