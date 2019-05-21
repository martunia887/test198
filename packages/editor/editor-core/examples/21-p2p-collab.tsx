import * as React from 'react';
import { Component } from 'react';

import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
  autoformattingProvider,
} from '@atlaskit/editor-test-helpers';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { EmojiProvider } from '@atlaskit/emoji';
import WithEditorActions from './../src/ui/WithEditorActions';
import { EditorActions, CollabEditProvider } from './../src';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { TitleInput } from '../example-helpers/PageElements';

import Editor from './../src/editor';
import EditorContext from './../src/ui/EditorContext';

import { P2PCollabProvider } from '@atlaskit/collab-provider';

const documentAri = `ari:cloud:demo::document/${window.top.location.hash.substr(
  1,
)}`;

const defaultValue = `{
  "type": "doc",
  "version": 1,
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Hello World"
        }
      ]
    }
  ]
}`;

export const providers: any = {
  emojiProvider: emoji.storyData.getEmojiResource({
    uploadSupported: true,
    currentUser: {
      id: emoji.storyData.loggedUser,
    },
  }) as Promise<EmojiProvider>,
  mentionProvider: Promise.resolve(mention.storyData.resourceProvider),
  taskDecisionProvider: Promise.resolve(
    taskDecision.getMockTaskDecisionResource(),
  ),
  contextIdentifierProvider: storyContextIdentifierProviderFactory(),
  activityProvider: Promise.resolve(new MockActivityResource()),
  macroProvider: Promise.resolve(macroProvider),
  autoformattingProvider: Promise.resolve(autoformattingProvider),
};

export const mediaProvider = storyMediaProviderFactory({
  includeUserAuthProvider: true,
});

export const quickInsertProvider = quickInsertProviderFactory();

interface State {
  collabProvider?: any;
  title?: string;
}

export default class Example extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const collabProvider = new P2PCollabProvider({
      documentAri,
      url: 'https://pf-collab-spike-service.ap-southeast-2.dev.atl-paas.net',
    });
    collabProvider.on('titleChange', this._onExternalTitleChange);
    this.setState({ collabProvider }, () => {
      this._collabProviderPromiseResolve(this.state.collabProvider);
    });
  }

  private _collabProviderPromiseResolve: any;
  private _collabPromise: Promise<CollabEditProvider> = new Promise(
    resolve => (this._collabProviderPromiseResolve = resolve),
  );

  render() {
    return (
      <div>
        <EditorContext>
          <Editor
            appearance="full-page"
            defaultValue={defaultValue}
            allowBreakout={true}
            allowCodeBlocks={true}
            allowDate={true}
            // allowLayouts={{
            //   allowBreakout: true,
            //   UNSAFE_addSidebarLayouts: true,
            // }}
            allowLists={true}
            allowPanel={true}
            allowTextAlignment={true}
            allowIndentation={true}
            allowTextColor={true}
            allowTables={{
              allowColumnResizing: true,
              allowMergeCells: true,
              allowNumberColumn: true,
              allowBackgroundColor: true,
              allowHeaderRow: true,
              allowHeaderColumn: true,
              permittedLayouts: 'all',
              stickToolbarToBottom: true,
            }}
            allowTemplatePlaceholders={{ allowInserting: true }}
            media={{
              provider: mediaProvider,
              allowMediaSingle: true,
            }}
            emojiProvider={
              emoji.storyData.getEmojiResource() as Promise<EmojiProvider>
            }
            mentionProvider={Promise.resolve(
              mention.storyData.resourceProvider,
            )}
            taskDecisionProvider={Promise.resolve(
              taskDecision.getMockTaskDecisionResource(),
            )}
            collabEdit={{
              useNativePlugin: true,
              provider: this._collabPromise,
            }}
            contentComponents={
              <WithEditorActions
                render={actions => (
                  <TitleInput
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    innerRef={this.handleTitleRef}
                    onFocus={this.handleTitleOnFocus}
                    onBlur={this.handleTitleOnBlur}
                    onKeyDown={(e: KeyboardEvent) => {
                      this.onKeyPressed(e, actions);
                    }}
                  />
                )}
              />
            }
          />
        </EditorContext>
      </div>
    );
  }

  _onExternalTitleChange = (newTitle: string) => {
    const { title } = this.state;
    if (newTitle !== title) {
      this.setState({ title: newTitle });
    }
  };

  private onKeyPressed = (e: KeyboardEvent, actions: EditorActions) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      // Move to the editor view
      actions.focus();
      return false;
    }
  };

  private handleTitleChange = (e: KeyboardEvent) => {
    const title = (e.target as HTMLInputElement).value;
    this.setState({ title });

    const { collabProvider } = this.state;
    if (collabProvider) {
      collabProvider.setTitle(title);
    }
  };

  private handleTitleOnFocus = () => {};
  private handleTitleOnBlur = () => {};
  private handleTitleRef = (ref?: HTMLElement) => {
    if (ref) {
      ref.focus();
    }
  };
}
