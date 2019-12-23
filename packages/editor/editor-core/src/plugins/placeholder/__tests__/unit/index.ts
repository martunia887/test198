import { createProsemirrorEditorFactory } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import { insertText } from '@atlaskit/editor-test-helpers/transactions';
import { doc, p } from '@atlaskit/editor-test-helpers/schema-builder';
import { EditorView } from 'prosemirror-view';
import { TextSelection } from 'prosemirror-state';
import { placeHolderClassName } from '../../styles';

function expectNoPlaceholder(editorView: EditorView) {
  const placeholder = editorView.dom.querySelector(`.${placeHolderClassName}`);

  expect(placeholder).toBe(null);
}

function expectPlaceHolderWithText(editorView: EditorView, text: string) {
  const placeholder = editorView.dom.querySelector(`.${placeHolderClassName}`);

  expect(placeholder).toBeDefined();
  expect(placeholder!.textContent).toEqual(text);
}

const defaultPlaceholder = 'defaultPlaceholder';
const slashPlaceholder = "Type '/' to insert content.";

describe('placeholder', () => {
  const createProsemirrorEditor = createProsemirrorEditorFactory();

  describe('Empty placeholder', () => {
    const emptyPlaceholderEditor = (doc: any) =>
      createProsemirrorEditor({
        doc,
        plugins: [['placeholder', { placeholder: defaultPlaceholder }]],
      });

    it('renders a placeholder on a blank document', async () => {
      const { editorView } = await emptyPlaceholderEditor(doc(p()));

      expectPlaceHolderWithText(editorView, defaultPlaceholder);
    });

    it('disappears when content is added to document', async () => {
      const { editorView } = await emptyPlaceholderEditor(doc(p()));
      expectPlaceHolderWithText(editorView, defaultPlaceholder);

      insertText(editorView, 'a', 0);

      expectNoPlaceholder(editorView);
    });
  });

  describe('Hint placeholder', () => {
    const hintPlaceholderEditor = (doc: any) =>
      createProsemirrorEditor({
        doc,
        plugins: [['placeholder', { placeholderHints: [slashPlaceholder] }]],
      });

    it('renders hint placeholder on a blank content', async () => {
      const { editorView } = await hintPlaceholderEditor(doc(p()));

      expectPlaceHolderWithText(editorView, slashPlaceholder);
    });

    it('renders hint placeholder in a empty line', async () => {
      const { editorView } = await hintPlaceholderEditor(
        doc(p('Hello World'), p('{<>}')),
      );

      expectPlaceHolderWithText(editorView, slashPlaceholder);
    });

    it('disappears after changing selection to a non empty line', async () => {
      const { editorView, refs } = await hintPlaceholderEditor(
        doc(p('Hello World{noEmptyLine}'), p('{<>}')),
      );

      expectPlaceHolderWithText(editorView, slashPlaceholder);

      editorView.dispatch(
        editorView.state.tr.setSelection(
          TextSelection.create(editorView.state.doc, refs!['noEmptyLine']),
        ),
      );

      expectNoPlaceholder(editorView);
    });
  });

  describe('Default and Hint placeholder', () => {
    const fullPlaceholderEditor = (doc: any) =>
      createProsemirrorEditor({
        doc,
        plugins: [
          [
            'placeholder',
            { placeholder: defaultPlaceholder, enablePlaceHolderHint: true },
          ],
        ],
      });
    it('renders the default placeholder on a blank content', async () => {
      const { editorView } = await fullPlaceholderEditor(doc(p()));

      expectPlaceHolderWithText(editorView, defaultPlaceholder);
    });
  });
});
