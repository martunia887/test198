import * as React from 'react';
import styled from 'styled-components';

import { colors } from '@atlaskit/theme';
import PanelTextInput from '../../../ui/PanelTextInput';

import { JiraSelect, Options } from './JiraSelect';
import json from './data/createMeta.json';

const projects: Options = json.projects.map(project => ({
  label: project.name,
  value: project.key,
  iconUrl: project.avatarUrls['16x16'],
}));

export const issueTypes: Options = json.projects[1].issuetypes.map(
  issueType => ({
    label: issueType.name,
    value: issueType.id,
    iconUrl: issueType.iconUrl,
  }),
);

const Wrapper = styled.div`
  display: inline-flex;
  border: 1px solid ${colors.N40};
  border-radius: 3px;
  > input {
    padding: 0 8px 0 4px;
    min-width: 150px;
  }
`;

export default class JiraCreate extends React.Component {
  render() {
    return (
      <Wrapper>
        <JiraSelect isSearchable options={projects} />
        <JiraSelect
          iconOnly
          options={issueTypes}
          minWidth={55}
          defaultValue={{
            label: 'Task',
            value: '10002',
            iconUrl:
              'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype',
          }}
        />
        <PanelTextInput placeholder="What needs to be done?" />
      </Wrapper>
    );
  }
}
