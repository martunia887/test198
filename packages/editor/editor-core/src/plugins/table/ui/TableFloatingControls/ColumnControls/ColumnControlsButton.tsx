import React, { DragEvent } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
import { isCellSelection } from 'prosemirror-utils';
import { browser } from '@atlaskit/editor-common';
import InsertButton from '../InsertButton';
import { ColumnLine } from '../InsertLine';
import {
  isColumnInsertButtonVisible,
  getColumnClassNames,
  ColumnParams,
} from '../../../utils';
import {
  clearHoverSelection,
  hoverColumns,
  insertColumn,
  selectColumn,
} from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';

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

const Wrapper = styled.div`
  position: relative;
`;

const ColumnLineStyled = styled(ColumnLine)`
  left: 0;
  top: 0;
  display: none;
`;

const dragleave = (columnsParams: ColumnParams) => (
  e: DragEvent<HTMLElement>,
) => {
  if (!e) {
    return;
  }
  const { target } = e;

  console.log('sai', columnsParams, target);
};

const dragenter = (columnsParams: ColumnParams) => (
  e: DragEvent<HTMLElement>,
) => {
  if (!e) {
    return;
  }
  const { target } = e;

  const line = (target as HTMLElement).querySelector(
    `.${ClassName.CONTROLS_DRAG_AND_DROP_LINE}`,
  );
  if (!line) {
    return;
  }

  //line.
  // console.log('entrei', columnsParams, line);
  // e.preventDefault():
};

const dragme = (columnsParams: ColumnParams) => (e: DragEvent<HTMLElement>) => {
  if (!e || !e.dataTransfer) {
    return;
  }
  // target.classList.add('pm-table-column-dragging');
  // console.log(e.target);
  // debugger
  // console.log('opa');
  /*
var crt = this.cloneNode(true);
crt.style.backgroundColor = "red";
crt.style.display = "none"; // or visibility: hidden, or any of the above
document.body.appendChild(crt);
   *
   *
   console.log(target, this.cloneNode);
   */
  e.preventDefault();

  console.log('arrastando', e);
  const crt = document.querySelector(`#bolacha-${columnsParams.startIndex}`);
  if (!crt) {
    return;
  }
  e.dataTransfer.setDragImage(crt, 0, 0);
};

const hoverColumnsWrapper = (
  columns: number[],
  editorView: EditorView,
) => () => {
  const { state, dispatch } = editorView;
  hoverColumns(columns)(state, dispatch);
};

const selectColumnWrapper = (column: number, editorView: EditorView) => () => {
  const { state, dispatch } = editorView;
  // fix for issue ED-4665
  if (browser.ie_version === 11) {
    (editorView.dom as HTMLElement).blur();
  }
  selectColumn(column)(state, dispatch);
};

const clearHoverSelectionWrapper = (editorView: EditorView) => () => {
  const { state, dispatch } = editorView;
  clearHoverSelection(state, dispatch);
};

const insertColumnWrapper = (column: number, editorView: EditorView) => () => {
  const { state, dispatch } = editorView;
  insertColumn(column)(state, dispatch);
};

const ColumnControlsButton = (props: Props) => ({
  startIndex,
  endIndex,
  width,
}: ColumnParams) => {
  const {
    editorView,
    tableRef,
    insertColumnButtonIndex,
    hoveredColumns,
    isInDanger,
    isResizing,
  } = props;
  const { state } = editorView;
  const { selection } = state;

  return (
    <div draggable={true} key={startIndex}>
      <Wrapper
        className={`${
          ClassName.COLUMN_CONTROLS_BUTTON_WRAP
        } ${getColumnClassNames(
          startIndex,
          selection,
          hoveredColumns,
          isInDanger,
          isResizing,
        )}`}
        style={{ width }}
      >
        <button
          type="button"
          className={ClassName.CONTROLS_BUTTON}
          onMouseDown={selectColumnWrapper(startIndex, editorView)}
          onMouseOver={hoverColumnsWrapper([startIndex], editorView)}
          onMouseOut={clearHoverSelectionWrapper(editorView)}
          onDragStart={dragme({ startIndex, endIndex, width })}
          onDragEnter={dragenter({ startIndex, endIndex, width })}
          onDragLeave={dragleave({ startIndex, endIndex, width })}
        >
          {!isCellSelection(selection) && (
            <>
              <div
                className={ClassName.CONTROLS_BUTTON_OVERLAY}
                data-index={startIndex}
              />
              <div
                className={ClassName.CONTROLS_BUTTON_OVERLAY}
                data-index={endIndex}
              />
            </>
          )}

          <ColumnLineStyled
            className={ClassName.CONTROLS_DRAG_AND_DROP_LINE}
            tableRef={tableRef}
          />
        </button>
        <div id={`bolacha-${startIndex}`} className="bolacha" />
        {isColumnInsertButtonVisible(endIndex, selection) && (
          <InsertButton
            type="column"
            tableRef={tableRef}
            index={endIndex}
            showInsertButton={
              !isResizing && insertColumnButtonIndex === endIndex
            }
            onMouseDown={insertColumnWrapper(endIndex, editorView)}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default ColumnControlsButton;
