import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ReactNodeView } from '../../../nodeviews';

import { JiraSelect, Options } from './JiraSelect';
import json from './data/createMeta.json';

const projects: Options = json.projects.map(project => ({
  label: project.name,
  value: project.key,
  iconUrl: project.avatarUrls['16x16'],
}));

const issueTypes: Options = json.projects[0].issuetypes.map(issueType => ({
  label: issueType.name,
  value: issueType.id,
  iconUrl: issueType.iconUrl,
}));

const JiraCreate = styled.div`
  display: inline-flex;
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export class JiraCreateNode extends React.Component<Props, {}> {
  render() {
    return (
      <JiraCreate>
        <JiraSelect options={projects} />
        <JiraSelect options={issueTypes} />
      </JiraCreate>
    );
  }
}

class InlineJiraView extends ReactNodeView {
  getContentDOM() {
    const dom = document.createElement('span');
    dom.className = 'jiraView-content-wrap';
    return { dom };
  }

  createDomRef(): HTMLElement {
    return document.createElement('span');
  }

  render(props, forwardRef) {
    return <JiraCreateNode view={this.view} />;
  }
}

export default InlineJiraView;
