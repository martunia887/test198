import { Command } from '../../../types';
import { pluginKey, ACTIONS } from '../pm-plugins/main';
import { findTypeAheadQuery } from '../utils/find-query-mark';
import { isQueryActive } from '../utils/is-query-active';

export const updateQueryCommand = (query: string): Command => (
  state,
  dispatch,
) => {
  const queryMark = findTypeAheadQuery(state);
  const activeQuery = isQueryActive(
    state.schema.marks.typeAheadQuery,
    state.doc,
    state.selection.from,
    state.selection.to,
  );

  if (queryMark === null || activeQuery === false) {
    return false;
  }

  if (dispatch) {
    dispatch(
      state.tr.setMeta(pluginKey, {
        action: ACTIONS.SET_QUERY,
        params: { query },
      }),
    );
  }
  return true;
};
