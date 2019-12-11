import styled from 'styled-components';
import * as React from 'react';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import Button, { ButtonGroup } from '@atlaskit/button';
import ExamplesErrorBoundary from '../example-helpers/ExamplesErrorBoundary';

import {
  extensionHandlers,
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
  autoformattingProvider,
} from '@atlaskit/editor-test-helpers';
import {
  ProviderFactory,
  ExtensionProvider,
  combineExtensionProviders,
} from '@atlaskit/editor-common';

import { EmojiProvider } from '@atlaskit/emoji/resource';
import {
  Provider as SmartCardProvider,
  Client as SmartCardClient,
} from '@atlaskit/smart-card';
import {
  mention,
  emoji,
  taskDecision,
  profilecard as profilecardUtils,
} from '@atlaskit/util-data-test';

import { EditorProps, EditorAppearance } from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { DevTools } from '../example-helpers/DevTools';
import { EditorActions, MentionProvider } from './../src';
import withSentry from '../example-helpers/withSentry';
import {
  DEFAULT_MODE,
  LOCALSTORAGE_defaultMode,
} from '../example-helpers/example-constants';
import { ReactRenderer } from '@atlaskit/renderer';
import { ProfileClient, modifyResponse } from '@atlaskit/profilecard';
import { AKEditor } from '../src/react-editor';

/**
 * +-------------------------------+
 * + [Editor core v] [Full page v] +  48px height
 * +-------------------------------+
 * +                               +  16px padding-top
 * +            Content            +
 * +                               +  16px padding-bottom
 * +-------------------------------+  ----
 *                                    80px - 48px (Outside of iframe)
 *
 */
export const Wrapper: any = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;
Wrapper.displayName = 'Wrapper';

export const Content: any = styled.div`
  padding: 0;
  height: 100%;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

// eslint-disable-next-line no-console
export const analyticsHandler = (actionName: string, props?: {}) =>
  console.log(actionName, props);

export const LOCALSTORAGE_defaultDocKey = 'fabric.editor.example.full-page';
export const LOCALSTORAGE_defaultTitleKey =
  'fabric.editor.example.full-page.title';

export const saveChanges = (props: {
  editorActions?: EditorActions;
  setMode?: (mode: boolean) => void;
}) => () => {
  if (!props.editorActions) {
    return;
  }

  props.editorActions.getValue().then(value => {
    // eslint-disable-next-line no-console
    console.log(value);
    localStorage.setItem(LOCALSTORAGE_defaultDocKey, JSON.stringify(value));
    if (props.setMode) {
      props.setMode(false);
    }
  });
};

export const SaveAndCancelButtons = (props: {
  editorActions?: EditorActions;
  setMode?: (mode: boolean) => void;
}) => (
  <ButtonGroup>
    <Button tabIndex={-1} appearance="primary" onClick={saveChanges(props)}>
      Publish
    </Button>

    <Button
      tabIndex={-1}
      appearance="subtle"
      onClick={() => {
        if (!props.editorActions) {
          return;
        }
        props.editorActions.clear();
        localStorage.removeItem(LOCALSTORAGE_defaultDocKey);
        localStorage.removeItem(LOCALSTORAGE_defaultTitleKey);
      }}
    >
      Close
    </Button>
  </ButtonGroup>
);

export type State = {
  disabled: boolean;
  title?: string;
  appearance: EditorAppearance;
};

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

export const getAppearance = (): EditorAppearance => {
  return (localStorage.getItem(LOCALSTORAGE_defaultMode) || DEFAULT_MODE) ===
    DEFAULT_MODE
    ? 'full-page'
    : 'full-width';
};

export interface ExampleProps {
  onTitleChange?: (title: string) => void;
  setMode?: (isEditing: boolean) => void;
}

const smartCardProvider = new SmartCardClient('prod');

export class ExampleEditorComponent extends React.Component<
  EditorProps & ExampleProps,
  State
> {
  state: State = {
    disabled: true,
    title: localStorage.getItem(LOCALSTORAGE_defaultTitleKey) || '',
    appearance: this.props.appearance || getAppearance(),
  };

  render() {
    return (
      <ExamplesErrorBoundary>
        <Wrapper>
          <Content>
            <SmartCardProvider client={smartCardProvider}>
              <AKEditor
                initialDoc={
                  (localStorage &&
                    localStorage.getItem(LOCALSTORAGE_defaultDocKey)) ||
                  undefined
                }
              />
            </SmartCardProvider>
          </Content>
        </Wrapper>
      </ExamplesErrorBoundary>
    );
  }
}

export const ExampleEditor = withSentry<EditorProps & ExampleProps>(
  ExampleEditorComponent,
);

const { getMockProfileClient: getMockProfileClientUtil } = profilecardUtils;
const MockProfileClient = getMockProfileClientUtil(
  ProfileClient,
  modifyResponse,
);

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention: { id: string }) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  },
} as MentionProvider);

const emojiProvider = emoji.storyData.getEmojiResource();

const profilecardProvider = Promise.resolve({
  cloudId: 'DUMMY-CLOUDID',
  resourceClient: new MockProfileClient({
    cacheSize: 10,
    cacheMaxAge: 5000,
  }),
  getActions: (id: string) => {
    const actions = [
      {
        label: 'Mention',
        callback: () => console.log('profile-card:mention'),
      },
      {
        label: 'Message',
        callback: () => console.log('profile-card:message'),
      },
    ];

    return id === '1' ? actions : actions.slice(0, 1);
  },
});

const taskDecisionProvider = Promise.resolve(
  taskDecision.getMockTaskDecisionResource(),
);

const contextIdentifierProvider = storyContextIdentifierProviderFactory();

const providerFactory = ProviderFactory.create({
  mentionProvider,
  mediaProvider,
  emojiProvider,
  profilecardProvider,
  taskDecisionProvider,
  contextIdentifierProvider,
});

const Renderer = (props: {
  document: any;
  setMode: (mode: boolean) => void;
  extensionProviders?: ExtensionProvider[];
}) => {
  if (props.extensionProviders && props.extensionProviders.length > 0) {
    providerFactory.setProvider(
      'extensionProvider',
      Promise.resolve(combineExtensionProviders(props.extensionProviders)),
    );
  }

  return (
    <div
      style={{
        margin: '30px 0',
      }}
    >
      <Button
        appearance="primary"
        onClick={() => props.setMode(true)}
        style={{
          position: 'absolute',
          right: '0',
          margin: '0 20px',
          zIndex: 100,
        }}
      >
        Edit
      </Button>
      <ReactRenderer
        allowHeadingAnchorLinks
        UNSAFE_allowAltTextOnImages
        adfStage="stage0"
        dataProviders={providerFactory}
        extensionHandlers={extensionHandlers}
        document={props.document && JSON.parse(props.document)}
        appearance="full-page"
      />
    </div>
  );
};

export default function Example(props: EditorProps & ExampleProps) {
  const [isEditingMode, setMode] = React.useState(true);
  const document =
    (localStorage && localStorage.getItem(LOCALSTORAGE_defaultDocKey)) ||
    undefined;

  return (
    <EditorContext>
      <div style={{ height: '100%' }}>
        <DevTools />
        {isEditingMode ? (
          <ExampleEditor {...props} setMode={setMode} />
        ) : (
          <Renderer
            document={document}
            setMode={setMode}
            extensionProviders={props.extensionProviders}
          />
        )}
      </div>
    </EditorContext>
  );
}
