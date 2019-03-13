import * as React from 'react';
import {
  I18NWrapper,
  errorFileId,
  createStorybookMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { Card } from '../src';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createStorybookMediaClientConfig();

class Example extends React.Component {
  render() {
    return (
      <MediaClientConfigContext.Provider value={mediaClientConfig}>
        <I18NWrapper>
          <Card identifier={errorFileId} />
        </I18NWrapper>
      </MediaClientConfigContext.Provider>
    );
  }
}

export default () => <Example />;
