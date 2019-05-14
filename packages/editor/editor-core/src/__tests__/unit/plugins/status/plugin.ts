import { EditorState, TextSelection, NodeSelection } from 'prosemirror-state';
import { findChildrenByType, NodeWithPos } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import {
  createEditorFactory,
  doc,
  p,
  status,
  StatusLocalIdRegex,
} from '@atlaskit/editor-test-helpers';
import {
  updateStatus,
  setStatusPickerAt,
} from '../../../../plugins/status/actions';
import { setNodeSelectionNearPos } from '../../../../plugins/status/utils';
import { pluginKey } from '../../../../plugins/status/plugin';

export const setSelectionAndPickerAt = (pos: number) => (
  editorView: EditorView,
): EditorState => {
  setStatusPickerAt(pos)(editorView.state, editorView.dispatch);
  editorView.dispatch(setNodeSelectionNearPos(editorView.state.tr, pos));
  return editorView.state;
};

export const validateSelection = (pos: number, text: string, color: string) => (
  state: EditorState,
) => {
  let statusState = pluginKey.getState(state);

  expect(state.tr.selection).toBeInstanceOf(NodeSelection);
  expect(state.tr.selection.to).toBe(pos + 1);
  expect(statusState).toMatchObject({
    isNew: false,
    showStatusPickerAt: pos, // status node start position
  });
};

export const getStatusesInDocument = (
  state: EditorState,
  expectedLength: number,
): NodeWithPos[] => {
  const nodesFound = findChildrenByType(
    state.tr.doc,
    state.schema.nodes.status,
    true,
  );
  expect(nodesFound.length).toBe(expectedLength);
  return nodesFound;
};

describe('status plugin: plugin', () => {
  const createEditor = createEditorFactory();

  const editorFactory = (doc: any) =>
    createEditor({
      editorProps: {
        allowStatus: true,
      },
      doc,
    });

  describe('Edge cases', () => {
    it('StatusPicker should be dismissed if cursor is outside the Status node selection', () => {
      const { editorView } = editorFactory(doc(p('Status: {<>}')));
      // insert new Status at {<>}
      updateStatus({ text: 'Yay', color: 'blue' })(editorView);

      let statusState = pluginKey.getState(editorView.state);

      expect(editorView.state.tr.selection).toBeInstanceOf(NodeSelection);
      expect(editorView.state.tr.selection.to).toBe(
        editorView.state.tr.selection.from + 1,
      );
      expect(statusState).toMatchObject({
        isNew: true,
        showStatusPickerAt: editorView.state.tr.selection.from, // status node start position
      });

      const statusFromPosition = editorView.state.tr.selection.from;

      // simulate the scenario where user uses left arrow to move cursor outside the status node
      const beforeStatus = editorView.state.tr.doc.resolve(
        statusFromPosition - 1,
      );
      editorView.dispatch(
        editorView.state.tr.setSelection(new TextSelection(beforeStatus)),
      );

      statusState = pluginKey.getState(editorView.state);

      // expects the showStatusPickerAt to be reset to null
      expect(editorView.state.tr.selection).toBeInstanceOf(TextSelection);
      expect(editorView.state.tr.selection.to).toBe(statusFromPosition - 1);
      expect(statusState).toMatchObject({
        showStatusPickerAt: null,
      });
    });

    it('Empty status node should be removed when another status node is selected', () => {
      const { editorView } = editorFactory(
        doc(
          p(
            'Status: {<>}',
            status({
              text: '',
              color: 'blue',
              localId: '040fe0df-dd11-45ab-bc0c-8220c814f716',
            }),
            'WW',
            status({
              text: 'boo',
              color: 'yellow',
              localId: '040fe0df-dd11-45ab-bc0c-8220c814f720',
            }),
            'ZZ',
          ),
        ),
      );
      const cursorPos = editorView.state.tr.selection.from;

      // select the first status (empty text)
      let state = setSelectionAndPickerAt(cursorPos)(editorView);
      validateSelection(cursorPos, '', 'blue')(state);
      getStatusesInDocument(state, 2); // ensure there are two status nodes in the document

      // simulate the scenario where user selects another status
      state = setSelectionAndPickerAt(cursorPos + 3)(editorView);

      const statuses = getStatusesInDocument(state, 1);
      expect(statuses[0].node.attrs).toMatchObject({
        text: 'boo',
        color: 'yellow',
        localId: expect.stringMatching(StatusLocalIdRegex),
      });
    });

    it('Empty status node should be removed when a text node is selected', () => {
      const { editorView } = editorFactory(
        doc(
          p(
            'Status: {<>}',
            status({
              text: '',
              color: 'blue',
              localId: '040fe0df-dd11-45ab-bc0c-8220c814f716',
            }),
            'WW',
          ),
        ),
      );
      const cursorPos = editorView.state.tr.selection.from;

      // select the first status (empty text)
      let state = setSelectionAndPickerAt(cursorPos)(editorView);
      validateSelection(cursorPos, '', 'blue')(state);
      getStatusesInDocument(state, 1);

      // simulate the scenario where user selects a text node
      state = setSelectionAndPickerAt(cursorPos + 2)(editorView);
      getStatusesInDocument(state, 0);
    });
  });
});
