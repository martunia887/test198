// @flow
import React from 'react';
import Avatar, { Presence } from '../src';
import { Block, ShrinkWrap } from '../examples-util/helpers';

export default () => (
  <Block>
    <ShrinkWrap>
      <Presence presence="busy" />
    </ShrinkWrap>
    <Avatar size="medium" presence="busy" />
  </Block>
);
