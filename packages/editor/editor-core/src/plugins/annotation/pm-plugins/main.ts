import { Node } from 'prosemirror-model';
import { Schema } from 'prosemirror-model';
import {
  EditorState,
  Plugin,
  PluginKey,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { shallowEqual } from '../../../plugins/text-formatting/utils';
import { ReactElement } from 'react';

export interface AnnotationProvider {
  component: ReactElement;
}

export enum LinkAction {
  SHOW_INSERT_TOOLBAR = 'SHOW_INSERT_TOOLBAR',
  HIDE_TOOLBAR = 'HIDE_TOOLBAR',
  SELECTION_CHANGE = 'SELECTION_CHANGE',
  EDIT_INSERTED_TOOLBAR = 'EDIT_INSERTED_TOOLBAR',
}
export enum InsertStatus {
  EDIT_LINK_TOOLBAR = 'EDIT',
  INSERT_LINK_TOOLBAR = 'INSERT',
}

export type InsertState = {
  type: InsertStatus.INSERT_LINK_TOOLBAR;
  from: number;
  to: number;
};

export type EditInsertedState = {
  type: InsertStatus.EDIT_LINK_TOOLBAR;
  node: Node;
  pos: number;
};

export type InlineCommentsToolbarState =
  | EditInsertedState
  | InsertState
  | undefined;

export const canLinkBeCreatedInRange = (from: number, to: number) => (
  state: EditorState,
) => {
  return true;
  if (!state.doc.rangeHasMark(from, to, state.schema.marks.link)) {
    const $from = state.doc.resolve(from);
    const $to = state.doc.resolve(to);
    const link = state.schema.marks.link;
    if ($from.parent === $to.parent && $from.parent.isTextblock) {
      if ($from.parent.type.allowsMarkType(link)) {
        let allowed = true;
        state.doc.nodesBetween(from, to, node => {
          allowed = allowed && !node.marks.some(m => m.type.excludes(link));
          return allowed;
        });
        return allowed;
      }
    }
  }
  return false;
};

const isSelectionInsideLink = (state: EditorState | Transaction) =>
  !!state.doc.type.schema.marks.annotation.isInSet(
    state.selection.$from.marks(),
  );

const isSelectionAroundLink = (state: EditorState | Transaction) => {
  const { $from, $to } = state.selection;
  const node = $from.nodeAfter;

  return (
    !!node &&
    $from.textOffset === 0 &&
    $to.pos - $from.pos === node.nodeSize &&
    !!state.doc.type.schema.marks.annotation.isInSet(node.marks)
  );
};

const mapTransactionToState = (
  state: InlineCommentsToolbarState,
  tr: Transaction,
): InlineCommentsToolbarState => {
  if (!state) {
    return undefined;
  } else if (state.type === InsertStatus.EDIT_LINK_TOOLBAR) {
    const { pos, deleted } = tr.mapping.mapResult(state.pos, 1);
    const node = tr.doc.nodeAt(pos) as Node;
    // If the position was not deleted & it is still a link
    if (!deleted && !!node.type.schema.marks.link.isInSet(node.marks)) {
      if (node === state.node && pos === state.pos) {
        return state;
      }
      return { ...state, pos, node };
    }
    // If the position has been deleted, then require a navigation to show the toolbar again
    return;
  } else if (state.type === InsertStatus.INSERT_LINK_TOOLBAR) {
    return {
      ...state,
      from: tr.mapping.map(state.from),
      to: tr.mapping.map(state.to),
    };
  }
  return;
};

const toState = (
  state: InlineCommentsToolbarState,
  action: LinkAction,
  editorState: EditorState,
): InlineCommentsToolbarState => {
  // Show insert or edit toolbar
  if (!state) {
    switch (action) {
      case LinkAction.SHOW_INSERT_TOOLBAR: {
        const { from, to } = editorState.selection;
        if (canLinkBeCreatedInRange(from, to)(editorState)) {
          return {
            type: InsertStatus.INSERT_LINK_TOOLBAR,
            from,
            to,
          };
        }
        return undefined;
      }
      case LinkAction.SELECTION_CHANGE:
        // If the user has moved their cursor, see if they're in a link
        const link = getActiveLinkMark(editorState);
        if (link) {
          return { ...link, type: InsertStatus.EDIT_LINK_TOOLBAR };
        }
        return undefined;
      default:
        return undefined;
    }
  }
  // Update toolbar state if selection changes, or if toolbar is hidden
  if (state.type === InsertStatus.EDIT_LINK_TOOLBAR) {
    switch (action) {
      case LinkAction.EDIT_INSERTED_TOOLBAR: {
        const link = getActiveLinkMark(editorState);
        if (link) {
          if (link.pos === state.pos && link.node === state.node) {
            return { ...state, type: InsertStatus.EDIT_LINK_TOOLBAR };
          }
          return { ...link, type: InsertStatus.EDIT_LINK_TOOLBAR };
        }
        return undefined;
      }
      case LinkAction.SELECTION_CHANGE:
        const link = getActiveLinkMark(editorState);
        if (link) {
          if (link.pos === state.pos && link.node === state.node) {
            // Make sure we return the same object, if it's the same link
            return state;
          }
          return { ...link, type: InsertStatus.EDIT_LINK_TOOLBAR };
        }
        return undefined;
      case LinkAction.HIDE_TOOLBAR:
        return undefined;
      default:
        return state;
    }
  }

  // Remove toolbar if user changes selection or toolbar is hidden
  if (state.type === InsertStatus.INSERT_LINK_TOOLBAR) {
    switch (action) {
      case LinkAction.SELECTION_CHANGE:
      case LinkAction.HIDE_TOOLBAR:
        return undefined;
      default:
        return state;
    }
  }

  return;
};

const getActiveLinkMark = (
  state: EditorState | Transaction,
): { node: Node; pos: number } | undefined => {
  const {
    selection: { $from },
  } = state;

  if (isSelectionInsideLink(state) || isSelectionAroundLink(state)) {
    const pos = $from.pos - $from.textOffset;
    const node = state.doc.nodeAt(pos);
    return node && node.isText ? { node, pos } : undefined;
  }

  return undefined;
};

const getActiveText = (
  schema: Schema,
  selection: Selection,
): string | undefined => {
  const currentSlice = selection.content();

  if (currentSlice.size === 0) {
    return;
  }

  if (
    currentSlice.content.childCount === 1 &&
    [
      schema.nodes.text,
      schema.nodes.paragraph,
      schema.nodes.heading,
      schema.nodes.taskItem,
      schema.nodes.decisionItem,
    ].indexOf(currentSlice.content.firstChild!.type) !== -1
  ) {
    return currentSlice.content.firstChild!.textContent;
  }
  return;
};

export interface HyperlinkState {
  element?: HTMLElement;
  activeText?: string;
  activeInlineComment?: InlineCommentsToolbarState;
  component?: React.ReactElement | React.Component | JSXElementConstructor;
  showAnnotationToolbar: boolean;
}

export const pluginKey = new PluginKey('annotationPlugin');

export const plugin = (dispatch: Dispatch, provider?: AnnotationProvider) =>
  new Plugin({
    state: {
      init(_, state: EditorState): HyperlinkState {
        return {
          element: undefined,
          activeText: getActiveText(state.schema, state.selection),
          activeInlineComment: toState(
            undefined,
            LinkAction.SELECTION_CHANGE,
            state,
          ),
          component: provider,
          showAnnotationToolbar: false,
        };
      },
      apply(
        tr,
        pluginState: HyperlinkState,
        _oldState,
        newState,
      ): HyperlinkState {
        let state = pluginState;
        const action =
          tr.getMeta(pluginKey) && (tr.getMeta(pluginKey).type as LinkAction);

        if (tr.docChanged) {
          state = {
            ...state,
            showAnnotationToolbar: action === 'INSERT_COMMENT',
            activeText: state.activeText,
            activeInlineComment: mapTransactionToState(
              state.activeInlineComment,
              tr,
            ),
          };
        }

        if (action) {
          state = {
            ...state,
            activeText: state.activeText,
            showAnnotationToolbar: action === 'INSERT_COMMENT',
            activeInlineComment: toState(
              state.activeInlineComment,
              action,
              newState,
            ),
          };
        }

        if (tr.selectionSet) {
          state = {
            ...state,
            element: window.getSelection().anchorNode.parentElement,
            showAnnotationToolbar: action === 'INSERT_COMMENT',
            activeText: getActiveText(newState.schema, newState.selection),
            activeInlineComment: toState(
              state.activeInlineComment,
              LinkAction.SELECTION_CHANGE,
              newState,
            ),
          };
        }

        if (!shallowEqual(state, pluginState)) {
          dispatch(pluginKey, state);
        }
        return state;
      },
    },
    key: pluginKey,
  });
