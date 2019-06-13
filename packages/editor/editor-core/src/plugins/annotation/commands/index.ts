import { Command } from '../../../types';
import { Selection } from 'prosemirror-state';

export const insertComment = (id: string): Command => (
  state,
  dispatch,
): boolean => {
  const { tr } = state;
  const { from, to } = state.selection;
  const annotationMark = state.schema.marks.annotation;
  tr.addMark(
    from,
    to,
    annotationMark.create({ id, annotationType: 'inlineComment' }),
  );
  tr.setSelection(Selection.near(tr.doc.resolve(to + 1)));
  if (dispatch) {
    dispatch(tr);
  }
  return true;
};
