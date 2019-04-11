// @flow
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { colors, gridSize, math, themed } from '@atlaskit/theme';

import { flexMaxHeightIEFix } from '../utils/flex-max-height-ie-fix';

// Constants
// ==============================
const innerGutter = 16;
const outerGutter = 20;
const keylineColor = themed({ light: colors.N30, dark: colors.DN30 });
export const keylineHeight = 2;

// Wrapper
// ==============================

export const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  ${flexMaxHeightIEFix};
`;

// Header
// ==============================
export const Header = styled.header`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  transition: box-shadow 200ms;
  z-index: 1;
  padding: ${outerGutter}px ${outerGutter}px ${innerGutter - keylineHeight}px;
  box-shadow: ${props =>
    props.showKeyline
      ? `0 ${keylineHeight}px 0 0 ${keylineColor(props)}`
      : 'none'};
`;

export const Title = styled.h4`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 1;
  margin: 0;
  min-width: 0;
`;

export const TitleText = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  word-wrap: break-word;
  width: 100%;
  ${props =>
    !props.isHeadingMultiline &&
    `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
`;

const iconColor = {
  danger: colors.R400,
  warning: colors.Y400,
};

export const titleIconWrapperStyles = (appearance: string) => css`
  color: ${iconColor[appearance]};
  margin-right: ${gridSize()}px;
  flex: 0 0 auto;
`;

// Body
// ==============================

/**
  Adding the padding here avoids cropping box shadow on first/last
  children. The combined vertical spacing is maintained by subtracting the
  keyline height from header and footer.
*/
export const bodyStyles = (shouldScroll?: boolean) => css`
  flex: 1 1 auto;
  ${shouldScroll
    ? `
        overflow-y: auto;
        overflow-x: hidden;
        padding: ${keylineHeight}px ${outerGutter}px;
      `
    : `
        padding: 0 ${outerGutter}px;
      `}

  @media (min-width: 320px) and (max-width: 480px) {
    overflow-y: auto;
    height: 100%;
  }
`;

export const Body = styled.div`
  ${props => bodyStyles(props.shouldScroll)}
`;

// Footer
// ==============================
export const Footer = styled.footer`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  transition: box-shadow 200ms;
  z-index: 1;
  padding: ${innerGutter - keylineHeight}px ${outerGutter}px ${outerGutter}px;
  box-shadow: ${props =>
    props.showKeyline
      ? `0 -${keylineHeight}px 0 0 ${keylineColor(props)}`
      : 'none'};
`;

export const Actions = styled.div`
  display: inline-flex;
  margin: 0 -${math.divide(gridSize, 2)}px;
`;

export const ActionItem = styled.div`
  flex: 1 0 auto;
  margin: 0 ${math.divide(gridSize, 2)}px;
`;
