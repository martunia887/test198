import { StyleWrapper as StyleWrapperRenderer } from '@atlaskit/renderer';
import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme';

const fontSizes = {
  authorName: {
    fontSize: '1rem',
    lineHeight: '1rem',
  },
  pageTitle: {
    fontSize: '8.0rem',
    lineHeight: '8.0rem',
  },
  h1: {
    fontSize: '6.4rem',
    lineHeight: '7.2rem',
  },
  h2: {
    fontSize: '5.6rem',
    lineHeight: '6.0rem',
  },
  h3: {
    fontSize: '4.8rem',
    lineHeight: '4.8rem',
  },
  h4: {
    fontSize: '4.0rem',
    lineHeight: '4.0rem',
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
  p {
    text-align: left;
  }

  p,
  a {
    font-family: 'Charlie_Display_Regular';
    font-size: ${fontSizes.paragraph.fontSize};
    line-height: ${fontSizes.paragraph.lineHeight};
    margin-top: 2.8rem !important;
  }
`;

const Headings = css`
  h1 {
    font-size: ${fontSizes.h1.fontSize};
    line-height: ${fontSizes.h1.lineHeight};
    font-family: 'Charlie_Display_Semibold';
  }

  h1.ak-presentationmode__page-title {
    font-size: ${fontSizes.pageTitle.fontSize};
    line-height: ${fontSizes.pageTitle.lineHeight};
    font-family: 'Charlie_Display_Bold';
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

const Fonts = css`
  @font-face {
    font-family: 'Charlie_Display_Regular';
    src: url('https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Regular-1-7c1c0a53957fc3b9f2716e8f26d50cf1.woff')
        format('font-woff'),
      url('https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Regular-1-7c1c0a53957fc3b9f2716e8f26d50cf1.woff')
        format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Charlie_Display_Semibold';
    src: url('https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Semibold-1-aa4aa85c7ef84dd4cb06bba4cd08a1b6.woff')
        format('font-woff'),
      url('https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Semibold-1-aa4aa85c7ef84dd4cb06bba4cd08a1b6.woff')
        format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Charlie_Display_Bold';
    src: url('https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Bold-1-6bf3af7a4a02d59eb95811b5a85ea443.woff')
        format('font-woff'),
      url('https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Bold-1-6bf3af7a4a02d59eb95811b5a85ea443.woff')
        format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

const PageTitle = css`
  .ak-presentationmode__author-name small {
    text-transform: uppercase;
    font-family: 'Charlie_Display_Regular';
    font-size: ${fontSizes.authorName.fontSize};
    line-height: ${fontSizes.authorName.lineHeight};
  }
`;

export const StyleWrapper = styled(StyleWrapperRenderer)`
  ${Fonts};
  ${PageTitle};
  ${Headings};
  ${Paragraphs};
  ${Status};
  ${Lists};
`;
