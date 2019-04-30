// @flow
import React from 'react';
import { Example } from '@atlaskit/docs';

export default (title: string, exampleFileName: string) => {
  return (
    <Example
      packageName="@atlaskit/button"
      // $FlowFixMe - Calls to require() should use string literal
      Component={require(`../../variants/${exampleFileName}`).default} // eslint-disable-line
      title={title}
      // $FlowFixMe - Calls to require() should use string literal
      source={require(`!!raw-loader!../../variants/${exampleFileName}`)} // eslint-disable-line
    />
  );
};
