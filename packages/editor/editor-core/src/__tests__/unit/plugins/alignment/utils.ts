import {
  doc,
  p,
  createEditorFactory,
  alignment as alignmentMark,
} from '@atlaskit/editor-test-helpers';
import {
  AlignmentPluginState,
  pluginKey as alignmentPluginKey,
} from '../../../../plugins/alignment/pm-plugins/main';
import { removeBlockMarks } from '../../../../utils/mark';

describe('alignment utils', () => {
  const createEditor = createEditorFactory<AlignmentPluginState>();

  const editor = (doc: any) =>
    createEditor({
      doc,
      pluginKey: alignmentPluginKey,
      editorProps: {
        allowTextAlignment: true,
      },
    });

  it('removes alignment', () => {
    const { editorView } = editor(
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
