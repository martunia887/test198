/* eslint-disable no-console */

import styled from 'styled-components';
import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { borderRadius } from '@atlaskit/theme';
import { ShareDialogContainer } from '@atlaskit/share';

import Editor from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
} from '@atlaskit/editor-test-helpers';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';

import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import { collabEditProvider } from '../example-helpers/mock-collab-provider';
import { EmojiProvider } from '@atlaskit/emoji';
import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
import { extensionHandlers } from '../example-helpers/extension-handlers';
import { TitleInput } from '../example-helpers/PageElements';
import { EditorActions } from '../src';

export const Content = styled.div`
  padding: 0 20px;
  height: 100vh;
  background: #fff;
  box-sizing: border-box;

  & .ProseMirror {
    & pre {
      font-family: ${akEditorCodeFontFamily};
      background: ${akEditorCodeBackground};
      padding: ${akEditorCodeBlockPadding};
      border-radius: ${borderRadius()}px;
    }
  }
`;
Content.displayName = 'Content';

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  flex: 1 1 0;
`;

const analyticsHandler = (actionName: string, props?: {}) =>
  console.log(actionName, props);

const SaveAndCancelButtons = (props: { editorActions: EditorActions }) => (
  <ButtonGroup>
    <Button
      appearance="primary"
      onClick={() =>
        props.editorActions
          .getValue()
          .then(value => console.log(value.toJSON()))
      }
    >
      Publish
    </Button>
    <Button appearance="subtle" onClick={() => props.editorActions.clear()}>
      Close
    </Button>
  </ButtonGroup>
);

const shareClient = {
  getConfig: () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          allowComment: true,
          allowedDomains: [],
          mode: 'ANYONE',
        });
      }, 1000);
    }),
  share: () =>
    new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            shareRequestId: 'c41e33e5-e622-4b38-80e9-a623c6e54cdd',
          }),
        3000,
      );
    }),
};

const mockOriginTracing = {
  id: 'id',
  addToUrl: (l: string) => `${l}&atlOrigin=mockAtlOrigin`,
  toAnalyticsAttributes: () => ({
    originIdGenerated: 'id',
    originProduct: 'product',
  }),
};

const InviteToEditButton = (
  <ShareDialogContainer
    cloudId="cloudId"
    client={shareClient}
    loadUserOptions={() => []}
    originTracingFactory={() => mockOriginTracing}
    productId="confluence"
    shareAri="ari"
    shareContentType="draft"
    shareLink={window && window.location.href}
    shareTitle="title"
    showFlags={() => {}}
  />
);

interface DropzoneEditorWrapperProps {
  children: (container: HTMLElement) => React.ReactNode;
}

class DropzoneEditorWrapper extends React.Component<
  DropzoneEditorWrapperProps,
  {}
> {
  dropzoneContainer: HTMLElement | null = null;

  handleRef = (node: HTMLElement) => {
    this.dropzoneContainer = node;
    this.forceUpdate();
  };

  render() {
    return (
      <Content innerRef={this.handleRef}>
        {this.dropzoneContainer
          ? this.props.children(this.dropzoneContainer)
          : null}
      </Content>
    );
  }
}

const mediaProvider1 = storyMediaProviderFactory();
const mediaProvider2 = storyMediaProviderFactory();
export type Props = {};

export default class Example extends React.Component<Props> {
  render() {
    return (
      <div>
        <Columns>
          <Column>
            <DropzoneEditorWrapper>
              {parentContainer => (
                <EditorContext>
                  <Editor
                    appearance="full-page"
                    analyticsHandler={analyticsHandler}
                    allowAnalyticsGASV3={true}
                    allowCodeBlocks={true}
                    allowLayouts={true}
                    allowLists={true}
                    allowTextColor={true}
                    allowDate={true}
                    allowPanel={true}
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
                      provider: mediaProvider1,
                      allowMediaSingle: true,
                      customDropzoneContainer: parentContainer,
                    }}
                    emojiProvider={
                      emoji.storyData.getEmojiResource() as Promise<
                        EmojiProvider
                      >
                    }
                    mentionProvider={Promise.resolve(
                      mention.storyData.resourceProvider,
                    )}
                    taskDecisionProvider={Promise.resolve(
                      taskDecision.getMockTaskDecisionResource(),
                    )}
                    contextIdentifierProvider={storyContextIdentifierProviderFactory()}
                    collabEdit={{
                      provider: collabEditProvider('rick'),
                      inviteToEditButton: InviteToEditButton,
                    }}
                    placeholder="Write something..."
                    shouldFocus={false}
                    quickInsert={true}
                    contentComponents={
                      <TitleInput innerRef={ref => ref && ref.focus()} />
                    }
                    primaryToolbarComponents={
                      <WithEditorActions
                        render={actions => (
                          <SaveAndCancelButtons editorActions={actions} />
                        )}
                      />
                    }
                    allowExtension={true}
                    insertMenuItems={customInsertMenuItems}
                    extensionHandlers={extensionHandlers}
                  />
                </EditorContext>
              )}
            </DropzoneEditorWrapper>
          </Column>
          <Column>
            <DropzoneEditorWrapper>
              {parentContainer => (
                <EditorContext>
                  <Editor
                    appearance="full-page"
                    analyticsHandler={analyticsHandler}
                    allowCodeBlocks={true}
                    allowLists={true}
                    allowTextColor={true}
                    allowDate={true}
                    allowPanel={true}
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
                      provider: mediaProvider2,
                      allowMediaSingle: true,
                      customDropzoneContainer: parentContainer,
                    }}
                    emojiProvider={
                      emoji.storyData.getEmojiResource() as Promise<
                        EmojiProvider
                      >
                    }
                    mentionProvider={Promise.resolve(
                      mention.storyData.resourceProvider,
                    )}
                    taskDecisionProvider={Promise.resolve(
                      taskDecision.getMockTaskDecisionResource(),
                    )}
                    collabEdit={{
                      provider: collabEditProvider('morty'),
                      inviteToEditHandler: this.inviteToEditHandler,
                    }}
                    placeholder="Write something..."
                    shouldFocus={false}
                    quickInsert={true}
                    contentComponents={
                      <TitleInput innerRef={ref => ref && ref.focus()} />
                    }
                    primaryToolbarComponents={
                      <WithEditorActions
                        render={actions => (
                          <SaveAndCancelButtons editorActions={actions} />
                        )}
                      />
                    }
                    allowExtension={true}
                    insertMenuItems={customInsertMenuItems}
                    extensionHandlers={extensionHandlers}
                  />
                </EditorContext>
              )}
            </DropzoneEditorWrapper>
          </Column>
        </Columns>
      </div>
    );
  }

  private inviteToEditHandler = (event: React.MouseEvent<HTMLElement>) => {
    console.log("'Invite to event' clicked");
  };
}
