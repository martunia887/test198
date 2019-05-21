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
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';

import Editor from './../src/editor';
import EditorContext from './../src/ui/EditorContext';

import { P2PCollabProvider } from '@atlaskit/collab-provider';
const documentAri = 'ari:cloud:demo::document/abcdef';

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

export default class Example extends Component {
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
            allowLayouts={{
              allowBreakout: true,
              UNSAFE_addSidebarLayouts: true,
            }}
            allowLists={true}
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
              provider: Promise.resolve(
                new P2PCollabProvider({
                  documentAri,
                  url:
                    'https://pf-collab-spike-service.ap-southeast-2.dev.atl-paas.net',
                  // url: 'http://localhost:8080'
                }),
              ),
            }}
          />
        </EditorContext>
      </div>
    );
  }
}
