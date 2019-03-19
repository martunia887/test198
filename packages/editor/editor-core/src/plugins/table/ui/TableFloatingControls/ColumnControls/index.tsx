import * as React from 'react';
import { Component, SyntheticEvent } from 'react';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
import { getSelectionRect } from 'prosemirror-utils';
import { INPUT_METHOD } from '../../../../analytics';
import {
  hoverColumns,
  clearHoverSelection,
} from '../../../actions';
import {
  insertColumnWithAnalytics,
  deleteColumnsWithAnalytics,
} from '../../../actions-with-analytics';
import {
  isSelectionUpdated,
  getColumnsWidths,
  isColumnDeleteButtonVisible,
  getColumnDeleteButtonParams,
  getColumnsParams,
} from '../../../utils';
import { TableCssClassName as ClassName } from '../../../types';
import DeleteButton from '../DeleteButton';
import tableMessages from '../../messages';
import ColumnControlsButton from './ColumnControlsButton';

export interface Props {
  editorView: EditorView;
  hoveredColumns?: number[];
  isInDanger?: boolean;
  isResizing?: boolean;
  insertColumnButtonIndex?: number;
  numberOfColumns?: number;
  selection?: Selection;
  tableRef?: HTMLTableElement;
}

export default class ColumnControls extends Component<Props, any> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      tableRef,
      selection,
      numberOfColumns,
      hoveredColumns,
      insertColumnButtonIndex,
      isInDanger,
      isResizing,
    } = this.props;

    if (nextProps.tableRef) {
      const controls = nextProps.tableRef.parentNode!.firstChild as HTMLElement;
      // checks if controls width is different from table width
      // 1px difference is acceptable and occurs in some situations due to the browser rendering specifics
      const shouldUpdate =
        Math.abs(controls.offsetWidth - nextProps.tableRef.offsetWidth) > 1;
      if (shouldUpdate) {
        return true;
      }
    }

    return (
      tableRef !== nextProps.tableRef ||
      insertColumnButtonIndex !== nextProps.insertColumnButtonIndex ||
      isInDanger !== nextProps.isInDanger ||
      isResizing !== nextProps.isResizing ||
      numberOfColumns !== nextProps.numberOfColumns ||
      hoveredColumns !== nextProps.hoveredColumns ||
      isSelectionUpdated(selection!, nextProps.selection)
    );
  }

  render() {
    const { editorView, tableRef } = this.props;
    if (!tableRef || !tableRef.querySelector('tr')) {
      return null;
    }

    const { selection } = editorView.state;
    const columnsWidths = getColumnsWidths(editorView);
    const columnsParams = getColumnsParams(columnsWidths);
    const deleteBtnParams = getColumnDeleteButtonParams(
      columnsWidths,
      selection,
    );

    return (
      <div className={ClassName.COLUMN_CONTROLS}>
        <div className={ClassName.COLUMN_CONTROLS_INNER}>
          <>
            {columnsParams.map(ColumnControlsButton(this.props))}
            {isColumnDeleteButtonVisible(selection) && deleteBtnParams && (
              <DeleteButton
                key="delete"
                removeLabel={tableMessages.removeColumns}
                style={{ left: deleteBtnParams.left }}
                onClick={this.deleteColumns}
                onMouseEnter={() =>
                  this.hoverColumns(deleteBtnParams.indexes, true)
                }
                onMouseLeave={this.clearHoverSelection}
              />
            )}
          </>
        </div>
      </div>
    );
  }

  private deleteColumns = (event: SyntheticEvent) => {
    event.preventDefault();
    const { state, dispatch } = this.props.editorView;

    const rect = getSelectionRect(state.selection);
    if (rect) {
      deleteColumnsWithAnalytics(INPUT_METHOD.BUTTON, rect)(state, dispatch);
    }

    this.clearHoverSelection();
  };

  private hoverColumns = (columns: number[], danger?: boolean) => {
    const { state, dispatch } = this.props.editorView;
    hoverColumns(columns, danger)(state, dispatch);
  };

  private clearHoverSelection = () => {
    const { state, dispatch } = this.props.editorView;
    clearHoverSelection(state, dispatch);
  };
}
