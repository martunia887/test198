import * as React from 'react';
import { isRowSelected } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { clearHoverSelection } from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';

export interface Props {
  editorView: EditorView;
  tableRef: HTMLElement;
  tableActive?: boolean;
  hoverRows: (rows: number[], danger?: boolean) => void;
  hoveredRows?: number[];
  selectRow: (row: number) => void;
  hasHeaderRow?: boolean;
  isInDanger?: boolean;
}

const _hoverRows = (index: number, props: Props) =>
  props.tableActive && props.hoverRows([index]);
const _selectRow = (index: number, props: Props) =>
  props.tableActive && props.selectRow(index);

function _clearHoverSelection(props: Props) {
  const { tableActive, editorView } = props;
  if (tableActive) {
    const { state, dispatch } = editorView;
    clearHoverSelection(state, dispatch);
  }
}

function _getClassNames(index: number, props: Props) {
  const { hoveredRows, editorView, isInDanger } = props;
  const isActive =
    isRowSelected(index)(editorView.state.selection) ||
    (hoveredRows || []).indexOf(index) !== -1;
  return [
    ClassName.NUMBERED_COLUMN_BUTTON,
    isActive ? 'active' : '',
    isActive && isInDanger ? 'danger' : '',
  ].join(' ');
}

export default function NumberColumn(props: Props) {
  const { tableRef, hasHeaderRow } = props;
  const tbody = tableRef.querySelector('tbody');
  if (!tbody) {
    return null;
  }
  const rows = tbody.querySelectorAll('tr');

  return (
    <div className={ClassName.NUMBERED_COLUMN}>
      {Array.from(Array(rows.length).keys()).map(index => (
        <div
          key={`wrapper-${index}`}
          className={_getClassNames(index, props)}
          style={{
            height: (rows[index] as HTMLElement).offsetHeight + 1,
          }}
          onClick={() => _selectRow(index, props)}
          onMouseOver={() => _hoverRows(index, props)}
          onMouseOut={() => _clearHoverSelection(props)}
        >
          {hasHeaderRow ? (index > 0 ? index : null) : index + 1}
        </div>
      ))}
    </div>
  );
}
