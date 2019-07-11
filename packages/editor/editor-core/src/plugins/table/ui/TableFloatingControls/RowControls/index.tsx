import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { getSelectionRect } from 'prosemirror-utils';

import { INPUT_METHOD } from '../../../../analytics';
import { clearHoverSelection } from '../../../commands';
import { getPluginState } from '../../../pm-plugins/main';
import { deleteRowsWithAnalytics } from '../../../commands-with-analytics';
import { TableCssClassName as ClassName } from '../../../types';
import {
  RowParams,
  getRowHeights,
  isRowDeleteButtonVisible,
  getRowDeleteButtonParams,
  getRowsParams,
  getRowClassNames,
} from '../../../utils';
import tableMessages from '../../messages';
import DeleteButton from '../DeleteButton';

export interface Props {
  editorView: EditorView;
  tableRef: HTMLTableElement;
  selectRow: (row: number, expand: boolean) => void;
  hoverRows: (rows: number[], danger?: boolean) => void;
  hoveredRows?: number[];
  isInDanger?: boolean;
  isResizing?: boolean;
  insertRowButtonIndex?: number;
}

export default class RowControls extends Component<Props, any> {
  render() {
    const {
      editorView,
      tableRef,
      hoveredRows,
      isInDanger,
      isResizing,
    } = this.props;
    if (!tableRef) {
      return null;
    }
    const { selection } = editorView.state;
    const rowHeights = getRowHeights(tableRef);
    const rowsParams = getRowsParams(rowHeights);
    const deleteBtnParams = getRowDeleteButtonParams(rowHeights, selection);

    return (
      <div className={ClassName.ROW_CONTROLS}>
        <div className={ClassName.ROW_CONTROLS_INNER}>
          {rowsParams.map(({ startIndex, height }: RowParams) => (
            <div
              className={`${
                ClassName.ROW_CONTROLS_BUTTON_WRAP
              } ${getRowClassNames(
                startIndex,
                selection,
                hoveredRows,
                isInDanger,
                isResizing,
              )}`}
              key={startIndex}
              style={{ height }}
            >
              <button
                type="button"
                className={`${ClassName.ROW_CONTROLS_BUTTON}
                  ${ClassName.CONTROLS_BUTTON}
                `}
                onClick={event =>
                  this.props.selectRow(startIndex, event.shiftKey)
                }
                onMouseOver={() => this.props.hoverRows([startIndex])}
                onMouseOut={this.clearHoverSelection}
                data-index={startIndex}
              />

              <div className={ClassName.CONTROLS_INSERT_MARKER} />
            </div>
          ))}
          {isRowDeleteButtonVisible(selection) && deleteBtnParams && (
            <DeleteButton
              key="delete"
              removeLabel={tableMessages.removeRows}
              style={{ top: deleteBtnParams.top }}
              onClick={this.deleteRows}
              onMouseEnter={() =>
                this.props.hoverRows(deleteBtnParams.indexes, true)
              }
              onMouseLeave={this.clearHoverSelection}
            />
          )}
        </div>
      </div>
    );
  }

  private clearHoverSelection = () => {
    const { state, dispatch } = this.props.editorView;
    clearHoverSelection()(state, dispatch);
  };

  private deleteRows = () => {
    const { state, dispatch } = this.props.editorView;
    const {
      pluginConfig: { isHeaderRowRequired },
    } = getPluginState(state);

    const rect = getSelectionRect(state.selection);
    if (rect) {
      deleteRowsWithAnalytics(INPUT_METHOD.BUTTON, rect, !!isHeaderRowRequired)(
        state,
        dispatch,
      );
    }

    this.clearHoverSelection();
  };
}
