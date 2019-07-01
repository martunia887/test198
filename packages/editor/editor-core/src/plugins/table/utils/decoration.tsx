import { Node as PmNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { TableDecorations, TableCssClassName as ClassName } from '../types';
import { getCellsInRow, ContentNodeWithPos } from 'prosemirror-utils';

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

const findDecs = (decorationSet: DecorationSet): Decoration[] => {
  const a = decorationSet.find(
    undefined,
    undefined,
    spec => spec.key.indexOf('TABLE_HEY_CONTROLS_') > -1,
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
        element.classList.add('TABLE_COLUMN_MOUSE_POSITION');
        element.classList.add(ClassName.CONTROLS_BUTTON);
        element.dataset.index = `${index}`;

        return element;
      },
      {
        key: `TABLE_HEY_CONTROLS_${index}`,
      },
    );
  });

  return updateDecorations(state.doc, DecorationSet.empty, decs, findDecs);
};
