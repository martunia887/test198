import React, { Component } from 'react';
console.log(require.resolve('@atlaskit/icon/glyph/radio'));
const Icon = require('@atlaskit/icon/glyph/radio');
console.log(JSON.stringify(Icon.default, null, 2));
import IconB from '@atlaskit/icon/glyph/radio';
console.log(IconB);

import { IconWrapper } from './styled/Radio';
import { RadioIconProps } from './types';

export default class RadioIcon extends Component<RadioIconProps> {
  render() {
    const {
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isHovered,
      isInvalid,
    } = this.props;
    return (
      <IconWrapper
        isActive={isActive}
        isChecked={isChecked}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isHovered={isHovered}
        isInvalid={isInvalid}
      >
        <Icon label="" primaryColor="inherit" secondaryColor="inherit" />
      </IconWrapper>
    );
  }
}
