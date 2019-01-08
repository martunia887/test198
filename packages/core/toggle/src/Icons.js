// @flow
import React from 'react';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import ConfirmIcon from '@atlaskit/icon/glyph/check';
import type { Size } from './types';

export const CheckedIcon = ({ size, label }: { size: Size, label: string }) => (
  <ConfirmIcon
    label={label || 'Check'}
    size={size === 'large' ? null : 'small'}
    primaryColor="inherit"
  />
);

export const UncheckedIcon = ({
  size,
  label,
}: {
  size: Size,
  label: string,
}) => (
  <CloseIcon
    label={label || 'Uncheck'}
    size={size === 'large' ? null : 'small'}
    primaryColor="inherit"
  />
);
