import { defaultSchema } from '@atlaskit/adf-schema';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { createDispatch } from '@atlaskit/editor-core/src/event-dispatcher';
import {
  PortalProviderAPI,
  EventDispatcher,
  PluginConfig,
  asyncCreatePMPluginList,
} from '@atlaskit/editor-core/test-utils';
import { Schema } from 'prosemirror-model';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Refs, RefsNode } from './schema-builder';
import { setSelection } from './utils/set-selection';

class PortalProviderMock extends EventDispatcher implements PortalProviderAPI {
  portals = new Map();
  context: any;

  setContext = () => {};
  render() {}
  forceUpdate() {}
  remove() {}
  static create() {
    return new PortalProviderMock();
  }
}

type DocBuilder = (schema: Schema) => RefsNode;

interface CreatePMEditorOptions {
  doc: DocBuilder;
  pluginKey?: PluginKey;
  plugins?: PluginConfig[];
  providerFactory?: ProviderFactory;
}

interface CreatePMEEditorOutput<T = any> {
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  refs: Refs | undefined;
  sel: number;
  plugin?: Plugin | null;
  pluginState: T;
}

export function createProsemirrorEditorFactory() {
  let editorView: EditorView;
  let eventDispatcher: EventDispatcher;

  afterEach(() => {
    if (editorView) {
      editorView.destroy();
    }
    if (eventDispatcher) {
      eventDispatcher.destroy();
    }
  });

  return async <T = any>({
    doc,
    pluginKey,
    plugins: _plugins = [],
    providerFactory = new ProviderFactory(),
  }: CreatePMEditorOptions): Promise<CreatePMEEditorOutput<T>> => {
    const eventDispatcher = new EventDispatcher();
    const plugins = await asyncCreatePMPluginList(_plugins, {
      schema: defaultSchema,
      providerFactory,
      eventDispatcher,
      dispatch: createDispatch(eventDispatcher),

      // Need to mock (Will only exist on a fully editor experience)
      props: {}, // This might no be necessary after Stan PR
      portalProviderAPI: PortalProviderMock.create(),
      reactContext: jest.fn(),
      dispatchAnalyticsEvent: jest.fn(),
    });

    const state = EditorState.create({
      doc: doc(defaultSchema),
      plugins,
    });

    editorView = new EditorView(undefined, {
      state,
    });

    const refs = setSelection(doc, editorView);

    let plugin;
    let pluginState;

    if (pluginKey) {
      plugin = pluginKey.get(editorView!.state);
      pluginState = pluginKey.getState(editorView!.state);
    }

    return {
      editorView,
      eventDispatcher,
      refs,
      plugin,
      pluginState,
      sel: refs ? refs['<>'] : 0,
    };
  };
}
