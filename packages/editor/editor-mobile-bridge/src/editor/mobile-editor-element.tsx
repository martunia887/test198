import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import {
  Editor,
  textFormattingStateKey,
  blockPluginStateKey,
  ListsState,
  listsStateKey,
  statusPluginKey,
} from '@atlaskit/editor-core';
import { valueOf as valueOfMarkState } from './web-to-native/markState';
import { valueOf as valueOfListState } from './web-to-native/listState';
import { toNativeBridge } from './web-to-native';
import WebBridgeImpl from './native-to-web';
import MobilePicker from './MobileMediaPicker';
import {
  MediaProvider,
  MentionProvider,
  TaskDecisionProvider,
} from '../providers';
import { createPromise } from '../cross-platform-promise';

export const bridge: WebBridgeImpl = ((window as any).bridge = new WebBridgeImpl());

// let originalFetch = window.fetch;
if (window.webkit) {
  // @ts-ignore
  window.fetch = (url, options) => {
    return createPromise('nativeFetch', JSON.stringify({ url, options }))
      .submit()
      .then(({ response, status, statusText, headers }) => {
        // const blob = new Blob([response], { type: 'application/json' });
        return new Response(response, { status, statusText, headers });
      });
  };
}

class EditorWithState extends Editor {
  onEditorCreated(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorCreated(instance);
    const { eventDispatcher, view } = instance;
    bridge.editorView = view;
    bridge.editorActions._privateRegisterEditor(view, eventDispatcher);
    if (this.props.media && this.props.media.customMediaPicker) {
      bridge.mediaPicker = this.props.media.customMediaPicker;
    }
    subscribeForTextFormatChanges(view, eventDispatcher);
    subscribeForBlockStateChanges(view, eventDispatcher);
    subscribeForListStateChanges(view, eventDispatcher);
    subscribeForStatusStateChange(view, eventDispatcher);
  }

  onEditorDestroyed(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorDestroyed(instance);

    const { eventDispatcher, view } = instance;
    unsubscribeFromBlockStateChanges(view, eventDispatcher);
    unsubscribeFromListStateChanges(view, eventDispatcher);
    unsubscribeFromStatusStateChanges(view, eventDispatcher);

    bridge.editorActions._privateUnregisterEditor();
    bridge.editorView = null;
    bridge.mentionsPluginState = null;
    bridge.textFormattingPluginState = null;
  }
}

function subscribeForStatusStateChange(view: EditorView, eventDispatcher: any) {
  let statusPluginState = statusPluginKey.getState(view.state);
  bridge.statusPluginState = statusPluginState;
  eventDispatcher.on((statusPluginKey as any).key, state => {
    statusStateUpdated(view)(state);
  });
}

const statusStateUpdated = view => state => {
  const { selectedStatus: status, showStatusPickerAt } = state;
  if (status) {
    toNativeBridge.showStatusPicker(
      status.text,
      status.color,
      status.localId as string,
    );
    return;
  }
  if (!showStatusPickerAt) {
    toNativeBridge.dismissStatusPicker();
  }
};

function subscribeForTextFormatChanges(view: EditorView, eventDispatcher: any) {
  let textFormattingPluginState = textFormattingStateKey.getState(view.state);
  bridge.textFormattingPluginState = textFormattingPluginState;
  eventDispatcher.on((textFormattingStateKey as any).key, state => {
    toNativeBridge.updateTextFormat(JSON.stringify(valueOfMarkState(state)));
  });
}

const blockStateUpdated = state => {
  toNativeBridge.updateBlockState(state.currentBlockType.name);
};

function subscribeForBlockStateChanges(view: EditorView, eventDispatcher: any) {
  bridge.blockState = blockPluginStateKey.getState(view.state);
  eventDispatcher.on((blockPluginStateKey as any).key, blockStateUpdated);
}

function unsubscribeFromBlockStateChanges(
  view: EditorView,
  eventDispatcher: any,
) {
  eventDispatcher.off((blockPluginStateKey as any).key, blockStateUpdated);
  bridge.blockState = undefined;
}

function unsubscribeFromStatusStateChanges(
  view: EditorView,
  eventDispatcher: any,
) {
  eventDispatcher.off((statusPluginKey as any).key, statusStateUpdated);
  bridge.statusPluginState = null;
}

const listStateUpdated = state => {
  toNativeBridge.updateListState(JSON.stringify(valueOfListState(state)));
};

function subscribeForListStateChanges(view: EditorView, eventDispatcher: any) {
  const listState: ListsState = listsStateKey.getState(view.state);
  bridge.listState = listState;
  eventDispatcher.on((listsStateKey as any).key, listStateUpdated);
}

function unsubscribeFromListStateChanges(
  view: EditorView,
  eventDispatcher: any,
) {
  eventDispatcher.off((listsStateKey as any).key, listStateUpdated);
}

export default function mobileEditor(props) {
  return (
    <EditorWithState
      appearance="mobile"
      mentionProvider={MentionProvider}
      media={{
        customMediaPicker: new MobilePicker(),
        provider: props.mediaProvider || MediaProvider,
        allowMediaSingle: true,
      }}
      allowLists={true}
      onChange={() => {
        toNativeBridge.updateText(bridge.getContent());
      }}
      allowPanel={true}
      allowCodeBlocks={true}
      allowTables={{
        allowControls: false,
      }}
      allowExtension={true}
      allowTextColor={true}
      allowDate={true}
      allowRule={true}
      allowStatus={true}
      allowGapCursor={true}
      taskDecisionProvider={Promise.resolve(TaskDecisionProvider())}
    />
  );
}
