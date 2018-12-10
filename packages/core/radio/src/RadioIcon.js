// @flow
import React, { Component } from 'react';
import GlobalTheme from '@atlaskit/theme';
import Icon from '@atlaskit/icon/glyph/radio';
import { IconWrapper } from './styled/Radio';
import { Theme, type ThemeTokens } from './theme';
import type { RadioIconProps } from './types';

export default class RadioIcon extends Component<RadioIconProps> {
  render() {
    const {
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isHovered,
      isInvalid,
      theme,
    } = this.props;
    const themeState = {
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isHovered,
      isInvalid,
    };
    return (
      <GlobalTheme.Consumer>
        {({ mode }: { mode: 'dark' | 'light' }) => (
          <Theme.Provider value={theme}>
            <Theme.Consumer {...themeState} mode={mode}>
              {(tokens: ThemeTokens) => (
                <IconWrapper
                  {...tokens}
                  isActive={isActive}
                  isChecked={isChecked}
                  isDisabled={isDisabled}
                  isFocused={isFocused}
                  isHovered={isHovered}
                  isInvalid={isInvalid}
                >
                  <Icon
                    isActive={isActive}
                    isHovered={isHovered}
                    label=""
                    primaryColor="inherit"
                    secondaryColor="inherit"
                  />
                </IconWrapper>
              )}
            </Theme.Consumer>
          </Theme.Provider>
        )}
      </GlobalTheme.Consumer>
    );
  }
}
