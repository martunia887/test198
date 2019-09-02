import { StyleWrapper as StyleWrapperRenderer } from '@atlaskit/renderer';
import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme';

const fontSizes = {
  h1: {
    fontSize: '8.0rem',
    lineHeight: '8.0rem',
  },
  h2: {
    fontSize: '6.4rem',
    lineHeight: '7.2rem',
  },
  h3: {
    fontSize: '5.6rem',
    lineHeight: '6.0rem',
  },
  h4: {
    fontSize: '4.8rem',
    lineHeight: '4.8rem',
  },
  h5: {
    fontSize: '3.2rem',
    lineHeight: '3.2rem',
  },
  h6: {
    fontSize: '2.8rem',
    lineHeight: '2.8rem',
  },
  status: {
    fontSize: '2.4rem',
    lineHeight: '3.6rem',
  },
  paragraph: {
    fontSize: '2.4rem',
    lineHeight: '3.6rem',
  },
};

const Status = css`
  span[data-node-type='status'] > span {
    padding: 8px 16px;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;

    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 0;
    font-weight: 800;
    font-family: 'Charlie_Display_Bold';
    font-size: ${fontSizes.status.fontSize};
    line-height: ${fontSizes.status.lineHeight};
  }
`;

const Paragraphs = css`
  p,
  a,
  small {
    font-family: 'Charlie_Display_Regular';
    font-size: ${fontSizes.paragraph.fontSize};
    line-height: ${fontSizes.paragraph.lineHeight};
    margin-top: 2.8rem !important;
  }

  li .ak-renderer-document p:first-of-type {
    margin-top: 0 !important;
  }
`;

const Headings = css`
  h1 {
    font-size: ${fontSizes.h1.fontSize};
    line-height: ${fontSizes.h1.lineHeight};
    font-family: 'Charlie_Display_Semibold';
  }

  h2 {
    font-size: ${fontSizes.h2.fontSize};
    font-family: 'Charlie_Display_Semibold';
    line-height: ${fontSizes.h2.lineHeight};
  }

  h3 {
    font-size: ${fontSizes.h3.fontSize};
    font-family: 'Charlie_Display_Semibold';
    line-height: ${fontSizes.h3.lineHeight};
  }

  h4 {
    font-size: ${fontSizes.h4.fontSize};
    font-family: 'Charlie_Display_Semibold';
    line-height: ${fontSizes.h4.lineHeight};
  }

  h5 {
    font-size: ${fontSizes.h5.fontSize};
    font-family: 'Charlie_Display_Semibold';
    line-height: ${fontSizes.h5.lineHeight};
  }

  h6 {
    font-size: ${fontSizes.h6.fontSize};
    font-family: 'Charlie_Display_Semibold';
    line-height: ${fontSizes.h6.lineHeight};
    color: ${colors.N80};
  }
`;

const Lists = css`
  ul,
  ol {
    text-align: left;
    list-style-position: outside;
  }
`;

export const StyleWrapper = styled(StyleWrapperRenderer)`
  ${Headings};
  ${Paragraphs};
  ${Status};
  ${Lists};
`;
