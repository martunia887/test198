import { DecorationSet, Decoration } from 'prosemirror-view';
import {
  EditorState,
  Plugin,
  PluginKey,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Color as ColorType } from '@atlaskit/status';
import StatusNodeView from './nodeviews/status';
import { ReactNodeView } from '../../nodeviews';
import { PMPluginFactory } from '../../types';
import { ZWSP } from '../../utils';
import {
  mayGetStatusNodeAt,
  isEmptyStatus,
  setSelectionNearPos,
} from './utils';

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
        selectedStatus: null,
      }),
      apply(tr, state: StatusState) {
        const meta = tr.getMeta(pluginKey);
        const statusNodeAtSelection = mayGetStatusNodeAt(tr.selection);
        let newState = state;

        if (!statusNodeAtSelection) {
          if (state.selectedStatus) {
            newState = {
              ...state,
              selectedStatus: null,
            };
          }
        } else {
          if (state.selectedStatus !== statusNodeAtSelection) {
            newState = { ...state, selectedStatus: statusNodeAtSelection };
          }
        }

        if (meta) {
          newState = { ...newState, ...meta };
        }

        if (newState !== state) {
          dispatch(pluginKey, newState);
        }
        return newState;
      },
    },
    appendTransaction: (
      transactions: Transaction[],
      oldEditorState: EditorState,
      newEditorState: EditorState,
    ) => {
      let changed = false;
      let tr = newEditorState.tr;

      // user leaves the StatusPicker with empty text and selects a new node
      if (transactions.find(tr => tr.selectionSet)) {
        let oldStatus = mayGetStatusNodeAt(oldEditorState.selection);
        let newStatus = mayGetStatusNodeAt(newEditorState.selection);
        if (
          oldStatus &&
          ((newStatus && oldStatus.localId !== newStatus.localId) || !newStatus)
        ) {
          if (isEmptyStatus(oldStatus)) {
            const pos = oldEditorState.selection.from;
            tr.delete(tr.mapping.map(pos), tr.mapping.map(pos + 1));
            setSelectionNearPos(tr, pos); // without forcing the selection the selection border in status react component gets lost
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
      decorations(state: EditorState) {
        const { tr } = state;
        const nodeAtSelection = tr.doc.nodeAt(tr.selection.from);

        if (
          nodeAtSelection &&
          nodeAtSelection.type === state.schema.nodes.status
        ) {
          const delayedNodeRendering = () => {
            return document.createTextNode(ZWSP);
          };

          const decoration = Decoration.widget(
            tr.selection.from,
            delayedNodeRendering,
            {
              side: 1,
              key: '#status-zero-width-char-decoration',
            },
          );

          const { doc } = state;
          return DecorationSet.create(doc, [decoration]);
        }

        return null;
      },
    },
    view: (_view: EditorView) => {
      return {
        update: (view: EditorView, prevState: EditorState) => {
          const newSelection = view.state.selection;
          const prevSelection = prevState.selection;
          if (!prevSelection.eq(newSelection)) {
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
