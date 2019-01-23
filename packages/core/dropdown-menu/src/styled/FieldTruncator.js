// @flow

import styled from 'styled-components';
import * as React from 'react';

const Wrapper = styled.div`
  ${({ triggerMaxWidth }) => `max-width: ${triggerMaxWidth}px`}
`;

const Title = styled.span`
  max-width: ${({ triggerMaxWidth }) => `${triggerMaxWidth}px;`}
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
`;

export const FieldTruncator = props => {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  );
};
