import React from 'react';
import { Block, RetryContainer, Centered } from '../examples-utils';
import { ZoomIn, StaggeredEntrance } from '../src';

export default () => (
  <RetryContainer>
    <Centered>
      <StaggeredEntrance>
        <ZoomIn>{props => <Block {...props} appearance="small" />}</ZoomIn>
        <ZoomIn>{props => <Block {...props} appearance="small" />}</ZoomIn>
        <ZoomIn>{props => <Block {...props} appearance="small" />}</ZoomIn>
      </StaggeredEntrance>
    </Centered>
  </RetryContainer>
);
