// @flow
import { css } from '@emotion/core';
import { colors } from '@atlaskit/theme';

const placeholderStyles = props => css`
  color: ${colors.placeholderText(props)};
  font-size: 14px;
`;

export default placeholderStyles;
