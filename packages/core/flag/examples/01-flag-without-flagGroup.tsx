import React from 'react';
import { G300 } from '@atlaskit/theme/colors';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import Flag from '../src';

export default () => (
  <Flag
    actions={[
      { content: 'Show me', onClick: () => {} },
      { content: 'No thanks', onClick: () => {} },
    ]}
    icon={<SuccessIcon primaryColor={G300} label="Info" />}
    description="We got fun an games. We got everything you want honey, we know the names."
    id="1"
    key="1"
    title="Welcome to the jungle"
  />
);
