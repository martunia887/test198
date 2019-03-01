// @flow

import { css } from '@emotion/core';

import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';

const ThemeColor = {
  text: colors.N500,
};

const common = props => css`
  &:not(:hover):not(:active) {
    color: ${ThemeColor.text(props)};
  }
  font-weight: ${hasAuthor ? 500 : 'inherit'};
`;

export const Anchor = styled.a`
  ${p => common(p)};
`;
export const Span = styled.span`
  ${p => common(p)};
`;
