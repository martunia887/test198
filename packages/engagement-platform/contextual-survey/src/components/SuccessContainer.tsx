/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { gridSize } from '@atlaskit/theme/constants';
import { G300 } from '@atlaskit/theme/colors';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

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
      <CheckCircleIcon label="" aria-hidden primaryColor={G300} />
    </div>
    {children}
  </section>
);
