// @flow
import React from 'react';
import Avatar, { Presence } from '../src';
import { Block, ShrinkWrap } from '../examples-util/helpers';

export default () => (
  <Block>
    <ShrinkWrap>
      <Presence presence="offline" />
    </ShrinkWrap>
    <Avatar size="medium" presence="offline" />
  </Block>
);
