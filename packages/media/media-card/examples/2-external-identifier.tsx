import * as React from 'react';
import { Component } from 'react';
import {
  createStorybookContext,
  atlassianLogoUrl,
  imageFileId,
} from '@atlaskit/media-test-helpers';
import { ExternalImageIdentifier } from '@atlaskit/media-core';
import { Card } from '../src';
import { ExternalIdentifierWrapper } from '../example-helpers/styled';

const context = createStorybookContext();
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
        <div>
          <h2>External image identifier</h2>
          <Card context={context} identifier={externalIdentifier} />
        </div>
        <div>
          <h2>External image identifier with name</h2>
          <Card context={context} identifier={externalIdentifierWithName} />
        </div>
        <div>
          <h2>File identifier</h2>
          <Card context={context} identifier={imageFileId} />
        </div>
      </ExternalIdentifierWrapper>
    );
  }
}

export default () => <Example />;
