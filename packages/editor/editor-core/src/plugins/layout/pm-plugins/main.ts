import { Node, Slice } from 'prosemirror-model';
import {
  PluginKey,
  Plugin,
  EditorState,
  TextSelection,
} from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { keydownHandler } from 'prosemirror-keymap';
import { findParentNodeOfType, ContentNodeWithPos } from 'prosemirror-utils';
import { filter } from '../../../utils/commands';
import { Command } from '../../../types';
import { fixColumnSizes, PresetLayout, getPresetLayout } from '../actions';

export type LayoutState = {
  pos: number | null;
  allowBreakout: boolean;
  addSidebarLayouts: boolean;
  selectedLayout: PresetLayout | undefined;
};

type Change = { from: number; to: number; slice: Slice };

const isWholeSelectionInsideLayoutColumn = (state: EditorState): boolean => {
  // Since findParentNodeOfType doesn't check if selection.to shares the parent, we do this check ourselves
  const fromParent = findParentNodeOfType(state.schema.nodes.layoutColumn)(
    state.selection,
  );
  if (fromParent) {
    const isToPosInsideSameLayoutColumn =
      state.selection.from < fromParent.pos + fromParent.node.nodeSize;
    return isToPosInsideSameLayoutColumn;
  }
  return false;
};

const moveCursorToNextColumn: Command = (state, dispatch) => {
  const { selection } = state;
  const {
    schema: {
      nodes: { layoutColumn, layoutSection },
    },
  } = state;
  const section = findParentNodeOfType(layoutSection)(selection)!;
  const column = findParentNodeOfType(layoutColumn)(selection)!;

  if (column.node !== section.node.lastChild) {
    const $nextColumn = state.doc.resolve(column.pos + column.node.nodeSize);
    const shiftedSelection = TextSelection.findFrom($nextColumn, 1);

    if (dispatch) {
      dispatch(state.tr.setSelection(shiftedSelection as TextSelection));
    }
  }
  return true;
};

// TODO: Look at memoize-one-ing this fn
const getNodeDecoration = (pos: number, node: Node) => [
  Decoration.node(pos, pos + node.nodeSize, { class: 'selected' }),
];

const getSelectedLayout = (
  maybeLayoutSection: ContentNodeWithPos | undefined,
  current: PresetLayout | undefined,
): PresetLayout | undefined => {
  if (
    maybeLayoutSection &&
    maybeLayoutSection.node &&
    getPresetLayout(maybeLayoutSection.node)
  ) {
    return getPresetLayout(maybeLayoutSection.node);
  }
  return current;
};

const getInitialPluginState = (
  pluginConfig:
    | { allowBreakout?: boolean; UNSAFE_addSidebarLayouts?: boolean }
    | undefined
    | boolean,
  state: EditorState,
): LayoutState => {
  const maybeLayoutSection = findParentNodeOfType(
    state.schema.nodes.layoutSection,
  )(state.selection);

  const allowBreakout =
    typeof pluginConfig === 'object' ? !!pluginConfig.allowBreakout : false;
  const addSidebarLayouts =
    typeof pluginConfig === 'object'
      ? !!pluginConfig.UNSAFE_addSidebarLayouts
      : false;
  const pos = maybeLayoutSection ? maybeLayoutSection.pos : null;
  const selectedLayout = getSelectedLayout(maybeLayoutSection, undefined);
  return { pos, allowBreakout, addSidebarLayouts, selectedLayout };
};

export const pluginKey = new PluginKey('layout');

export default (
  pluginConfig?:
    | { allowBreakout: boolean; UNSAFE_addSidebarLayouts?: boolean }
    | boolean,
) =>
  new Plugin({
    key: pluginKey,
    state: {
      init: (_, state): LayoutState =>
        getInitialPluginState(pluginConfig, state),

      apply: (tr, pluginState, _oldState, newState) => {
        if (tr.docChanged || tr.selectionSet) {
          const maybeLayoutSection = findParentNodeOfType(
            newState.schema.nodes.layoutSection,
          )(newState.selection);

          const newPluginState = {
            ...pluginState,
            pos: maybeLayoutSection ? maybeLayoutSection.pos : null,
            selectedLayout: getSelectedLayout(
              maybeLayoutSection,
              pluginState.selectedLayout,
            ),
          };
          return newPluginState;
        }
        return pluginState;
      },
    },
    props: {
      decorations(state) {
        const layoutState = pluginKey.getState(state) as LayoutState;
        if (layoutState.pos !== null) {
          return DecorationSet.create(
            state.doc,
            getNodeDecoration(layoutState.pos, state.doc.nodeAt(
              layoutState.pos,
            ) as Node),
          );
        }
        return undefined;
      },
      handleKeyDown: keydownHandler({
        Tab: filter(isWholeSelectionInsideLayoutColumn, moveCursorToNextColumn),
      }),
    },
    appendTransaction: (transactions, oldState, newState) => {
      let changes: Change[] = [];
      transactions.forEach(prevTr => {
        // remap change segments across the transaction set
        changes.map(change => {
          return {
            from: prevTr.mapping.map(change.from),
            to: prevTr.mapping.map(change.to),
            slice: change.slice,
          };
        });

        // don't consider transactions that don't mutate
        if (!prevTr.docChanged) {
          return;
        }

        const change = fixColumnSizes(
          prevTr,
          newState,
          pluginKey.getState(newState).selectedLayout,
        );
        if (change) {
          changes.push(change);
        }
      });

      if (changes.length) {
        const tr = newState.tr;
        const selection = newState.selection;

        changes.forEach(change => {
          tr.replaceRange(change.from, change.to, change.slice);
        });

        if (tr.docChanged) {
          tr.setSelection(selection);
          tr.setMeta('addToHistory', false);
          return tr;
        }
      }
    },
  });
