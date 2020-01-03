import React from 'react';
import { Example } from '@atlaskit/docs';

export default ({ Component, source, ...rest }) => (
  <Example Component={Component} source={Component.__raw || source} {...rest} />
);
