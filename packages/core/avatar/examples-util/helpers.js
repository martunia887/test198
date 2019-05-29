// @flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { text, N100, R50, R400, subtleHeading } from '@atlaskit/theme/colors';
import { divide, multiply } from '@atlaskit/theme/math';

const Wrapper = styled.div`
  margin-top: ${gridSize}px;
`;

const ChildrenWrapper = styled.div`
  align-items: baseline;
  color: ${text};
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-right: ${gridSize}px;
  }
`;

export const Note = styled.p`
  color: ${N100};
  font-size: ${props => (props.size === 'large' ? '1.15em' : '0.9rem')};
  margin-top: ${divide(gridSize, 2)}px;
  margin-bottom: ${multiply(gridSize, 2)}px;
`;

export const Code = styled.code`
  background-color: ${R50};
  border-radius: 0.2em;
  color: ${R400};
  font-size: 0.85em;
  line-height: 1.1;
  padding: 0.1em 0.4em;
`;

export const Gap = styled.span`
  margin-right: ${gridSize}px;
`;

export const ShrinkWrap = styled(Gap)`
  height: ${multiply(gridSize, 3)}px;
  width: ${multiply(gridSize, 3)}px;
`;
export const Heading = styled.div`
  color: ${subtleHeading};
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

export const Block = ({
  children,
  heading,
}: {
  children: ?Node,
  heading?: string,
}) => (
  <Wrapper>
    {heading ? <Heading>{heading}</Heading> : null}
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </Wrapper>
);
