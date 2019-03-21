import * as React from 'react';
import { DiffRenderer } from '../src/ui';
import { diffDocs } from './helper/diff-data';
import { ToggleStateless } from '@atlaskit/toggle';
import Select from '@atlaskit/select';
import {
  Editor,
  WithEditorActions,
  EditorContext,
  EditorActions,
} from '@atlaskit/editor-core';
import { debounce } from 'throttle-debounce';
import { emoji } from '@atlaskit/util-data-test';

export interface State {
  diffOnly?: boolean;
  showDiff?: boolean;
  showAdf?: boolean;
  doc: string;
  newDocument: object;
  oldDocument: object;
}

const emojiProvider = emoji.storyData.getEmojiResource({
  uploadSupported: true,
  currentUser: {
    id: emoji.storyData.loggedUser,
  },
});

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
  emojiProvider: emojiProvider,
};

const items = [
  {
    value: 'simple',
    label: 'Simple',
    defaultSelected: true,
  },
  {
    value: 'simple2',
    label: 'Simple 2',
  },
  {
    value: 'complex',
    label: 'Full document',
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
];
const defaultValue = 'simple2';

export class DiffDemo extends React.Component<{}, State> {
  oldEditorActions: EditorActions;
  newEditorActions: EditorActions;

  constructor(props: any) {
    super(props);
    this.state = {
      diffOnly: false,
      showDiff: true,
      showAdf: false,
      doc: defaultValue,
      oldDocument: diffDocs[defaultValue].oldDocument,
      newDocument: diffDocs[defaultValue].newDocument,
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

  onShowAdf = () => {
    this.setState({
      showAdf: !this.state.showAdf,
    });
  };

  setDocument = async (doc: string) => {
    await this.setState({
      doc: doc,
      oldDocument: diffDocs[doc].oldDocument,
      newDocument: diffDocs[doc].newDocument,
    });
    if (this.oldEditorActions && this.newEditorActions) {
      this.oldEditorActions.replaceDocument(this.state.oldDocument);
      this.newEditorActions.replaceDocument(this.state.newDocument);
    }
  };

  renderDiff() {
    const { diffOnly, showDiff, showAdf } = this.state;
    if (!showDiff) {
      return null;
    }

    return (
      <div
        style={{
          width: '33%',
          padding: '0 5px',
        }}
      >
        <strong>Diff</strong>
        <DiffRenderer
          oldDocument={this.state.oldDocument}
          newDocument={this.state.newDocument}
          diffOnly={diffOnly}
          showAdf={showAdf}
        />
      </div>
    );
  }

  private oldDocChanged = debounce(200, async editorActions => {
    const adf = await editorActions.getValue();
    this.setState({ oldDocument: adf });
  });
  private newDocChanged = debounce(200, async editorActions => {
    const adf = await editorActions.getValue();
    this.setState({ newDocument: adf });
  });

  render() {
    const { diffOnly, showDiff, showAdf } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
        <div
          style={{
            flexDirection: 'row',
          }}
        >
          Pick a document:{' '}
          <span style={{ width: '200px', display: 'inline-block' }}>
            <Select
              options={items}
              onChange={({ value }: { value: string }) => {
                this.setDocument(value);
              }}
              defaultValue={items.find(opt => opt.value === this.state.doc)}
            />
          </span>{' '}
          <ToggleStateless
            isChecked={showDiff}
            onChange={this.onShowDiffChange}
          />{' '}
          Show diff{' '}
          <ToggleStateless
            isChecked={!diffOnly}
            onChange={this.onDiffOnlyChange}
          />{' '}
          {diffOnly ? 'Changes only' : 'Whole document'}
          <ToggleStateless isChecked={showAdf} onChange={this.onShowAdf} /> Show
          ADF
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
          <div
            style={{
              width: '33%',
            }}
          >
            <strong>Old Document</strong>
            <EditorContext>
              <WithEditorActions
                render={actions => {
                  this.oldEditorActions = actions;
                  return (
                    <Editor
                      defaultValue={this.state.oldDocument}
                      {...editorSettings}
                      onChange={() => this.oldDocChanged(actions)}
                    />
                  );
                }}
              />
            </EditorContext>
          </div>
          {this.renderDiff()}
          <div style={{ width: '33%' }}>
            <strong>New Document</strong>
            <EditorContext>
              <WithEditorActions
                render={actions => {
                  this.newEditorActions = actions;
                  return (
                    <Editor
                      defaultValue={this.state.newDocument}
                      {...editorSettings}
                      onChange={() => this.newDocChanged(actions)}
                    />
                  );
                }}
              />
            </EditorContext>
          </div>
        </div>
      </div>
    );
  }
}

export default function Example() {
  return <DiffDemo />;
}
