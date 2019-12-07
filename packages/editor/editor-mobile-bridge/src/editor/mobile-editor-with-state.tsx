import { EditorView } from 'prosemirror-view';
import { EditorViewWithComposition } from '../types';
import { Editor } from '@atlaskit/editor-core';
import { PluginSubscription } from './plugin-subscription';

export class MobileEditorWithState extends Editor {
  private subscription?: PluginSubscription;

  onEditorCreated(instance: {
    view: EditorView & EditorViewWithComposition;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorCreated(instance);

    const { eventDispatcher, view } = instance;
    const bridge = window.bridge!;
    bridge.editorView = view;
    bridge.editorActions._privateRegisterEditor(view, eventDispatcher);
    if (this.props.media && this.props.media.customMediaPicker) {
      bridge.mediaPicker = this.props.media.customMediaPicker;
    }

    this.subscription = new PluginSubscription({
      webBridge: bridge,
      nativeBridge: window.nativeBridge,
    });

    this.subscription.subscribe(eventDispatcher, view);
  }

  onEditorDestroyed(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorDestroyed(instance);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (window.bridge) {
      window.bridge.editorActions._privateUnregisterEditor();
      window.bridge.editorView = null;
      window.bridge.mentionsPluginState = null;
    }
  }
}
