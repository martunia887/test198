import { EditorView } from 'prosemirror-view';
import { doc, p } from '@atlaskit/editor-test-helpers';
import { find } from '../../../../../plugins/find-replace/commands';
import { editor, defaultDoc, getPluginState, getFindReplaceTr } from './utils';

describe('find/replace commands: find', () => {
  let editorView: EditorView;
  let dispatchSpy: jest.SpyInstance;

  const initEditor = (doc: any) => {
    ({ editorView } = editor(doc));
    dispatchSpy = jest.spyOn(editorView, 'dispatch');
  };

  beforeEach(() => {
    initEditor(defaultDoc);
  });

  describe('and one search result on page', () => {
    beforeEach(() => {
      find('document')(editorView.state, editorView.dispatch);
    });

    it('finds result', () => {
      expect(getPluginState(editorView.state)).toMatchObject({
        findText: 'document',
        matches: [{ start: 11, end: 19 }],
      });
    });

    it('sets index to only match', () => {
      expect(getPluginState(editorView.state)).toMatchObject({
        index: 0,
      });
    });

    it('sets selection to only match', () => {
      expect(editorView.state.selection.from).toBe(11);
    });

    it('scrolls result into view', () => {
      expect(getFindReplaceTr(dispatchSpy).scrolledIntoView).toBe(true);
    });
  });

  describe('and multiple search results on page', () => {
    beforeEach(() => {
      initEditor(
        doc(
          p('this is a document{<>}'),
          p('this is a document'),
          p('this is a document'),
        ),
      );
      find('document')(editorView.state, editorView.dispatch);
    });

    it('finds all results', () => {
      expect(getPluginState(editorView.state)).toMatchObject({
        findText: 'document',
        matches: [
          { start: 11, end: 19 },
          { start: 31, end: 39 },
          { start: 51, end: 59 },
        ],
      });
    });

    it("sets index to match following the user's cursor pos", () => {
      expect(getPluginState(editorView.state)).toMatchObject({
        index: 1,
      });
    });

    it("sets selection to match following user's cursor pos", () => {
      expect(editorView.state.selection.from).toBe(31);
    });

    it('scrolls result into view', () => {
      expect(getFindReplaceTr(dispatchSpy).scrolledIntoView).toBe(true);
    });
  });

  describe('and no search results on page', () => {
    beforeEach(() => {
      find('no results')(editorView.state, editorView.dispatch);
    });

    it('finds zero results', () => {
      expect(getPluginState(editorView.state)).toMatchObject({
        findText: 'no results',
        matches: [],
      });
    });

    it('sets index to default value', () => {
      expect(getPluginState(editorView.state)).toMatchObject({
        index: 0,
      });
    });

    it('leaves selection as is', () => {
      expect(editorView.state.selection.from).toBe(19);
    });
  });

  describe('with no text for keyword', () => {
    it('resets to default values', () => {
      find('')(editorView.state, editorView.dispatch);
      expect(getPluginState(editorView.state)).toMatchObject({
        findText: '',
        matches: [],
        index: 0,
      });
    });

    it('leaves selection as is', () => {
      expect(editorView.state.selection.from).toBe(19);
    });
  });
});
