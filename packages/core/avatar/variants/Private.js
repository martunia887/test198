// @flow
import React from 'react';
import Avatar, { Status } from '../src';
import { Block, ShrinkWrap } from '../examples-util/helpers';

export default () => (
  <Block>
    <ShrinkWrap>
      <Status status="locked" />
    </ShrinkWrap>
    <Avatar size="medium" status="locked" appearance="square" />
  </Block>
);
