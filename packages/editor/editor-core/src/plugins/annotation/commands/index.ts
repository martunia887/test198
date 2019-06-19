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
  let { tr } = state;
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
  const { from, to, $from } = state.selection;
  const pos = $from.pos - $from.textOffset;
  const annotationMark = state.schema.marks.annotation;
  const $pos = state.doc.resolve(from);
  const node = state.doc.nodeAt(from);
  const rightBound = pos + node.nodeSize;
  tr.removeMark(pos, rightBound, annotationMark);

  if (dispatch) {
    dispatch(tr);
  }
  return true;
};

export const removeQueryMark = (): Command => (state, dispatch): boolean => {
  const { tr } = state;
  const annotationMark = state.schema.marks.annotationQuery;
  tr.removeMark(0, state.doc.nodeSize - 2, annotationMark);
  if (dispatch) {
    dispatch(tr);
  }
  return true;
};
