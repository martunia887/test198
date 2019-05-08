// @flow
/** @jsx jsx */
import { type Node } from 'react';
import { jsx } from '@emotion/core';
import { gridSize } from '@atlaskit/theme';
import { type ThemeTokens } from '../theme';

const HORIZONTAL_SPACING = `${gridSize() / 2}px`;

type ThemeTokensWithChildren = ThemeTokens & {
  children?: Node,
};

export default ({ maxWidth, children }: ThemeTokensWithChildren) => (
  <span
    css={{
      display: 'inline-block',
      verticalAlign: 'top',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      padding: `0 ${HORIZONTAL_SPACING}`,
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      width: '100%',
    }}
  >
    {children}
  </span>
);
