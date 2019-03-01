// @flow
import { css } from '@emotion/core';

import styled from '@emotion/styled';
import { TableBodyCell } from '../TableCell';

const rankingStyles = css`
  box-sizing: border-box;
`;

export const RankableTableBodyCell = styled(TableBodyCell)`
  ${({ isRanking }) => isRanking && rankingStyles};
`;
