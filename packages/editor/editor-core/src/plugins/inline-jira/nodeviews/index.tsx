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
  border: 1px solid #eeeeec;
  padding: 8px;
  min-width: 400px;
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

interface State {
  text: string;
}

export class JiraCreateNode extends React.Component<Props, State> {
  state = {
    text: '',
  };

  onChange = e => {
    this.setState(
      {
        text: e.target.value,
      },
      () => {
        console.log('am i going crazy', this.state.text);
      },
    );

    e.preventDefault();
  };

  render() {
    console.log(this.state.text);

    return (
      <JiraCreate>
        <JiraSelect options={projects} />
        <JiraSelect options={issueTypes} />
        <input onChange={this.onChange} type="text" value={this.state.text} />
        {this.state.text}
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

  ignoreMutation() {
    return true;
  }

  stopEvent(e) {
    console.log('got event', e);
    return true;
  }
}

export default InlineJiraView;
