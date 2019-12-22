/** @jsx jsx */
import { subtleHeading } from '@atlaskit/theme/colors';
import { gridSize as gridSizeFn } from '@atlaskit/theme/constants';
import { N800 } from '@atlaskit/theme/src/colors';
import { headingSizes } from '@atlaskit/theme/typography';
import { jsx, ClassNames } from '@emotion/core';
import { CSSObject } from '@emotion/core';

const gridSize = gridSizeFn();

const itemHeadingCSS = {
  textTransform: 'uppercase',
  fontSize: headingSizes.h200.size,
  lineHeight: headingSizes.h200.lineHeight / headingSizes.h200.size,
  //   color: subtleHeading(),
  color: N800,
  marginTop: gridSize,
  marginBottom: 6,
  padding: `0 ${gridSize * 2.5}px`,
} as CSSObject;

export const HeadingItem = ({ children }: { children: React.ReactNode }) => (
  <div css={itemHeadingCSS}>{children}</div>
);
