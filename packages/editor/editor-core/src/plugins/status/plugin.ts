import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import StatusNodeView from './nodeviews/status';
import { ReactNodeView } from '../../nodeviews';
import { PMPluginFactory } from '../../types';
import {
  mayGetStatusNodeAt,
  isEmptyStatus,
  setSelectionNearPos,
  removeEmptyStatusesFromDoc,
} from './utils';
import { StatusType, StatusState, SelectionChange } from './types';

export const pluginKey = new PluginKey('statusPlugin');

const createPlugin: PMPluginFactory = ({ dispatch, portalProviderAPI }) =>
  new Plugin({
    state: {
      init: () => ({
        isNew: false,
        selectionChanges: new SelectionChange(),
        showStatusPickerAt: null,
        selectedStatus: null,
      }),
      apply(tr, state: StatusState, oldEditorState, newEditorState) {
        const meta = tr.getMeta(pluginKey);
        const statusNodeAtSelection = mayGetStatusNodeAt(tr.selection);
        if (
          state.showStatusPickerAt &&
          (!statusNodeAtSelection ||
            // note: Status node has to==from+1 so from==to is positioned just before the Status node and StatusPicker should be dismissed
            tr.selection.from === tr.selection.to)
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
    appendTransaction: (
      transactions: Transaction[],
      oldEditorState: EditorState,
      newEditorState: EditorState,
    ) => {
      let oldStatus: StatusType | null = mayGetStatusNodeAt(
        oldEditorState.selection,
      );
      let newStatus: StatusType | null = mayGetStatusNodeAt(
        newEditorState.selection,
      );

      const newState = pluginKey.getState(newEditorState);
      let tr = newEditorState.tr;
      let changed = false;

      // user hit Enter key in the StatusPicker with empty text - emptyCurrentNode is set in actions.commitStatusPicker()
      if (newState && newState.emptyCurrentNode) {
        if (newStatus && isEmptyStatus(newStatus)) {
          const pos = newEditorState.selection.from;
          tr.deleteSelection();
          setSelectionNearPos(tr, pos);
          changed = true;
        }
      }

      // user leaves the StatusPicker with empty text and selects a new node
      if (transactions.find(tr => tr.selectionSet)) {
        if (
          oldStatus &&
          ((newStatus && oldStatus.localId !== newStatus.localId) || !newStatus)
        ) {
          if (isEmptyStatus(oldStatus)) {
            const pos = oldEditorState.selection.from;
            tr.delete(
              tr.mapping.map(pos),
              tr.mapping.map(pos + 1),
            ).setSelection(newEditorState.selection);
            changed = true;
          }
        }
      }
      return changed ? tr : undefined;
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
          const pluginState: StatusState = pluginKey.getState(view.state);

          if (!prevSelection.eq(newSelection)) {
            const { selectionChanges } = pluginState;
            if (selectionChanges) {
              selectionChanges.notifyNewSelection(newSelection, prevSelection);
            }
          }

          // user hit Enter key in the StatusPicker with empty text - emptyCurrentNode is set in actions.commitStatusPicker()
          // simply reset emptyCurrentNode
          if (pluginState && pluginState.emptyCurrentNode) {
            const tr = view.state.tr;
            tr.setMeta(pluginKey, {
              ...view.state,
              emptyCurrentNode: false,
            });
            view.dispatch(tr);
          }
          // user created an empty status and exited or created a valid status and then undo the operation: an empty status node appears in the case.
          // to fix this problem, there is a undo command listener in keymap to set the undo property to true so that this code can delete all empty
          // statuses from the document - not ideal to traverse the entire document but no alternative solutions found.
          else if (pluginState && pluginState.undo) {
            const { tr, selection } = view.state;
            const statusRemoved = !!removeEmptyStatusesFromDoc(tr);
            tr.setMeta(pluginKey, {
              ...view.state,
              undo: false,
            });
            if (statusRemoved) {
              setSelectionNearPos(tr, selection.from);
            }
            view.dispatch(tr);
          }
        },
      };
    },
  });

export default createPlugin;
