import React from 'react';
import { G300 } from '@atlaskit/theme/colors';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      description={
        <span>
          My favourite issue is{' '}
          <a href="https://ecosystem.atlassian.net/browse/AK-90210">AK-90210</a>
        </span>
      }
      icon={<SuccessIcon primaryColor={G300} label="Info" />}
      id="1"
      key="1"
      title="I am a Flag"
    />
  </FlagGroup>
);
