// @flow
import React from 'react';

import { Skeleton } from '../src';
import { Block, Gap } from '../examples-util/helpers';

export default () => (
  <div>
    <Block heading="Circle">
      <Skeleton name="xxlarge" size="xxlarge" />
      <Gap />
      <Skeleton name="xlarge" size="xlarge" />
      <Gap />
      <Skeleton name="large" size="large" />
      <Gap />
      <Skeleton name="medium" size="medium" />
      <Gap />
      <Skeleton name="small" size="small" />
      <Gap />
      <Skeleton name="xsmall" size="xsmall" />
    </Block>
    <Block heading="Square">
      <Skeleton appearance="square" size="xxlarge" />
      <Gap />
      <Skeleton appearance="square" size="xlarge" />
      <Gap />
      <Skeleton appearance="square" size="large" />
      <Gap />
      <Skeleton appearance="square" size="medium" />
      <Gap />
      <Skeleton appearance="square" size="small" />
      <Gap />
      <Skeleton appearance="square" size="xsmall" />
    </Block>
  </div>
);
