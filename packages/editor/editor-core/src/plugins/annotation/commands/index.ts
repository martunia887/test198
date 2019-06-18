import { Command } from '../../../types';
import { Selection } from 'prosemirror-state';
import { pluginKey } from '../pm-plugins/main';
import { cascadeCommands } from '../../alignment/commands';

export const insertComment = (id: string): Command => (state, dispatch) => {
  return cascadeCommands([removeQueryMark(), createAnnotationMark(id)])(
    state,
    dispatch,
  );
};

export const createAnnotationMark = (id: string): Command => (
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
  tr.setSelection(Selection.near(tr.doc.resolve(to)));
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
  // tr.setSelection(Selection.near(tr.doc.resolve(to)));
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

  // tr.setSelection(Selection.near(tr.doc.resolve(to + 1)));
  if (dispatch) {
    dispatch(tr);
  }
  return true;
};
