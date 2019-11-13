import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
import { CornerControls } from './CornerControls';
import RowControls from './RowControls';
import { isSelectionUpdated } from '../../utils';
import { TableColumnOrdering } from '../../types';

export interface Props {
  editorView: EditorView;
  editorParent: HTMLElement;
  selection?: Selection;
  tableRef?: HTMLTableElement;
  tableActive?: boolean;
  isInDanger?: boolean;
  isResizing?: boolean;
  isHeaderRowEnabled?: boolean;
  isHeaderColumnEnabled?: boolean;
  isNumberColumnEnabled?: boolean;
  hasMergedCells?: boolean;
  hasHeaderRow?: boolean;
  tableHeight?: number;
  hoveredRows?: number[];
  ordering?: TableColumnOrdering;
  multiReorderIndexes?: number[];
}

export default class TableFloatingControls extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      tableRef,
      isInDanger,
      isResizing,
      isHeaderRowEnabled,
      isNumberColumnEnabled,
      hoveredRows,
      selection,
      tableHeight,
      tableActive,
      isHeaderColumnEnabled,
      ordering,
    } = this.props;

    return (
      ordering !== nextProps.ordering ||
      tableRef !== nextProps.tableRef ||
      tableHeight !== nextProps.tableHeight ||
      tableActive !== nextProps.tableActive ||
      isInDanger !== nextProps.isInDanger ||
      isResizing !== nextProps.isResizing ||
      hoveredRows !== nextProps.hoveredRows ||
      isHeaderRowEnabled !== nextProps.isHeaderRowEnabled ||
      isHeaderColumnEnabled !== nextProps.isHeaderColumnEnabled ||
      isNumberColumnEnabled !== nextProps.isNumberColumnEnabled ||
      isSelectionUpdated(selection!, nextProps.selection)
    );
  }

  render() {
    const {
      editorView,
      tableRef,
      isInDanger,
      isResizing,
      isNumberColumnEnabled,
      isHeaderRowEnabled,
      isHeaderColumnEnabled,
      tableActive,
      hasHeaderRow,
      hoveredRows,
      hasMergedCells,
      multiReorderIndexes,
      editorParent,
    } = this.props;

    if (!tableRef) {
      return null;
    }

    return (
      <div onMouseDown={e => e.preventDefault()}>
        <CornerControls
          editorView={editorView}
          tableRef={tableRef}
          isInDanger={isInDanger}
          isResizing={isResizing}
          isHeaderRowEnabled={isHeaderRowEnabled}
          isHeaderColumnEnabled={isHeaderColumnEnabled}
          hoveredRows={hoveredRows}
        />
        <RowControls
          editorView={editorView}
          tableRef={tableRef}
          hoveredRows={hoveredRows}
          isInDanger={isInDanger}
          isResizing={isResizing}
          isNumberColumnEnabled={isNumberColumnEnabled}
          hasHeaderRow={hasHeaderRow}
          tableActive={tableActive}
          isHeaderRowEnabled={isHeaderRowEnabled}
          hasMergedCells={hasMergedCells}
          editorParent={editorParent}
          multiReorderIndexes={multiReorderIndexes}
        />
      </div>
    );
  }
}
