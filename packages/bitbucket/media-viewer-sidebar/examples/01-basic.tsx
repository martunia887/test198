// @flow
import React from 'react';
import Page, { Grid } from '@atlaskit/page';
import { MediaViewerSidebar } from '../src/index';
import MetadataTable from '../src/components/metadata-table';
import meta from '../example-helpers/meta/meta1';

export default () => (
  <MediaViewerSidebar>
    <h2>File details</h2>
    <MetadataTable meta={meta} />
  </MediaViewerSidebar>
);
