import * as React from 'react';
import { fetch } from 'window-or-global';

import OriginTracing from '@atlassiansox/origin-tracing';

import { SharePlugin } from '../src';

export default () => (
  <div>
    <SharePlugin
      cloudId={'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5'}
      objectId={'3358294727'}
      objectType={'page'}
      objectTitle={'Testing new page'}
      product={'confluence'}
      shareLink={
        'https://pug.jira-dev.com/wiki/spaces/~jhoarau/pages/634847330/Test+new+page'
      }
    />
  </div>
);
