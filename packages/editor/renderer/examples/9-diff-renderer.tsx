import * as React from 'react';
import { DiffRenderer } from '../src/ui';
import { diffDocs } from './helper/diff-data';
import { ToggleStateless } from '@atlaskit/toggle';
import Select from '@atlaskit/select';
import {
  Editor,
  WithEditorActions,
  EditorContext,
} from '@atlaskit/editor-core';

export interface State {
  diffOnly?: boolean;
  showDiff?: boolean;
  doc: string;
  newDocument: object;
  oldDocument: object;
}

const editorSettings = {
  allowCodeBlocks: { enableKeybindingsForIDE: true },
  allowLists: true,
  allowTextColor: true,
  allowTables: { advanced: true },
  allowBreakout: true,
  allowJiraIssue: true,
  allowUnsupportedContent: true,
  allowPanel: true,
  allowExtension: { allowBreakout: true },
  allowRule: true,
  allowDate: true,
  allowLayouts: { allowBreakout: true },
  allowTextAlignment: true,
  allowIndentation: true,
  allowDynamicTextSizing: true,
  allowTemplatePlaceholders: { allowInserting: true },
  allowStatus: true,
};

const items = [
  {
    value: 'simple',
    label: 'Simple',
    defaultSelected: true,
  },
  {
    value: 'table',
    label: 'Table',
  },
  {
    value: 'lists',
    label: 'Lists',
  },
  {
    value: 'demo',
    label: 'Demo',
  },
  {
    value: 'simple2',
    label: 'Simple 2',
  },
];

export class DiffDemo extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      diffOnly: false,
      showDiff: true,
      doc: 'demo',
      oldDocument: diffDocs['demo'].oldDocument,
      newDocument: diffDocs['demo'].newDocument,
    };
  }

  onDiffOnlyChange = () => {
    this.setState({
      diffOnly: !this.state.diffOnly,
    });
  };

  onShowDiffChange = () => {
    this.setState({
      showDiff: !this.state.showDiff,
    });
  };

  setDocument = (doc: string) => {
    this.setState({
      doc: doc,
      oldDocument: diffDocs[doc].oldDocument,
      newDocument: diffDocs[doc].newDocument,
    });
  };

  renderDiff() {
    const { diffOnly, showDiff } = this.state;
    if (!showDiff) {
      return null;
    }

    return (
      <div
        style={{
          flex: '1 1 0',
          boxSizing: 'border-box',
          padding: '0 10px 0 0',
          margin: '0 10px 0 0',
          borderRight: '1px solid #EBECF0',
        }}
      >
        <strong>Diff</strong>
        <DiffRenderer
          oldDocument={this.state.oldDocument}
          newDocument={this.state.newDocument}
          diffOnly={diffOnly}
        />
      </div>
    );
  }

  private oldDocChanged = async editorActions => {
    const adf = await editorActions.getValue();
    this.setState({ oldDocument: adf });
  };
  private newDocChanged = async editorActions => {
    const adf = await editorActions.getValue();
    this.setState({ newDocument: adf });
  };

  render() {
    const { diffOnly, showDiff } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: '1 1 0',
            boxSizing: 'border-box',
            padding: '0 10px 0 0',
            margin: '0 10px 0 0',
            borderRight: '1px solid #EBECF0',
          }}
        >
          <strong>Old Document</strong>
          <EditorContext>
            <WithEditorActions
              render={actions => (
                <Editor
                  defaultValue={this.state.oldDocument}
                  {...editorSettings}
                  onChange={() => this.oldDocChanged(actions)}
                />
              )}
            />
          </EditorContext>
        </div>
        {this.renderDiff()}
        <div style={{ flex: '1 1 0' }}>
          <strong>New Document</strong>
          <EditorContext>
            <WithEditorActions
              render={actions => (
                <Editor
                  defaultValue={this.state.newDocument}
                  {...editorSettings}
                  onChange={() => this.newDocChanged(actions)}
                />
              )}
            />
          </EditorContext>
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            padding: '10px',
            marginLeft: '10px',
            width: '200px',
            borderLeft: '1px solid #EBECF0',
          }}
        >
          <ToggleStateless
            isChecked={showDiff}
            onChange={this.onShowDiffChange}
          />{' '}
          Show diff
          <br />
          <br />
          <ToggleStateless
            isChecked={!diffOnly}
            onChange={this.onDiffOnlyChange}
          />{' '}
          {diffOnly ? 'Changes only' : 'Whole document'}
          <br />
          <br />
          Pick a document:
          <Select
            options={items}
            onChange={({ value }: { value: string }) => {
              this.setDocument(value);
            }}
            defaultValue={items.find(opt => opt.value === this.state.doc)}
          />
        </div>
      </div>
    );
  }
}

export default function Example() {
  return <DiffDemo />;
}
