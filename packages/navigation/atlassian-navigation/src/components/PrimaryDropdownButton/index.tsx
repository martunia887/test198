/** @jsx jsx */
import { forwardRef, Ref } from 'react';
import ChevronIcon from '@atlaskit/icon/glyph/chevron-down';
import { jsx } from '@emotion/core';

import { PrimaryButton } from '../PrimaryButton';

import { chevronIconCSS } from './styles';
import { PrimaryDropdownButtonProps } from './types';

export const PrimaryDropdownButton = forwardRef(
  (props: PrimaryDropdownButtonProps, ref: Ref<any>) => {
    return (
      <PrimaryButton
        iconAfter={
          <span css={chevronIconCSS}>
            <ChevronIcon label="" />
          </span>
        }
        ref={ref}
        {...props}
      />
    );
  },
);
