import { Command } from '../../../types';
import { Selection } from 'prosemirror-state';
import { pluginKey } from '../pm-plugins/main';

export const insertComment = (id: string): Command => (
  state,
  dispatch,
): boolean => {
  const { tr } = state;
  const { from, to } = state.selection;
  const annotationMark = state.schema.marks.annotation;
  const annotationQueryMark = state.schema.marks.annotationQuery;
  tr.removeMark(from, to, annotationQueryMark);
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

export const setAnnotationQueryMarks = (): Command => (
  state,
  dispatch,
): boolean => {
  const { tr } = state;
  const { from, to } = state.selection;
  const annotationMark = state.schema.marks.annotationQuery;
  tr.addMark(from, to, annotationMark.create());
  tr.setSelection(Selection.near(tr.doc.resolve(to)));
  tr.setMeta(pluginKey, { type: 'INSERT_COMMENT' });
  if (dispatch) {
    dispatch(tr);
  }
  return true;
};

export const removeComment = (id: string): Command => (
  state,
  dispatch,
): boolean => {
  const { tr } = state;
  const { from, to } = state.selection;
  const annotationMark = state.schema.marks.annotation;
  tr.removeMark(from, to, annotationMark);
  tr.setSelection(Selection.near(tr.doc.resolve(to + 1)));

  if (dispatch) {
    dispatch(tr);
  }
  return true;
};

export const removeQueryMark = (): Command => (state, dispatch): boolean => {
  const { tr } = state;
  const { from, to } = state.selection;
  const annotationMark = state.schema.marks.annotationQuery;
  tr.removeMark(from, to, annotationMark);

  tr.setSelection(Selection.near(tr.doc.resolve(to + 1)));
  if (dispatch) {
    dispatch(tr);
  }
  return true;
};
