import * as React from 'react';
import { Editor } from '../src/index';
import EditorContext from '../src/ui/EditorContext';
import WithEditorActions from '../src/ui/WithEditorActions';
import { MentionDescription, MentionProvider } from '@atlaskit/mention';
import styled from 'styled-components';
import { akEditorDarkBackground } from '../src/styles';

import { exampleDocument } from '../example-helpers/example-document';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { EmojiProvider } from '@atlaskit/emoji';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';
import {
  cardProvider,
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
} from '@atlaskit/editor-test-helpers';

class MentionProviderImpl implements MentionProvider {
  filter(query?: string): void {}
  recordMentionSelection(mention: MentionDescription): void {}
  shouldHighlightMention(mention: MentionDescription): boolean {
    return false;
  }
  isFiltering(query: string): boolean {
    return false;
  }
  subscribe(
    key: string,
    callback?,
    errCallback?,
    infoCallback?,
    allResultsCallback?,
  ): void {}
  unsubscribe(key: string): void {}
}

// try using themeing if possible

// headings and paragraph
export const Content: any = styled.div`
  & .ProseMirror {
    background: ${akEditorDarkBackground};
  }
  p {
    color: red;
  }
`;
Content.displayName = 'Content';

export const providers = {
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
};
/*
emoji providor
allowDate


*/

export function mobileEditor() {
  return (
    <EditorContext>
      <Content>
        <WithEditorActions render={actions => <div />} />
        <Editor
          appearance="mobile"
          mentionProvider={Promise.resolve(new MentionProviderImpl())}
          quickInsert={true}
          darkMode={true}
          defaultValue={exampleDocument}
          allowCodeBlocks={{ enableKeybindingsForIDE: true }}
          allowLists={true}
          allowTextColor={true}
          allowTables={{
            advanced: true,
          }}
          allowBreakout={true}
          allowJiraIssue={true}
          allowUnsupportedContent={true}
          allowPanel={true}
          allowExtension={{
            allowBreakout: true,
          }}
          allowRule={true}
          allowDate={true}
          allowLayouts={{
            allowBreakout: true,
          }}
          allowTextAlignment={true}
          allowIndentation={true}
          allowTemplatePlaceholders={{ allowInserting: true }}
          allowStatus={true}
          // media={{ provider: mediaProvider, allowMediaSingle: true }}
          placeholder="Write something..."
          shouldFocus={false}
          {...providers}
        />
      </Content>
    </EditorContext>
  );
}

export default function Example() {
  return (
    <div>
      <p>Editor that is used by mobile applications.</p>
      {mobileEditor()}
    </div>
  );
}
