import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EditorView } from 'prosemirror-view';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { EmojiProvider } from '@atlaskit/emoji';
import {
  cardProvider,
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
  customInsertMenuItems,
} from '@atlaskit/editor-test-helpers';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { extensionHandlers } from '../example-helpers/extension-handlers';
import { Editor, EditorProps, EventDispatcher } from './../src';
import ClipboardHelper from './1-clipboard-helper';
import { SaveAndCancelButtons } from './5-full-page';
import { TitleInput } from '../example-helpers/PageElements';
import mediaMockServer from '../example-helpers/media-mock';
// @ts-ignore
import { AtlaskitThemeProvider } from '@atlaskit/theme';

function createMediaMockEnableOnce() {
  let enabled = false;
  return {
    enable() {
      if (!enabled) {
        enabled = true;
        mediaMockServer.enable();
      }
    },
    disable() {
      // We dont change change enable to false, because disabled is not implemented in mock server
      mediaMockServer.disable();
    },
  };
}

interface EditorInstance {
  view: EditorView;
  eventDispatcher: EventDispatcher;
}

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
};

export const mediaProvider = storyMediaProviderFactory({
  useMediaPickerAuthProvider: false,
});

export const quickInsertProvider = quickInsertProviderFactory();
export const cardProviderPromise = Promise.resolve(cardProvider);

function withDarkMode<T>(
  Wrapper: React.ComponentType<T>,
): React.ComponentType<T> {
  return props => (
    <AtlaskitThemeProvider mode={'dark'}>
      <Wrapper {...props} />{' '}
    </AtlaskitThemeProvider>
  );
}

function createEditorWindowBindings(win: Window) {
  if ((win as Window & { __mountEditor?: () => void }).__mountEditor) {
    return;
  }
  const internalMediaMock = createMediaMockEnableOnce();

  class EditorWithState extends Editor {
    onEditorCreated(instance: EditorInstance) {
      super.onEditorCreated(instance);
      (window as any)['__editorView'] = instance.view;
    }
    onEditorDestroyed(instance: EditorInstance) {
      super.onEditorDestroyed(instance);
      (window as any)['__editorView'] = undefined;
    }
  }

  (window as any)['__mountEditor'] = (
    props: EditorProps = {},
    mode?: 'light' | 'dark',
  ) => {
    const target = document.getElementById('editor-container');

    if (!target) {
      return;
    }

    // Add providers as they are not serializible
    if (props && props.UNSAFE_cards && props.UNSAFE_cards.provider) {
      props.UNSAFE_cards.provider = cardProviderPromise;
    }

    props.quickInsert = { provider: Promise.resolve(quickInsertProvider) };

    if (props && props.media) {
      props.media = {
        allowMediaSingle: true,
        allowResizing: true,
        ...props.media,
        provider: mediaProvider,
      };

      internalMediaMock.enable();
    } else {
      internalMediaMock.disable();
    }

    if (props && props.primaryToolbarComponents) {
      props.primaryToolbarComponents = <SaveAndCancelButtons />;
    }

    if (props && props.contentComponents) {
      props.contentComponents = (
        <TitleInput placeholder="Give this page a title..." />
      );
    }

    if (props && props.allowExtension) {
      props.extensionHandlers = extensionHandlers;
    }

    let Editor: React.ComponentType<EditorProps> = (props: EditorProps) => (
      <EditorWithState
        insertMenuItems={customInsertMenuItems}
        {...providers}
        {...props}
      />
    );
    let Wrapper: React.ComponentType<EditorProps> = Editor;

    if (mode && mode === 'dark') {
      Wrapper = withDarkMode<EditorProps>(Wrapper);
    }

    ReactDOM.unmountComponentAtNode(target);
    ReactDOM.render(<Wrapper {...props} />, target);
  };
}

export default function EditorExampleForTests({ clipboard = true }) {
  createEditorWindowBindings(window);
  return (
    <React.Fragment>
      <div id="editor-container" style={{ height: '100%', width: '100%' }} />
      {clipboard && <ClipboardHelper />}
    </React.Fragment>
  );
}
