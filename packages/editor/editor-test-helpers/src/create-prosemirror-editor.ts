import {
  asyncCreatePluginList,
  createPMPlugins,
  createSchema,
  processPluginsList,
  PortalProviderAPI,
  EventDispatcher,
} from '@atlaskit/editor-core/test-utils';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { EditorView } from 'prosemirror-view';
import { EditorState, PluginKey } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { RefsNode } from './schema-builder';
import { EditorProps } from '@atlaskit/editor-core/editor';

class PortalProviderMock extends EventDispatcher implements PortalProviderAPI {
  portals = new Map();
  context: any;

  setContext = () => {};
  render() {}
  forceUpdate() {}
  remove() {}
  static create() {
    return new PortalProviderAPI();
  }
}

type DocBuilder = (schema: Schema) => RefsNode;

interface CreatePMEditorOptions {
  doc: DocBuilder;
  pluginKey: PluginKey;
  editorProps: EditorProps;
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
    editorProps,
    providerFactory = new ProviderFactory(),
  }: CreatePMEditorOptions): Promise<CreatePMEEditorOutput> => {
    const editorPlugins = await asyncCreatePluginList(editorProps);
    const editorConfig = processPluginsList(editorPlugins, editorProps);
    const schema = createSchema(editorConfig);
    const eventDispatcher = new EventDispatcher();
    const plugins = createPMPlugins({
      editorConfig,
      schema,
      props: editorProps,
      providerFactory,
      eventDispatcher,
      // Need to mock (Will only exist on a fully editor experience)
      dispatch: jest.fn(),
      portalProviderAPI: PortalProviderMock.create(),
      reactContext: jest.fn(),
      dispatchAnalyticsEvent: jest.fn(),
    });
    const state = EditorState.create({
      doc: doc(schema),
      plugins,
    });

    editorView = new EditorView(undefined, {
      state,
    });
    return { editorView };
  };
}
