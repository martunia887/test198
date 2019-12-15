import { EditorView } from 'prosemirror-view';
import { doc, p } from '@atlaskit/editor-test-helpers';
import { activate } from '../../../../../plugins/find-replace/commands';
import { editor, defaultDoc, getPluginState, setSelection } from './utils';

describe('find/replace commands: activate', () => {
  let editorView: EditorView;
  let dispatchSpy: jest.SpyInstance;

  const initEditor = (doc: any) => {
    ({ editorView } = editor(doc));
    dispatchSpy = jest.spyOn(editorView, 'dispatch');
  };

  beforeEach(() => {
    initEditor(defaultDoc);
  });

  describe('with no text selected', () => {
    it('activates find/replace with default values', () => {
      activate()(editorView.state, editorView.dispatch);
      expect(getPluginState(editorView.state)).toMatchObject({
        isActive: true,
        shouldFocus: true,
        findText: '',
        matches: [],
        index: 0,
      });
    });
  });

  describe('with text selected', () => {
    it("activates find/replace using selected text as user's search", () => {
      setSelection(editorView, 1, 5);
      activate()(editorView.state, editorView.dispatch);
      expect(getPluginState(editorView.state)).toMatchObject({
        isActive: true,
        shouldFocus: true,
        findText: 'this',
        matches: [{ start: 1, end: 5 }],
        index: 0,
      });
    });

    describe('and multiple search results on page', () => {
      beforeEach(() => {
        initEditor(
          doc(
            p('this is a document'),
            p('this is a document'),
            p('this is a document{<>}'),
          ),
        );
        setSelection(editorView, 21, 25);
        activate()(editorView.state, editorView.dispatch);
      });

      it('finds all results', () => {
        expect(getPluginState(editorView.state)).toMatchObject({
          matches: [
            { start: 1, end: 5 },
            { start: 21, end: 25 },
            { start: 41, end: 45 },
          ],
        });
      });

      it('sets index to the match the user selected', () => {
        expect(getPluginState(editorView.state)).toMatchObject({
          index: 1,
        });
      });
    });
  });
});
