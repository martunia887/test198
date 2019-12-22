import * as React from 'react';

import { onSelection } from '../example-helpers';
import ConfigurableTeamMentionPicker from '../example-helpers/demo-configurable-mention-picker-with-team';
import MentionTextInput from '../example-helpers/demo-mention-text-input';

let config;

interface DefaultExport {
  default: any;
}

try {
  // eslint-disable-next-line import/no-unresolved, global-require
  config = (require('../local-config') as DefaultExport).default;
} catch (e) {
  // eslint-disable-next-line import/no-unresolved, global-require
  config = (require('../local-config-example') as DefaultExport).default;
}

const userConfig = config.sessionServiceWithTeam.user;
const teamMentionConfig = config.sessionServiceWithTeam.team;

export default function Example() {
  return (
    <ConfigurableTeamMentionPicker
      userMentionConfig={userConfig}
      teamMentionConfig={teamMentionConfig}
    >
      <MentionTextInput
        label="User and team search"
        onSelection={onSelection}
      />
    </ConfigurableTeamMentionPicker>
  );
}
