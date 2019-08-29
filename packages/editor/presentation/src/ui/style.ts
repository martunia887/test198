import { StyleWrapper as StyleWrapperRenderer } from '@atlaskit/renderer';
import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme';

const Paragraphs = css`
  p,
  a,
  small {
    font-size: 1.4rem;
    font-family: 'Charlie_Display_Regular';
    line-height: 2.4rem;
    margin-top: 1.6rem;
  }
`;

const Headings = css`
  h1 {
    font-size: 4.8rem;
    font-family: 'Charlie_Display_Semibold';
    line-height: 5.6rem;
    margin-top: 4rem;
  }

  h2 {
    font-size: 3.6rem;
    font-family: 'Charlie_Display_Semibold';
    line-height: 4rem;
    margin-top: 3.2rem;
  }

  h3 {
    font-size: 2.8rem;
    font-family: 'Charlie_Display_Semibold';
    line-height: 3.2rem;
    margin-top: 2.4rem;
  }

  h4 {
    font-size: 2.2rem;
    font-family: 'Charlie_Display_Semibold';
    line-height: 2.8rem;
    margin-top: 2.8rem;
  }

  h5 {
    font-size: 1.8rem;
    font-family: 'Charlie_Display_Semibold';
    line-height: 2rem;
    margin-top: 2rem;
  }

  h6 {
    font-size: 1.6rem;
    font-family: 'Charlie_Display_Semibold';
    line-height: 2rem;
    margin-top: 1.8rem;
    color: ${colors.N80};
  }
`;

export const StyleWrapper = styled(StyleWrapperRenderer)`
  ${Headings};
  ${Paragraphs};
`;
