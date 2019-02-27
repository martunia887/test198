// @flow
import styled, { css } from 'styled-components';
import { themed, math } from '@atlaskit/theme';
import { R400, R300, Y300, N500, N0, DN40, N700 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const TRANSITION_DURATION = '0.25s ease-in-out';

/* Container */
export const getMaxHeight = ({
  appearance,
}: {
  appearance: 'warning' | 'error' | 'announcement',
}) => (appearance === 'announcement' ? '88px' : '52px');

export const backgroundColor = themed('appearance', {
  error: { light: R400, dark: R300 },
  warning: { light: Y300, dark: Y300 },
  announcement: { light: N500, dark: N500 },
});

export const Container = styled.div`
  max-height: ${getMaxHeight};
  overflow: ${({ appearance }) =>
    appearance === 'announcement' ? 'scroll' : 'visible'};
  background-color: ${backgroundColor};
`;

export const testErrorBackgroundColor = R400;
export const testErrorTextColor = N0;

export const textColor = themed('appearance', {
  error: { light: N0, dark: DN40 },
  warning: { light: N700, dark: DN40 },
  announcement: { light: N0, dark: N0 },
});
export const Content = styled.div`
  align-items: center;
  background-color: ${backgroundColor};
  color: ${textColor};
  display: flex;
  fill: ${backgroundColor};
  font-weight: 500;
  justify-content: center;
  padding: ${math.multiply(gridSize, 2)}px;
  text-align: center;
  ${'' /* transition: color ${TRANSITION_DURATION}; */}

  margin: auto;
  ${({ appearance }) =>
    appearance === 'announcement'
      ? 'max-width: 876px;'
      : ''} transition: color ${TRANSITION_DURATION};

  a,
  a:visited,
  a:hover,
  a:active,
  a:focus {
    color: ${textColor};
    text-decoration: underline;
  }
`;

export const Icon = styled.span`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
`;

const textOverflow = ({
  appearance,
}: {
  appearance: 'announcement' | 'warning' | 'error',
}) =>
  appearance === 'announcement'
    ? ''
    : css`
        text-overflow: ellipsis;
        white-space: nowrap;
      `;

export const Visibility = styled.div`
  max-height: ${({ bannerHeight, isOpen }) => (isOpen ? bannerHeight : 0)}px;
  overflow: hidden;
  transition: max-height ${TRANSITION_DURATION};
`;

export const Text = styled.span`
  flex: 0 1 auto;
  padding-left: ${math.divide(gridSize, 2)}px;
  ${textOverflow};
  overflow: hidden;
`;
