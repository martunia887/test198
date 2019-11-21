import {
  asyncCreatePluginList,
  createPMPlugins,
  processPluginsList,
  PortalProviderAPI,
  EventDispatcher,
  PluginConfig,
} from '@atlaskit/editor-core/test-utils';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { defaultSchema } from '@atlaskit/adf-schema';
import { EditorView } from 'prosemirror-view';
import { EditorState, PluginKey } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { RefsNode } from './schema-builder';
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
  pluginKey: PluginKey;
  plugins: PluginConfig[];
  providerFactory?: ProviderFactory;
}

interface CreatePMEEditorOutput {
  editorView: EditorView;
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

  return async ({
    doc,
    plugins: _plugins,
    providerFactory = new ProviderFactory(),
  }: CreatePMEditorOptions): Promise<CreatePMEEditorOutput> => {
    const editorPlugins = await asyncCreatePluginList(_plugins);
    const editorConfig = processPluginsList(editorPlugins as any, {});
    const eventDispatcher = new EventDispatcher();
    const plugins = createPMPlugins({
      editorConfig,
      schema: defaultSchema,
      props: {},
      providerFactory,
      eventDispatcher,
      // Need to mock (Will only exist on a fully editor experience)
      dispatch: jest.fn(),
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

    setSelection(doc, editorView);
    return { editorView };
  };
}
