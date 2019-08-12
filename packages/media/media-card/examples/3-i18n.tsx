import * as React from 'react';
import {
  I18NWrapper,
  errorFileId,
  createStorybookMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { Card } from '../src';
import { AnalyticsMediaListener } from './exampleUtils';

const mediaClientConfig = createStorybookMediaClientConfig();

export default () => (
  <AnalyticsMediaListener>
    <I18NWrapper>
      <Card mediaClientConfig={mediaClientConfig} identifier={errorFileId} />
    </I18NWrapper>
  </AnalyticsMediaListener>
);
