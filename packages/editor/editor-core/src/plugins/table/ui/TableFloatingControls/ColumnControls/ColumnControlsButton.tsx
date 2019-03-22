import React, { DragEvent, MouseEvent, RefObject } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
import { isCellSelection, moveColumn } from 'prosemirror-utils';
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

  &.${ClassName.CONTROLS_DRAG_AND_DROP_LINE_ACTIVATED} {
    display: flex;
  }
`;

const findLine = (
  element: EventTarget | HTMLElement | null,
  startIndex: number,
): HTMLElement | null => {
  if (!element) {
    return null;
  }

  const line = (element as HTMLElement).querySelector(
    `.${ClassName.CONTROLS_DRAG_AND_DROP_LINE}--${startIndex}`,
  );

  return line as HTMLElement;
};

const drop = (columnsParamsTarget: ColumnParams, editorView: EditorView) => (
  e: Event,
) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  // @ts-ignore
  const data = e.dataTransfer.getData('text');

  if (!data) {
    return false;
  }
  const columnsParamsOrigin = JSON.parse(data);

  const { target } = e;
  const line = findLine(target, columnsParamsTarget.startIndex);

  if (line && line.classList) {
    line.classList.remove(ClassName.CONTROLS_DRAG_AND_DROP_LINE_ACTIVATED);
  }

  const { state, dispatch } = editorView;
  console.log('drop');
  console.log(
    columnsParamsOrigin.startIndex,
    columnsParamsTarget.startIndex,
    state.tr.doc.toString(),
  );
  const tr = moveColumn(
    columnsParamsOrigin.startIndex,
    columnsParamsTarget.startIndex,
  )(state.tr);
  dispatch(tr);

  return false;
};

const dragend = (columnsParams: ColumnParams) => (e: Event) => {
  // @ts-ignore
  (e as DragEvent).dataTransfer.clearData();
};

const dragleave = (
  columnsParams: ColumnParams,
  dropzoneRef: RefObject<HTMLDivElement>,
  dropFunction: any,
) => (e: DragEvent<HTMLElement>) => {
  const { target } = e;
  const line = findLine(target, columnsParams.startIndex);

  const { current } = dropzoneRef;
  if (!current) {
    return null;
  }
  current.removeEventListener('drop', dropFunction, true);

  if (line && line.classList) {
    line.classList.remove(ClassName.CONTROLS_DRAG_AND_DROP_LINE_ACTIVATED);
  }
};

const dragenter = (
  columnsParams: ColumnParams,
  dropzoneRef: RefObject<HTMLDivElement>,
  dropFunction: any,
) => (e: DragEvent<HTMLElement>) => {
  e.preventDefault();
  const { current } = dropzoneRef;
  if (!current) {
    return null;
  }

  current.addEventListener('drop', dropFunction);

  const { target } = e;
  const line = findLine(target, columnsParams.startIndex);

  if (line && line.classList) {
    line.classList.add(ClassName.CONTROLS_DRAG_AND_DROP_LINE_ACTIVATED);
  }
};

const dragme = (
  columnsParams: ColumnParams,
  dropzoneRef: RefObject<HTMLDivElement>,
) => (e: DragEvent<HTMLElement>) => {
  console.log('arrastei');
  const { current } = dropzoneRef;

  const crt = document.querySelector(`#bolacha-${columnsParams.startIndex}`);
  if (!crt || !current) {
    return;
  }
  current.addEventListener('dragend', dragend(columnsParams));

  e.dataTransfer.setDragImage(crt, 0, 0);
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text', JSON.stringify(columnsParams));
};

const hoverColumnsWrapper = (
  columns: number[],
  editorView: EditorView,
) => () => {
  const { state, dispatch } = editorView;
  hoverColumns(columns)(state, dispatch);
};

const selectColumnWrapper = (column: number, editorView: EditorView) => (
  e: MouseEvent,
) => {
  console.log('cliquei');
  e.preventDefault();
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
  const columnControlRef = React.createRef<HTMLDivElement>();
  const dropFunction = drop({ startIndex, endIndex, width }, editorView);

  return (
    <div
      key={startIndex}
      onDragStart={dragme({ startIndex, endIndex, width }, columnControlRef)}
      onDragEnter={dragenter(
        { startIndex, endIndex, width },
        columnControlRef,
        dropFunction,
      )}
      onDragLeave={dragleave(
        { startIndex, endIndex, width },
        columnControlRef,
        dropFunction,
      )}
      draggable={true}
      ref={columnControlRef}
    >
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
          className={ClassName.CONTROLS_BUTTON}
          // onMouseDown={selectColumnWrapper(startIndex, editorView)}
          onMouseUp={selectColumnWrapper(startIndex, editorView)}
          onMouseOver={hoverColumnsWrapper([startIndex], editorView)}
          onMouseOut={clearHoverSelectionWrapper(editorView)}
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
            className={`${
              ClassName.CONTROLS_DRAG_AND_DROP_LINE
            }--${startIndex}`}
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
