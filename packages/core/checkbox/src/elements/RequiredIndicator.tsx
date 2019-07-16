/** @jsx jsx */
import { jsx } from '@emotion/core';
import { math, gridSize } from '@atlaskit/theme';
<<<<<<< HEAD
import { RequiredIndicatorProps } from '../types';

export default ({ tokens, ...props }: RequiredIndicatorProps) => (
  <span
    css={{
      color: tokens.requiredIndicator.textColor.rest,
=======

export interface RequiredIndicatorProps
  extends React.HTMLProps<HTMLSpanElement> {}

export default (props: RequiredIndicatorProps) => (
  <span
    css={{
      color: colors.R400,
>>>>>>> a01ca0307a... separate out checkbox.tsx file into smaller component files in an elements folder
      paddingLeft: `${math.multiply(gridSize, 0.25)}px;`,
    }}
    {...props}
  />
);
