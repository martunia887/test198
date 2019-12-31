import React from 'react';
import { css, Global } from '@emotion/core';
import { N800, N300, B400, B300 } from '@atlaskit/theme/src/colors';

const fonts = css`
  @font-face {
    font-family: 'Charlie Display Regular';
    src: url('charliedisplay-regular-webfont.woff2') format('woff2'),
      url('charliedisplay-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Charlie Display Semibold';
    src: url('charliedisplay-semibold-webfont.woff2') format('woff2'),
      url('charliedisplay-semibold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

const systemFontStack = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;`;
const monospaceFontStack = `font-family: 'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace;`;

// todo: change to rem, unpx line height
const headings = css`
  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  h5,
  .h5 {
    font-weight: 500;
    color: ${N800};
  }

  h1,
  .h1 {
    font-size: 29px;
    line-height: 32px;
  }

  h2,
  .h2 {
    font-size: 24px;
    line-height: 28px;
  }

  h3,
  .h3 {
    font-size: 20px;
    line-height: 24px;
  }

  h4,
  .h4 {
    font-size: 16px;
    line-height: 24px;
  }

  h5,
  .h5 {
    font-size: 14px;
    line-height: 16px;
  }

  h6,
  .h6 {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
`;

const paragraphs = css`
  p,
  p.sm,
  p.lg {
    font-weight: 400;
  }

  p {
    color: ${N800};
    font-size: 14px;
    line-height: 24px;
    &.sm {
      color: ${N300};
      font-size: 11px;
      line-height: 14px;
    }
    &.lg {
      font-size: 16px;
    }
  }

  code,
  .code {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  }
`;

const links = css`
  a,
  .link {
    color: ${B400};
  }

  a:hover,
  .link:hover {
    color: ${B300};
  }
`;

const Typography = () => (
  <Global
    styles={css`
  ${fonts}
  ${headings}
  ${paragraphs}
  ${links}
`}
  />
);

export default Typography;
