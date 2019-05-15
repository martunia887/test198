// @flow
import React, { Component } from 'react';
import Spinner from '@atlaskit/spinner';
import ToggleBase from './ToggleBase';
import defaultBaseProps from './defaultBaseProps';
import { CheckedIcon, UncheckedIcon } from './Icons';
import type { StatelessProps, DefaultBaseProps } from './types';

type SpinnerProps = {
  delay?: number,
  invertColor?: boolean,
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number,
  isCompleting?: boolean,
  onComplete?: () => mixed,
};

type Props = StatelessProps & {
  spinnerProps: SpinnerProps,
  showSpinner: boolean,
};

export default class LoadingToggle extends Component<Props> {
  static defaultProps: DefaultBaseProps = {
    ...defaultBaseProps,
    spinnerProps: {},
  };

  getIcon() {
    if (this.props.isChecked) {
      return CheckedIcon;
    }
    return UncheckedIcon;
  }

  render() {
    const { isLoading, showSpinner, spinnerProps, size, label } = this.props;
    const Icon = this.getIcon();

    return (
      <>
        <ToggleBase {...this.props}>
          {isLoading || showSpinner ? (
            <Spinner
              {...spinnerProps}
              isCompleting={isLoading}
              size="xsmall"
              invertColor
            />
          ) : (
            <Icon size={size} label={label} />
          )}
        </ToggleBase>
      </>
    );
  }
}

/*
  Lifetime of a loading toggle:

  1. Rendered
      initial state
  2. Receives new promise
      switch toggle state
        with spinner
  3. Promise:
    resolves:
      unload spinner, show icon
    rejects:
      unload spinner, update toggle state to revert it
*/
