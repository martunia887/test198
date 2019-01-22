import { findParentNodeOfType } from 'prosemirror-utils';
import { CellSelection } from 'prosemirror-tables';
import { AlignmentState } from '../pm-plugins/main';

export const getActiveAlignment = (state): AlignmentState | undefined => {
  if (state.selection instanceof CellSelection) {
    let marks: string[] = [];
    state.selection.forEachCell(cell => {
      const mark = cell.firstChild!.marks.filter(
        mark => mark.type === state.schema.marks.alignment,
      )[0];
      if (mark) {
        marks.push(mark.attrs.align);
      } else {
        marks.push('start');
      }
    });

    let seen;
    for (let i = 0, len = marks.length; i < len; i++) {
      const mark = marks[i];

      if (typeof seen === 'undefined') {
        seen = mark;
      } else if (seen !== mark) {
        seen = null;
        break;
      }
    }
    return seen ? seen : 'start';
  }

  const node = findParentNodeOfType([
    state.schema.nodes.paragraph,
    state.schema.nodes.heading,
  ])(state.selection);
  const getMark =
    node &&
    node.node.marks.filter(
      mark => mark.type === state.schema.marks.alignment,
    )[0];

  return (getMark && getMark.attrs.align) || 'start';
};
