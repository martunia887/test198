import {
  EditorState,
  Plugin,
  PluginKey,
  Selection,
  NodeSelection,
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
            // selection changed
            let pluginState: StatusState = pluginKey.getState(view.state);
            const oldState = pluginKey.getState(prevState);

            if (oldState.showStatusPickerAt) {
              const statusNode = view.state.tr.doc.nodeAt(
                oldState.showStatusPickerAt,
              );
              if (statusNode) {
                const selectedStatus = statusNode.attrs as StatusType;
                if (
                  (selectedStatus.text &&
                    selectedStatus.text.trim().length === 0) ||
                  selectedStatus.text === ''
                ) {
                  let tr = view.state.tr;
                  tr = tr.delete(
                    oldState.showStatusPickerAt,
                    oldState.showStatusPickerAt + 1,
                  );

                  if (newSelection && newSelection instanceof NodeSelection) {
                    const nodeSelection = newSelection as NodeSelection;
                    if (
                      nodeSelection.node.type === prevState.schema.nodes.status
                    ) {
                      tr = tr.setMeta(pluginKey, {
                        showStatusPickerAt: pluginState.showStatusPickerAt,
                        isNew: pluginState.isNew,
                        selectedStatus: pluginState.selectedStatus,
                      });
                    }
                  } else {
                    tr = tr.setMeta(pluginKey, {
                      showStatusPickerAt: null,
                      isNew: false,
                      selectedStatus: null,
                    });
                  }
                  tr = tr.setSelection(newSelection);
                  view.dispatch(tr);
                  view.focus();
                  // update pluginState again after deleting the old status node since the node is unmounted
                  pluginState = pluginKey.getState(view.state);
                }
              }
            }
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
