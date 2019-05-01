// @flow
import React from 'react';
import Avatar from '../src';
import { Block, Gap } from '../examples-util/helpers';

export default () => (
  <Block heading="Square">
    <Avatar appearance="square" name="large" size="large" status="approved" />
    <Gap />
    <Avatar appearance="square" name="medium" size="medium" status="declined" />
    <Gap />
    <Avatar appearance="square" name="small" size="small" status="locked" />
    <Gap />
    <Avatar appearance="square" name="xsmall" size="xsmall" />
  </Block>
);
