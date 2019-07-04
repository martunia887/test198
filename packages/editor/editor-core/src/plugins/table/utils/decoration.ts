import { Node as PmNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import {
  getCellsInRow,
  getCellsInColumn,
  ContentNodeWithPos,
} from 'prosemirror-utils';
import { TableDecorations, TableCssClassName as ClassName } from '../types';
import { getPluginState } from '../pm-plugins/main';

export const findControlsHoverDecoration = (
  decorationSet: DecorationSet,
): Decoration[] =>
  decorationSet.find(
    undefined,
    undefined,
    spec => spec.key === TableDecorations.CONTROLS_HOVER,
  );

const updateDecorations = (
  node: PmNode,
  decorationSet: DecorationSet,
  newDecorations: Decoration[],
  find: (decorationSet: DecorationSet) => Decoration[],
): DecorationSet =>
  newDecorations.length
    ? decorationSet.add(node, newDecorations)
    : decorationSet.remove(find(decorationSet));

const findDecorationByKey = (prefix: string) => (
  decorationSet: DecorationSet,
): Decoration[] => {
  const a = decorationSet.find(
    undefined,
    undefined,
    spec => spec.key.indexOf(prefix) > -1,
  );
  return a;
};

export const getControlsDecorations = (state: EditorState): DecorationSet => {
  const cells: ContentNodeWithPos[] = getCellsInRow(0)(state.selection) || [];
  const decs = cells.map((cell, index) => {
    return Decoration.widget(
      cell.pos + 1,
      () => {
        const element = document.createElement('div');
        element.classList.add(ClassName.COLUMN_CONTROLS_DECORATION);
        element.classList.add(ClassName.CONTROLS_BUTTON);
        element.dataset.index = `${index}`;

        return element;
      },
      {
        key: `TABLE_CONTROLS_DECORATION_${index}`,
      },
    );
  });

  return updateDecorations(
    state.doc,
    DecorationSet.empty,
    decs,
    findDecorationByKey('TABLE_CONTROLS_DECORATION_'),
  );
};

export const getColumnSelectedDecoration = (
  state: EditorState,
  columnIndexes: number[],
): DecorationSet => {
  const pluginState = getPluginState(state);

  const cells: ContentNodeWithPos[] = columnIndexes
    .reduce(
      (acc, columnIndex) => {
        const cellsInColumn = getCellsInColumn(columnIndex)(state.tr.selection);

        if (cellsInColumn) {
          acc.push(cellsInColumn);
        }

        return acc;
      },
      [] as ContentNodeWithPos[][],
    )
    .reduce((acc, val) => acc.concat(val), []);

  const decs = (cells || []).map((cell, index) => {
    return Decoration.node(
      cell.pos,
      cell.pos + cell.node.nodeSize,
      {
        class: ClassName.COLUMN_SELECTED,
      },
      {
        key: `TABLE_COLUMN_SELECTED_${index}`,
      },
    );
  });

  const decorationSet = updateDecorations(
    state.doc,
    pluginState.decorationSet,
    [],
    findDecorationByKey('TABLE_COLUMN_SELECTED_'),
  );

  return updateDecorations(
    state.doc,
    decorationSet,
    decs,
    findDecorationByKey('TABLE_COLUMN_SELECTED_'),
  );
};

export const removeColumnsAndRowsSelection = (
  state: EditorState,
): DecorationSet => {
  const pluginState = getPluginState(state);
  return updateDecorations(
    state.doc,
    pluginState.decorationSet,
    [],
    findDecorationByKey('TABLE_COLUMN_SELECTED_'),
  );
};
