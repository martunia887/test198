// @flow
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { N0, N800 } from '@atlaskit/theme/colors';
import { multiply } from '@atlaskit/theme/math';

export const GroupsWrapper = styled.div`
  padding: ${multiply(gridSize, 4)}px;
`;

export const DropImitation = styled.div`
  background: ${N0};
  margin-top: ${gridSize}px;
  width: 300px;
`;

export const ItemsNarrowContainer = styled.div`
  align-items: center;
  background: ${N0};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${gridSize}px;
  width: auto;
`;

export const BlockTrigger = styled.div`
  border: 1px solid ${N800};
`;
