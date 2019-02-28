import * as React from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { replaceSelectedNode } from 'prosemirror-utils';
import { colors } from '@atlaskit/theme';

import { setNodeSelection } from '../../../utils';
import PanelTextInput from '../../../ui/PanelTextInput';
import { getPosHandler } from '../../../nodeviews/ReactNodeView';
import { JiraSelect, OptionType } from './JiraSelect';
import createMetaJson from './data/createMeta.json';

const projects: Array<OptionType> = createMetaJson.projects.map(project => ({
  label: project.name,
  value: project.id,
  iconUrl: project.avatarUrls['16x16'],
}));

const issueType2Option = issueType => ({
  label: issueType.name,
  value: issueType.id,
  iconUrl: issueType.iconUrl,
});

// NOTE: Keeping it for you ED
export const issueTypes: Array<
  OptionType
> = createMetaJson.projects[1].issuetypes.map(issueType2Option);

const getIssueTypesForProject = projectId =>
  createMetaJson.projects
    .filter(project => project.id === projectId)[0]
    .issuetypes.map(issueType2Option);

const Wrapper = styled.div`
  display: inline-flex;
  border: 1px solid ${colors.N40};
  border-radius: 3px;
  .ProseMirror-selectednode & {
    border-color: ${props =>
      props['data-has-error'] ? colors.R400 : colors.B100};
  }
  > input {
    padding: 0 8px 0 4px;
    min-width: 250px;
  }
`;

interface Props {
  view: EditorView;
  getPos: getPosHandler;
}

interface State {
  issueTypes: Array<OptionType>;
  project?: OptionType;
  issueType?: OptionType;
  summary?: string;
  hasError: boolean;
}

export default class JiraCreate extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const LS_defaultProject = localStorage.getItem(
      'atlassian.editor.shipit.jiraQuery.project',
    );
    const defaultProject = LS_defaultProject
      ? JSON.parse(LS_defaultProject)
      : undefined;

    this.state = {
      hasError: false,
      issueTypes: defaultProject
        ? getIssueTypesForProject(defaultProject.value)
        : issueTypes,
      project: defaultProject,
      issueType: {
        label: 'Task',
        value: '10002',
        iconUrl:
          'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype',
      },
    };
  }

  render() {
    const { issueTypes, issueType, project, hasError } = this.state;
    return (
      <Wrapper data-has-error={hasError}>
        <JiraSelect
          isSearchable
          options={projects}
          value={project}
          onChange={project => {
            this.setState({
              project,
              hasError: false,
              issueTypes: getIssueTypesForProject(project.value),
            });
            localStorage.setItem(
              'atlassian.editor.shipit.jiraQuery.project',
              JSON.stringify(project),
            );
          }}
        />
        <JiraSelect
          iconOnly
          options={issueTypes}
          minWidth={55}
          value={issueType}
          onChange={issueType => this.setState({ issueType, hasError: false })}
        />
        <PanelTextInput
          onMouseDown={this.handleNodeSelect}
          placeholder="What needs to be done?"
          onChange={summary => this.setState({ summary, hasError: false })}
          onSubmit={this.handleIssueCreate}
        />
      </Wrapper>
    );
  }

  handleNodeSelect = () => {
    setNodeSelection(this.props.view, this.props.getPos());
  };

  handleIssueCreate = () => {
    const { issueType, project, summary } = this.state;
    if (!project || !issueType || !summary || !summary.trim()) {
      this.setState({ hasError: true });
      return false;
    }

    if (location.hostname === 'localhost') {
      setTimeout(() => {
        this.insertIssueLink('ED-1234');
      }, 150);
    } else {
      fetch(`https://product-fabric.atlassian.net/rest/api/3/issue`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            summary,
            project: { id: project.value },
            issuetype: issueType.value,
          },
        }),
      })
        .then(response => response.json())
        .then(json => {
          this.insertIssueLink(json.key);
        })
        .catch(_ => {
          alert('[ShipIt] Something went wrong!');
        });
    }
  };

  insertIssueLink = key => {
    const { view } = this.props;
    const {
      state: { schema, tr },
    } = view;

    const href = `https://product-fabric.atlassian.net/browse/${key}`;
    const mark = schema.marks.link.create({ href });
    const link = schema.text(href, [mark]);

    view.dispatch(replaceSelectedNode(link)(tr));
  };
}
