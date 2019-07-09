import {
  mentionPlugin,
  typeAheadPluginKey,
  TypeAheadPluginState,
} from '@atlaskit/editor-core';

import {
  doc,
  createEditorFactory,
  p,
  typeAheadQuery,
} from '@atlaskit/editor-test-helpers';

import { androidComposeStart, androidComposeEnd } from '../../_utils';

import { EditorViewWithComposition } from '../../../../types';

describe('Mentions on mobile', () => {
  const createEditor = createEditorFactory<TypeAheadPluginState>();

  const editor = (
    doc: any,
  ): {
    editorView: EditorViewWithComposition;
    plugin: any;
  } => {
    const { editorView, plugin } = createEditor({
      doc,
      editorPlugins: [mentionPlugin()],
      pluginKey: typeAheadPluginKey,
    });

    return {
      editorView: editorView as EditorViewWithComposition,
      plugin,
    };
  };

  beforeEach(() => jest.useFakeTimers());

  it('should trigger mention query on compositionend', async () => {
    const { editorView, plugin } = editor(doc(p()));

    // mutate DOM to final state
    editorView.dom.innerHTML = '@';

    // start/end composition
    androidComposeStart(editorView, '@');
    expect(editorView.composing).toBeTruthy();
    androidComposeEnd(editorView, '@');

    jest.runOnlyPendingTimers();

    const pluginState = plugin.getState(editorView.state);

    expect(pluginState.active).toBe(true);
    expect(pluginState.query).toEqual('');

    expect(editorView.state.doc).toEqualDocument(
      doc(p(typeAheadQuery({ trigger: '@' })('@'))),
    );
  });
});
