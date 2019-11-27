import * as React from 'react';
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

const CornerControls = ({
  isInDanger,
  isHeaderColumnEnabled,
  isHeaderRowEnabled,
  editorView,
  hoveredRows,
  isResizing,
}: Props) => {
  const { state, dispatch } = editorView;

  const isActive = React.useMemo(() => {
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
  }, [hoveredRows, isResizing, state.selection]);

  const onMouseOver = () => hoverTable()(state, dispatch);

  const onMouseOut = () => clearHoverSelection()(state, dispatch);

  const onClick = () =>
    dispatch(selectTable(state.tr).setMeta('addToHistory', false));

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

export default CornerControls;
