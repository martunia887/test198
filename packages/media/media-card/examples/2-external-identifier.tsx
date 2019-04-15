import * as React from 'react';
import { Component } from 'react';
import {
  createStorybookMediaClientConfig,
  atlassianLogoUrl,
  imageFileId,
} from '@atlaskit/media-test-helpers';
import { MediaClientConfigContext } from '@atlaskit/media-core';
import { ExternalImageIdentifier } from '@atlaskit/media-client';
import { Card } from '../src';
import { ExternalIdentifierWrapper } from '../example-helpers/styled';

const mediaClientConfig = createStorybookMediaClientConfig();

const externalIdentifierWithName: ExternalImageIdentifier = {
  mediaItemType: 'external-image',
  dataURI: atlassianLogoUrl,
  name: 'me',
};
const externalIdentifier: ExternalImageIdentifier = {
  mediaItemType: 'external-image',
  dataURI: atlassianLogoUrl,
};

class Example extends Component {
  render() {
    return (
      <ExternalIdentifierWrapper>
        <MediaClientConfigContext.Provider value={mediaClientConfig}>
          <div>
            <h2>External image identifier</h2>
            <Card identifier={externalIdentifier} />
          </div>
          <div>
            <h2>External image identifier with name</h2>
            <Card identifier={externalIdentifierWithName} />
          </div>
          <div>
            <h2>File identifier</h2>
            <Card identifier={imageFileId} />
          </div>
        </MediaClientConfigContext.Provider>
      </ExternalIdentifierWrapper>
    );
  }
}

export default () => <Example />;
