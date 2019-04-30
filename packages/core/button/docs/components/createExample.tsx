import * as React from 'react';
import { Example } from '@atlaskit/docs';

export default (title: string, exampleFileName: string) => {
  return (
    <Example
      packageName="@atlaskit/button"
      Component={require(`../../variants/${exampleFileName}`).default}
      title={title}
      source={require(`!!raw-loader!../../variants/${exampleFileName}`)}
    />
  );
};
