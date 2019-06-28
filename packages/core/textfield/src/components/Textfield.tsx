import GlobalTheme, { GlobalThemeTokens } from '@atlaskit/theme';
import React, { Component, SyntheticEvent, MouseEvent } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

import Input from './Input';
import { Theme } from '../theme';
import { TextFieldProps } from '../types';

interface State {
  isFocused: boolean;
  isHovered: boolean;
}

class Textfield extends Component<TextFieldProps, State> {
  static defaultProps = {
    appearance: 'standard',
    isCompact: false,
    isMonospaced: false,
    isInvalid: false,
  };

  state = {
    isFocused: false,
    isHovered: false,
  };

  input: HTMLInputElement | null = null;

  handleOnFocus = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleOnBlur = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  handleOnMouseDown = (e: MouseEvent<HTMLElement>) => {
    /** Running e.preventDefault() on the INPUT prevents double click behaviour */
    const target = e.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') {
      e.preventDefault();
    }
    if (
      this.input &&
      !this.props.isDisabled &&
      document.activeElement !== this.input
    ) {
      this.input.focus();
    }
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }
  };

  onMouseEnter = () => {
    if (!this.props.isDisabled) {
      this.setState({ isHovered: true });
    }
  };

  onMouseLeave = () => {
    if (!this.props.isDisabled) {
      this.setState({ isHovered: false });
    }
  };

  setInputRef = (ref: HTMLInputElement | null) => {
    this.input = ref;
    const { forwardedRef } = this.props;
    if (forwardedRef && typeof forwardedRef === 'object') {
      // @ts-ignore
      forwardedRef.current = ref;
    }
    if (forwardedRef && typeof forwardedRef === 'function') {
      forwardedRef(ref);
    }
  };

  render() {
    const { isFocused, isHovered } = this.state;
    const {
      appearance,
      // createAnalytics passed through from analytics-next
      // we don't want to spread this onto our input
      createAnalyticsEvent, // eslint-disable-line react/prop-types
      forwardedRef,
      isCompact,
      isDisabled,
      isInvalid,
      isMonospaced,
      theme,
      width,
      ...rest
    } = this.props;

    return (
      <Theme.Provider value={theme}>
        <GlobalTheme.Consumer>
          {({ mode }: GlobalThemeTokens) => (
            <Theme.Consumer
              appearance={appearance || 'standard'}
              mode={mode}
              width={width}
              isDisabled={isDisabled || false}
              isCompact={isCompact || false}
              isMonospaced={isMonospaced || false}
              isFocused={isFocused}
              isHovered={isHovered}
              isInvalid={isInvalid || false}
            >
              {tokens => (
                <Input
                  {...rest}
                  theme={tokens}
                  isDisabled={isDisabled}
                  isFocused={isFocused}
                  isHovered={isHovered}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  forwardedRef={this.setInputRef}
                  onFocus={this.handleOnFocus}
                  onBlur={this.handleOnBlur}
                  onMouseDown={this.handleOnMouseDown}
                />
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}

const ForwardRefTextfield = React.forwardRef<{}, TextFieldProps>(
  (props, ref) => (
    <Textfield
      {...props}
      forwardedRef={ref as TextFieldProps['forwardedRef']}
    />
  ),
) as any;
ForwardRefTextfield.displayName = 'TextField';

export { ForwardRefTextfield as TextFieldWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'textField',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'textField',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'textField',
        packageName,
        packageVersion,
      },
    }),
  })(ForwardRefTextfield),
);
