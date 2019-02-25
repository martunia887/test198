import { Fragment } from 'prosemirror-model';
import {
  EditorState,
  NodeSelection,
  Transaction,
  Selection,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { uuid } from '@atlaskit/adf-schema';
import { pluginKey, StatusType } from './plugin';

export const DEFAULT_STATUS: StatusType = {
  text: '',
  color: 'neutral',
};

export const createStatus = (offset = -2) => (
  insert: (node: Node | Object | string) => Transaction,
  state: EditorState,
): Transaction => {
  const statusNode = state.schema.nodes.status.createChecked({
    ...DEFAULT_STATUS,
    localId: uuid.generate(),
  });

  const selectedStatus = statusNode.attrs;
  const tr = insert(statusNode);
  const pos = tr.selection.from + offset;

  return tr.setSelection(NodeSelection.create(tr.doc, pos)).setMeta(pluginKey, {
    isNew: true,
    selectedStatus,
  });
};

export const updateStatus = (status?: StatusType) => (
  editorView: EditorView,
): boolean => {
  const { state, dispatch } = editorView;
  const { schema } = state;
  const selectedStatus = null;

  const updatedStatus = status
    ? Object.assign(status, {
        text: status.text.trim(),
        localId: status.localId || uuid.generate(),
      })
    : status;

  const statusProps = {
    ...DEFAULT_STATUS,
    ...updatedStatus,
  };

  let tr = state.tr;
  const pluginState = pluginKey.getState(state);
  if (!pluginState.selectedStatus) {
    // Same behaviour as quick insert (used in createStatus)
    const statusNode = schema.nodes.status.createChecked(statusProps);
    const fragment = Fragment.fromArray([statusNode, state.schema.text(' ')]);

    const newShowStatusPickerAt = tr.selection.from;
    tr = tr.replaceWith(newShowStatusPickerAt, newShowStatusPickerAt, fragment);
    tr = tr.setSelection(NodeSelection.create(tr.doc, newShowStatusPickerAt));
    tr = tr
      .setMeta(pluginKey, {
        selectedStatus,
        isNew: true,
      })
      .scrollIntoView();
    dispatch(tr);
    return true;
  }

  if (pluginState.selectedStatus) {
    const pos = tr.selection.from;
    tr = tr.setNodeMarkup(pos, schema.nodes.status, statusProps);
    tr = tr.setSelection(NodeSelection.create(tr.doc, pos));
    tr = tr.setMeta(pluginKey, { selectedStatus }).scrollIntoView();

    dispatch(tr);
    return true;
  }

  return false;
};

export const commitStatusPicker = (select: boolean) => (
  editorView: EditorView,
) => {
  const { state, dispatch } = editorView;
  const { selectedStatus } = pluginKey.getState(state);

  if (!selectedStatus) {
    return;
  }

  let tr = state.tr;
  tr.setMeta(pluginKey, {
    isNew: false,
    selectedStatus: null,
  });

  if (selectedStatus.text) {
    // still has content - keep content, move selection after status
    //if (select) {
    tr.setSelection(
      Selection.near(state.tr.doc.resolve(tr.selection.from + 2)),
    );
    //}
  } else {
    // no content - remove node
    tr.deleteSelection();
  }

  dispatch(tr);
  editorView.focus();
};
