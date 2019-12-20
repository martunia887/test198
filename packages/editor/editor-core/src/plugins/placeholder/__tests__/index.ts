import { createProsemirrorEditorFactory } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import { insertText } from '@atlaskit/editor-test-helpers/transactions';
import { doc, p } from '@atlaskit/editor-test-helpers/schema-builder';

describe('placeholder', () => {
  const createProsemirrorEditor = createProsemirrorEditorFactory();

  const editor = (doc: any) =>
    createProsemirrorEditor({
      doc,
      plugins: [['placeholder', { placeholder: 'potato' }]],
    });

  const placeholderHtml =
    '<p><span class="placeholder-decoration ProseMirror-widget"><span>potato</span></span><br></p>';

  it('renders a placeholder on a blank document', async () => {
    const { editorView } = await editor(doc(p()));
    expect(editorView.dom.innerHTML).toEqual(placeholderHtml);
  });

  it('disappears when content is added to document', async () => {
    const { editorView } = await editor(doc(p()));
    expect(editorView.dom.innerHTML).toEqual(placeholderHtml);

    insertText(editorView, 'a', 0);
    expect(editorView.dom.innerHTML).toEqual('<p>a</p><p><br></p>');
  });
});
