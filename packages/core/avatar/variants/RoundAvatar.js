// @flow
import React from 'react';
import Avatar from '../src';
import { Block, Gap } from '../examples-util/helpers';

export default () => (
  <Block heading="Circle">
    <Avatar name="xxlarge" size="xxlarge" />
    <Gap />
    <Avatar name="xlarge" size="xlarge" presence="online" />
    <Gap />
    <Avatar name="large" size="large" presence="offline" />
    <Gap />
    <Avatar name="medium" size="medium" presence="busy" />
    <Gap />
    <Avatar name="small" size="small" presence="focus" />
    <Gap />
    <Avatar name="xsmall" size="xsmall" />
  </Block>
);
