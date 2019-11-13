import * as React from 'react';
import { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { EditorView } from 'prosemirror-view';
import { isTableSelected, selectTable, findTable } from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';

import { clearHoverSelection, hoverTable } from '../../../commands';
import { TableCssClassName as ClassName } from '../../../types';

export interface Props {
  editorView: EditorView;
  tableRef?: HTMLTableElement;
  isInDanger?: boolean;
  isResizing?: boolean;
  hoveredRows?: number[];
  isHeaderColumnEnabled?: boolean;
  isHeaderRowEnabled?: boolean;
}

export const CornerControls = ({
  isInDanger,
  tableRef,
  isHeaderColumnEnabled,
  isHeaderRowEnabled,
  editorView,
  hoveredRows,
  isResizing,
}: Props) => {
  if (!tableRef) {
    return null;
  }
  const { state, dispatch } = editorView;

  const isActive = useMemo(() => {
    const table = findTable(state.selection);
    if (!table) {
      return false;
    }
    return (
      isTableSelected(state.selection) ||
      (hoveredRows &&
        hoveredRows.length === TableMap.get(table.node).height &&
        !isResizing)
    );
  }, [isResizing, hoveredRows, state]);

  const onMouseOver = useCallback(() => hoverTable()(state, dispatch), [
    state,
    dispatch,
  ]);

  const onMouseOut = useCallback(() => clearHoverSelection()(state, dispatch), [
    state,
    dispatch,
  ]);

  const onClick = useCallback(() => {
    dispatch(selectTable(state.tr).setMeta('addToHistory', false));
  }, [state, dispatch]);

  return (
    <div
      className={classnames(ClassName.CORNER_CONTROLS, {
        active: isActive,
      })}
    >
      <button
        type="button"
        className={classnames(ClassName.CONTROLS_CORNER_BUTTON, {
          danger: isActive && isInDanger,
        })}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />

      {!isHeaderRowEnabled && (
        <div className={ClassName.CORNER_CONTROLS_INSERT_ROW_MARKER}>
          <div className={ClassName.CONTROLS_INSERT_MARKER} />
        </div>
      )}
      {!isHeaderColumnEnabled && (
        <div className={ClassName.CORNER_CONTROLS_INSERT_COLUMN_MARKER}>
          <div className={ClassName.CONTROLS_INSERT_MARKER} />
        </div>
      )}
    </div>
  );
};
