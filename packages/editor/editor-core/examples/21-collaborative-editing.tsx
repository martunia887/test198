/* eslint-disable no-console */

import styled from 'styled-components';
import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import PubSubClient from '@atlaskit/pubsub';

import Editor from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  extensionHandlers,
} from '@atlaskit/editor-test-helpers';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { EmojiProvider } from '@atlaskit/emoji/resource';
import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
import { CollabProvider } from '../src/plugins/collab-edit';
import { EditorActions } from '../src';

export const getRandomUser = () => {
  return Math.floor(Math.random() * 10000).toString();
};

const userId = `ari:cloud:identity::user/${getRandomUser()}`;
const asapToken =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Im1pY3Jvcy9wZi1jb2xsYWItc2VydmljZS9wdWJsaWMucGVtIn0.eyJhY2NvdW50SWQiOiJsb2NhbC1kZXYiLCJpc3MiOiJtaWNyb3MvcGYtY29sbGFiLXNlcnZpY2UiLCJhdWQiOiJhdWRpZW5jZSIsImlhdCI6MTU3NjExMDIzNCwiZXhwIjoxNTc2MTEzODM0LCJqdGkiOiI5MmJmMDBlZWUzNGMxMDgzMzVhNGRlZDg2YjA1OTI2N2RjYWI0NjI1In0.dwRcb2-nNOl_c9fsWEBQehrq5P3NMURYp2N9KRCkaY6uKuBP6g0Wi6XaEm2C_tQDqu2cSyHujDc5KNtaRuWHG9K-RmWcz_OyeMCHRM9xrMU8lgh45OqakZuzmjqWe8RHAblMUi93XI-ZVcEw_umUELSSDpNhg1wppq-qjd36o48gyKlHpP0Demwo0ntKBk0QiUclU1IksbSuSE4v8IoCFx4uvZ06saR60ADPvmjwWdbT0ISqBezV5V4O7s2kBgjWUxJ3hMNaNzV_bCQbIWOwkUzxSxF5FTE7PMPk9hjtDZ9QDVn-C9RB6oJsgp_9m7iK2kSf8vzRBY5Bnl66U4zwXg';

const pubSubClient = new PubSubClient({
  product: 'TEST',
  url: 'https://api-private.dev.atlassian.com/pubsub',
  securityProvider: () => {
    return {
      headers: {
        Authorization: asapToken,
      },
    };
  },
});

export const Content: any = styled.div`
  padding: 0 20px;
  height: 50%;
  background: #fff;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

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

const mediaProvider = storyMediaProviderFactory();

export type Props = {};
export type State = {
  isInviteToEditButtonSelected: boolean;
  documentId?: string;
  input?: HTMLInputElement;
  hasError?: boolean;
};

export default class Example extends React.Component<Props, State> {
  state = {
    isInviteToEditButtonSelected: false,
    documentId: undefined,
    input: undefined,
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  renderErrorFlag() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            margin: 0,
            backgroundColor: '#FF5630',
            padding: '10px',
          }}
        >
          <strong>NOTE!</strong> Something went wrong in the editor. You may be
          out of sync.
        </div>
      );
    }
    return;
  }

  renderDocumentId() {
    return (
      <div
        style={{
          margin: 0,
          backgroundColor: '#00B8D9',
          padding: '10px',
        }}
      >
        <strong>DocumentId:</strong> {this.state.documentId}
      </div>
    );
  }

  renderEditor() {
    const { documentId } = this.state;
    return (
      <div>
        {this.renderErrorFlag()}
        {this.renderDocumentId()}
        <DropzoneEditorWrapper>
          {parentContainer => (
            <EditorContext>
              <Editor
                appearance="full-page"
                analyticsHandler={analyticsHandler}
                allowStatus={true}
                allowAnalyticsGASV3={true}
                allowLayouts={true}
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
                  customDropzoneContainer: parentContainer,
                }}
                emojiProvider={
                  emoji.storyData.getEmojiResource() as Promise<EmojiProvider>
                }
                mentionProvider={Promise.resolve(
                  mention.storyData.resourceProviderWithResolver,
                )}
                taskDecisionProvider={Promise.resolve(
                  taskDecision.getMockTaskDecisionResource(),
                )}
                contextIdentifierProvider={storyContextIdentifierProviderFactory()}
                sanitizePrivateContent={true}
                collabEdit={{
                  useNativePlugin: true,
                  provider: Promise.resolve(
                    new CollabProvider(
                      {
                        url: 'http://localhost:8080',
                        securityProvider: () => ({
                          headers: {
                            Authorization: asapToken,
                            'user-ari': userId,
                          },
                          omitCredentials: true,
                        }),
                        docId: documentId!,
                        userId,
                      },
                      pubSubClient,
                    ),
                  ),
                  inviteToEditHandler: this.inviteToEditHandler,
                  isInviteToEditButtonSelected: this.state
                    .isInviteToEditButtonSelected,
                  userId,
                }}
                placeholder="Write something..."
                shouldFocus={false}
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
      </div>
    );
  }

  private handleRef = (input: HTMLInputElement) => {
    this.setState({ input });
  };

  private onJoin = () => {
    const { input } = this.state;
    if (input) {
      const { value } = input! as HTMLInputElement;
      if (value) {
        this.setState({
          documentId: value,
        });
      }
    }
  };

  render() {
    const { documentId } = this.state;
    if (documentId) {
      return this.renderEditor();
    }

    return (
      <div>
        Document name: <input ref={this.handleRef} />
        <button onClick={this.onJoin}>Join</button>
      </div>
    );
  }

  private inviteToEditHandler = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      isInviteToEditButtonSelected: !this.state.isInviteToEditButtonSelected,
    });
    console.log('target', event.target);
  };
}
