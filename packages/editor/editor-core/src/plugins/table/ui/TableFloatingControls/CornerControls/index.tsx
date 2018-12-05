import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { isTableSelected, selectTable, findTable } from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';
import InsertButton from '../InsertButton';
import {
  clearHoverSelection,
  hoverTable,
  insertColumn,
  insertRow,
} from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';

export interface Props {
  editorView: EditorView;
  tableRef?: HTMLTableElement;
  isInDanger?: boolean;
  isHeaderColumnEnabled?: boolean;
  isHeaderRowEnabled?: boolean;
  isNumberColumnEnabled?: boolean;
  insertColumnButtonIndex?: number;
  insertRowButtonIndex?: number;
  hoveredRows?: number[];
}

function _isActive(props: Props) {
  const { editorView, hoveredRows } = props;
  const { selection } = editorView.state;
  const table = findTable(selection);
  if (!table) {
    return false;
  }
  return (
    isTableSelected(selection) ||
    (hoveredRows && hoveredRows.length === TableMap.get(table.node).height)
  );
}

function _clearHoverSelection(props: Props) {
  const { state, dispatch } = props.editorView;
  clearHoverSelection(state, dispatch);
}

function _selectTable(props: Props) {
  const { state, dispatch } = props.editorView;
  dispatch(selectTable(state.tr).setMeta('addToHistory', false));
}

function _hoverTable(props: Props) {
  const { state, dispatch } = props.editorView;
  hoverTable()(state, dispatch);
}

function _insertColumn(props: Props) {
  const { state, dispatch } = props.editorView;
  insertColumn(0)(state, dispatch);
}

function _insertRow(props: Props) {
  const { state, dispatch } = props.editorView;
  insertRow(0)(state, dispatch);
}

export default function CornerControls(props: Props) {
  const {
    isInDanger,
    isHeaderRowEnabled,
    isHeaderColumnEnabled,
    insertColumnButtonIndex,
    insertRowButtonIndex,
    tableRef,
  } = props;
  if (!tableRef) {
    return null;
  }
  const isActive = _isActive(props);

  return (
    <div className={`${ClassName.CORNER_CONTROLS} ${isActive ? 'active' : ''}`}>
      <button
        type="button"
        className={`${ClassName.CONTROLS_CORNER_BUTTON} ${
          isActive && isInDanger ? 'danger' : ''
        }`}
        onClick={() => _selectTable(props)}
        onMouseOver={() => _hoverTable(props)}
        onMouseOut={() => _clearHoverSelection(props)}
      />
      {!isHeaderColumnEnabled && (
        <InsertButton
          type="column"
          tableRef={tableRef}
          index={0}
          showInsertButton={insertColumnButtonIndex === 0}
          onMouseDown={() => _insertColumn(props)}
        />
      )}
      {!isHeaderRowEnabled && (
        <InsertButton
          type="row"
          tableRef={tableRef}
          index={0}
          showInsertButton={insertRowButtonIndex === 0}
          onMouseDown={() => _insertRow(props)}
        />
      )}
    </div>
  );
}
