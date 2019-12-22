import React, { Component } from 'react';
import Icon from '@atlaskit/icon/glyph/checkbox';
import IconIndeterminate from '@atlaskit/icon/glyph/checkbox-indeterminate';
import GlobalTheme from '@atlaskit/theme/components';
import memoize from 'memoize-one';

import { IconWrapperOverrides } from './elements';
import Theme, { componentTokens } from './theme';
import {
  CheckboxIconProps,
  ThemeProps,
  ThemeTokens,
  CheckboxIconDefaults,
  CheckboxIconOverrides,
} from './types';
import { createExtender, ExtenderType } from './utils';

const defaults: CheckboxIconDefaults = {
  IconWrapper: IconWrapperOverrides,
  IconIndeterminate: {
    component: IconIndeterminate,
  },
  Icon: {
    component: Icon,
  },
};

export default class CheckboxIcon extends Component<CheckboxIconProps, {}> {
  static defaultProps = {
    primaryColor: 'inherit',
    secondaryColor: 'inherit',
    isIndeterminate: false,
    theme: (
      current: (prop: ThemeProps) => ThemeTokens,
      props: ThemeProps,
    ): ThemeTokens => current(props),
  };

  createExtender?: ExtenderType;

  constructor(props: CheckboxIconProps) {
    super(props);
    this.createExtender = memoize(createExtender).bind(this) as ExtenderType;
  }

  render() {
    const {
      isChecked,
      isDisabled,
      isInvalid,
      isActive,
      isFocused,
      isHovered,
      isIndeterminate,
      overrides,
      primaryColor,
      secondaryColor,
      theme,
    } = this.props;
    // @ts-ignore
    const getOverrides = this.createExtender<
      CheckboxIconDefaults,
      CheckboxIconOverrides
    >(defaults, overrides);
    const { component: IconWrapper, ...iconWrapperOverrides } = getOverrides(
      'IconWrapper',
    );
    const { component: IconIndeterminate } = getOverrides('IconIndeterminate');
    const { component: Icon } = getOverrides('Icon');
    return (
      <Theme.Provider value={theme}>
        <GlobalTheme.Consumer>
          {({ mode }: { mode: 'light' | 'dark' }) => (
            <Theme.Consumer mode={mode} tokens={componentTokens}>
              {tokens => (
                <IconWrapper
                  {...iconWrapperOverrides}
                  tokens={tokens}
                  isChecked={isChecked}
                  isDisabled={isDisabled}
                  isFocused={isFocused}
                  isActive={isActive}
                  isHovered={isHovered}
                  isInvalid={isInvalid}
                >
                  {isIndeterminate ? (
                    <IconIndeterminate
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                      size={tokens.icon.size}
                      label=""
                    />
                  ) : (
                    <Icon
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                      size={tokens.icon.size}
                      label=""
                    />
                  )}
                </IconWrapper>
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}
