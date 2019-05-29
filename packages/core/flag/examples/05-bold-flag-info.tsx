import React from 'react';
import { N500 } from '@atlaskit/theme/colors';
import InfoIcon from '@atlaskit/icon/glyph/info';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      appearance="info"
      icon={<InfoIcon label="Info" secondaryColor={N500} />}
      id="info"
      key="info"
      title="Connecting"
      description="We are talking to the interwebs, please hold."
      actions={[{ content: 'Good luck', onClick: () => {} }]}
    />
  </FlagGroup>
);
