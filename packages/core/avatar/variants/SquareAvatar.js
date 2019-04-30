// @flow
import React from 'react';
import Avatar from '../src';
import { Block, Gap } from '../examples-util/helpers';

export default () => (
  <Block heading="Square">
    <Avatar appearance="square" name="xxlarge" size="xxlarge" />
    <Gap />
    <Avatar appearance="square" name="xlarge" size="xlarge" status="approved" />
    <Gap />
    <Avatar appearance="square" name="large" size="large" status="declined" />
    <Gap />
    <Avatar appearance="square" name="medium" size="medium" status="locked" />
    <Gap />
    <Avatar appearance="square" name="small" size="small" />
    <Gap />
    <Avatar appearance="square" name="xsmall" size="xsmall" />
  </Block>
);
