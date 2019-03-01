import * as React from 'react';
import styled from 'styled-components';

import { colors } from '@atlaskit/theme';
import PanelTextInput from '../../../ui/PanelTextInput';

import { JiraSelect, Options } from './JiraSelect';
import { createMetaJson } from './data/createMeta';
import { EditorView } from 'prosemirror-view';
import { NodeType } from 'prosemirror-model';

const projects: Options = createMetaJson.projects.map(project => ({
  label: project.name,
  value: project.key,
  iconUrl: project.avatarUrls['16x16'],
  id: project.id,
}));

export const issueTypes: Options = createMetaJson.projects[1].issuetypes.map(
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

interface Props {
  view: EditorView;
  getPos: () => number;
}

export default class JiraCreate extends React.Component<Props> {
  iconUrl =
    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype';
  projectKey: string;

  projectId: number;
  issueTypeId: number;

  changeType = e => {
    this.iconUrl = e.icon;
    this.issueTypeId = e.value;
  };

  changeProject = e => {
    this.projectKey = e.value;
    this.projectId = e.id;
  };

  createCard = (key, link, iconUrl, ticketTitle) => {
    const cardAttrs = {
      data: {
        '@type': ['Object', 'atlassian:Task'],
        '@context': {
          '@vocab': 'https://www.w3.org/ns/activitystreams#',
          atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
          schema: 'http://schema.org/',
        },
        url: 'https://jira.atlassian.com/browse/MAC-123',
        generator: {
          '@type': 'Application',
          '@id': 'https://www.atlassian.com/#Jira',
          name: 'Jira',
        },
        isCompleted: false,
        isDeleted: false,
        name: ticketTitle,
        tag: {
          name: 'Backlog',
        },
        taskType: {
          '@type': ['Object', 'atlassian:TaskType'],
          '@id': 'https://www.atlassian.com/#JiraCustomTaskType',
          name: 'JiraCustomTaskType',
        },
        icon: {
          url: this.iconUrl,
        },
      },
    };

    const { getPos, view } = this.props;
    const { state, dispatch } = view;
    const pos = getPos();

    const { inlineCard }: { inlineCard: NodeType } = view.state.schema.nodes;
    const node = inlineCard.createChecked(cardAttrs);

    console.log(node);

    dispatch(state.tr.replaceWith(pos, pos + 1, node));
  };

  createTicket = ticketTitle => {
    const requestBody = {
      fields: {
        summary: 'New Issue created',
        project: {
          id: this.projectId,
        },
        issuetype: {
          id: this.issueTypeId,
        },
      },
    };

    fetch('https://product-fabric.atlassian.net/rest/api/3/issue', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(requestBody),
    })
      .then(_ => _.json())
      .then(json =>
        this.createCard(json.key, json.self, this.iconUrl, ticketTitle),
      );
  };

  render() {
    return (
      <Wrapper>
        <JiraSelect
          onChange={this.changeProject}
          isSearchable
          options={projects}
        />
        <JiraSelect
          onChange={this.changeType}
          iconOnly
          options={issueTypes}
          minWidth={55}
          defaultValue={{
            label: 'Task',
            value: '10002',
            iconUrl: this.iconUrl,
          }}
        />
        <PanelTextInput
          placeholder="What needs to be done?"
          onSubmit={this.createTicket}
        />
      </Wrapper>
    );
  }
}
