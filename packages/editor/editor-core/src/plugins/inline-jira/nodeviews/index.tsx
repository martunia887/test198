import * as React from 'react';
// import * as ReactDOM from 'react-dom';
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

export const issueTypes: Options = json.projects[0].issuetypes.map(
  issueType => ({
    label: issueType.name,
    value: issueType.id,
    iconUrl: issueType.iconUrl,
  }),
);

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

class InlineJiraView extends ReactNodeView {
  render(props) {
    return <JiraCreateNode />;
  }

  stopEvent(event) {
    return !!(this.dom && this.dom.contains(event.target));
  }

  ignoreMutation() {
    return true;
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
