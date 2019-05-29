import React from 'react';
import { R400 } from '@atlaskit/theme/colors';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      appearance="error"
      icon={<ErrorIcon label="Error" secondaryColor={R400} />}
      id="error"
      key="error"
      title="We couldn't connect"
      description="Sorry about that. Try checking your internet connection or check the status on our end."
      actions={[{ content: 'Check StatusPage', onClick: () => {} }]}
    />
  </FlagGroup>
);
