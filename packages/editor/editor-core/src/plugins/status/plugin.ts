import {
  EditorState,
  Plugin,
  PluginKey,
  Selection,
  NodeSelection,
  Transaction,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Color as ColorType } from '@atlaskit/status';
import StatusNodeView from './nodeviews/status';
import { ReactNodeView } from '../../nodeviews';
import { PMPluginFactory } from '../../types';

export const pluginKey = new PluginKey('statusPlugin');

export type StatusType = {
  color: ColorType;
  text: string;
  localId?: string;
};

export type StatusState = {
  isNew: boolean;
  showStatusPickerAt: number | null;
  selectionChanges: SelectionChange;
  selectedStatus: StatusType | null;
};

export type SelectionChangeHandler = (
  newSelection: Selection,
  prevSelection: Selection,
) => any;

export class SelectionChange {
  private changeHandlers: SelectionChangeHandler[] = [];

  constructor() {
    this.changeHandlers = [];
  }

  subscribe(cb: SelectionChangeHandler) {
    this.changeHandlers.push(cb);
  }

  unsubscribe(cb: SelectionChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  notifyNewSelection(newSelection: Selection, prevSelection: Selection) {
    this.changeHandlers.forEach(cb => cb(newSelection, prevSelection));
  }
}

const getStatusNodeAt = (
  view: EditorView,
  position?: number,
): StatusType | null => {
  if (position) {
    const node = view.state.tr.doc.nodeAt(position);
    if (node && node.type === view.state.schema.nodes.status) {
      return node.attrs as StatusType;
    }
  }
  return null;
};

const isStatusNodeSelection = (selection: Selection, statusSchema): boolean => {
  if (selection && selection instanceof NodeSelection) {
    const nodeSelection = selection as NodeSelection;
    return nodeSelection.node.type === statusSchema;
  }
  return false;
};

const isEmptyStatus = (node: StatusType): boolean =>
  node && ((node.text && node.text.trim().length === 0) || node.text === '');

const deleteNodeAt = (position: number, tr: Transaction): Transaction =>
  tr.delete(position, position + 1);

const handleStatusSelectionChange = (
  view: EditorView,
  prevEditorState: EditorState,
) => {
  const pluginState: StatusState = pluginKey.getState(view.state);
  const prevState = pluginKey.getState(prevEditorState);
  const newSelection = view.state.selection;

  const prevStatusNode = getStatusNodeAt(view, prevState.showStatusPickerAt);

  if (prevStatusNode && isEmptyStatus(prevStatusNode)) {
    const newSelectionIsStatus = isStatusNodeSelection(
      newSelection,
      view.state.schema.nodes.status,
    );
    const meta = {
      showStatusPickerAt: newSelectionIsStatus
        ? pluginState.showStatusPickerAt
        : null,
      isNew: newSelectionIsStatus ? pluginState.isNew : false,
      selectedStatus: newSelectionIsStatus ? pluginState.selectedStatus : null,
    };
    // delete node and set the selection to the new Status instance if newSelection is a Status node
    const tr = deleteNodeAt(prevState.showStatusPickerAt, view.state.tr)
      .setMeta(pluginKey, meta)
      .setSelection(newSelection);

    view.dispatch(tr);
    view.focus();
  }
};

const createPlugin: PMPluginFactory = ({ dispatch, portalProviderAPI }) =>
  new Plugin({
    state: {
      init: () => ({
        isNew: false,
        selectionChanges: new SelectionChange(),
        showStatusPickerAt: null,
        selectedStatus: null,
      }),
      apply(tr, state: StatusState, editorState) {
        const meta = tr.getMeta(pluginKey);

        const nodeAtSelection = tr.doc.nodeAt(tr.selection.from);
        if (
          state.showStatusPickerAt &&
          (!nodeAtSelection ||
            nodeAtSelection.type !== editorState.schema.nodes.status)
        ) {
          let newState = {
            ...state,
            showStatusPickerAt: null,
            selectedStatus: null,
          };
          dispatch(pluginKey, newState);
          return newState;
        }

        if (meta) {
          let selectedStatus: StatusType | null = null;
          if (
            meta.showStatusPickerAt &&
            meta.showStatusPickerAt !== state.showStatusPickerAt
          ) {
            const statusNode = tr.doc.nodeAt(meta.showStatusPickerAt);
            if (statusNode) {
              selectedStatus = statusNode.attrs as StatusType;
            }
          }
          let newState = { ...state, ...meta, selectedStatus };
          dispatch(pluginKey, newState);
          return newState;
        }

        if (tr.docChanged && state.showStatusPickerAt) {
          const { pos, deleted } = tr.mapping.mapResult(
            state.showStatusPickerAt,
          );

          const newState = {
            showStatusPickerAt: deleted ? null : pos,
            selectedStatus: null,
          };

          if (newState.showStatusPickerAt !== state.showStatusPickerAt) {
            dispatch(pluginKey, newState);

            return newState;
          }
        }

        return state;
      },
    },
    key: pluginKey,
    props: {
      nodeViews: {
        status: ReactNodeView.fromComponent(StatusNodeView, portalProviderAPI),
      },
    },
    view: (view: EditorView) => {
      return {
        update: (view: EditorView, prevState: EditorState) => {
          const newSelection = view.state.selection;
          const prevSelection = prevState.selection;

          if (!prevSelection.eq(newSelection)) {
            handleStatusSelectionChange(view, prevState);
            // selection changed
            const pluginState: StatusState = pluginKey.getState(view.state);

            const { selectionChanges } = pluginState;
            if (selectionChanges) {
              selectionChanges.notifyNewSelection(newSelection, prevSelection);
            }
          }
        },
      };
    },
  });

export default createPlugin;
