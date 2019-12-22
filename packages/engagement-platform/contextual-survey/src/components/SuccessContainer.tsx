/** @jsx jsx */
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { colors, gridSize } from '@atlaskit/theme';
import { jsx, css } from '@emotion/core';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => (
  <section
    css={css`
      margin-left: ${gridSize() * 5}px;
    `}
  >
    <div
      css={css`
        position: absolute;
        top: ${gridSize() * 3}px;
        left: ${gridSize() * 3}px;
      `}
    >
      <CheckCircleIcon label="" aria-hidden primaryColor={colors.G300} />
    </div>
    {children}
  </section>
);
