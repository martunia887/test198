import { createEditorFactory, doc, p } from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection } from 'prosemirror-state';
import {
  findReplacePluginKey,
  FindReplacePluginState,
} from '../../../../../plugins/find-replace';

export const defaultDoc = doc(p('this is a document{<>}'));

export const createEditor = createEditorFactory();

export const editor = (doc: any) =>
  createEditor({
    doc,
    editorProps: { allowFindReplace: true },
  });

export const getPluginState = (state: EditorState): FindReplacePluginState =>
  findReplacePluginKey.getState(state);

export const setSelection = (
  editorView: EditorView,
  from: number,
  to: number,
) =>
  editorView.dispatch(
    editorView.state.tr.setSelection(
      TextSelection.create(editorView.state.doc, from, to),
    ),
  );

export const getFindReplaceTr = (dispatchSpy: jest.SpyInstance) =>
  dispatchSpy.mock.calls.filter(([transaction]) =>
    transaction.getMeta(findReplacePluginKey),
  )[0][0];
