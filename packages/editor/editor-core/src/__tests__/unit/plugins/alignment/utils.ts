import {
  alignment as alignmentMark,
  doc,
  p,
} from '@atlaskit/editor-test-helpers/schema-builder';
import { createProsemirrorEditorFactory } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import { pluginKey as alignmentPluginKey } from '../../../../plugins/alignment/pm-plugins/main';
import { removeBlockMarks } from '../../../../utils/mark';

describe('alignment utils', () => {
  const createEditor = createProsemirrorEditorFactory();

  const editor = (doc: any) =>
    createEditor({
      doc,
      pluginKey: alignmentPluginKey,
      plugins: ['alignment'],
    });

  it('removes alignment', async () => {
    const { editorView } = await editor(
      doc(alignmentMark({ align: 'end' })(p('{<}hello{>}'))),
    );
    const { state, dispatch } = editorView;
    const tr = removeBlockMarks(state, [state.schema.marks.alignment]);
    expect(tr).toBeDefined();
    if (tr) {
      dispatch(tr);
      expect(editorView.state.doc).toEqualDocument(doc(p('hello')));
    }
  });
});
