import * as React from 'react';
import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Tooltip from '@atlaskit/tooltip';
import { browser, akEditorTableToolbarSize } from '@atlaskit/editor-common';
import {
  clearHoverSelection,
  selectRow,
  hoverRows,
  hoverMergedCells,
} from '../../../commands';
import { TableCssClassName as cl } from '../../../types';
import { getRowClassNames } from '../../../utils';
import { closestElement } from '../../../../../utils';
import { RowControlsProps } from './types';
import { getPluginState } from '../../../pm-plugins/main';
import { tableInsertColumnButtonSize } from '../../styles';
import messages from '../../messages';

interface RowProps extends RowControlsProps {
  startIndex: number;
  endIndex: number;
  height: number;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  width?: number;
  isPortal?: boolean;
  columnWidths?: number[];
}

const getDraggableCells = (
  rowIndex: number,
  tableWidth?: number,
  tableRef?: HTMLTableElement,
) => {
  if (!tableRef || !tableRef.lastChild) {
    return null;
  }

  const row = tableRef.lastChild.childNodes[rowIndex].cloneNode(
    true,
  ) as HTMLElement;
  Array.prototype.slice.call(row.childNodes).forEach(cell => {
    cell.classList.add(cl.SELECTED_CELL);
  });
  const html = `<tr>${row.innerHTML}</tr>`;

  return (
    <div
      className={cl.TABLE_CONTAINER}
      style={{ width: `${Number(tableWidth) + 1}px` }}
    >
      <div className={cl.TABLE_NODE_WRAPPER}>
        <table className={cl.TABLE_PORTAL} style={{ width: `${tableWidth}px` }}>
          <tbody dangerouslySetInnerHTML={{ __html: html }} />
        </table>
      </div>
    </div>
  );
};

const RowControlButton = ({
  editorView,
  hoveredRows,
  isInDanger,
  isResizing,
  provided,
  startIndex,
  endIndex,
  height,
  width,
  hasHeaderRow,
  isNumberColumnEnabled,
  isPortal,
  hasMergedCells,
  tableRef,
  multiReorderIndexes = [],
  intl: { formatMessage },
}: RowProps & InjectedIntlProps) => {
  const { state, dispatch } = editorView;
  const [showMergedCells, setShowMergedCells] = useState(false);
  const dragStart = useRef(null as null | number);

  useEffect(() => {
    if (!provided) {
      return;
    }
    const { eventEmitter } = getPluginState(state);
    eventEmitter.emit('reordering-rows', {
      rowIndex: startIndex,
      style: provided.draggableProps.style,
      // @ts-ignore
      draggableId: provided.draggableProps[cl.RBD_DRAGGABLE],
    });
  }, [state, startIndex, provided]);

  const onMouseOver = useCallback(
    () => hoverRows([startIndex])(state, dispatch),
    [state, dispatch, startIndex],
  );

  const onMouseOut = useCallback(() => {
    clearHoverSelection()(state, dispatch);
    if (showMergedCells) {
      setShowMergedCells(false);
    }
  }, [state, dispatch, showMergedCells]);

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (showMergedCells) {
        return;
      }
      // fix for issue ED-4665
      if (browser.ie_version === 11) {
        (editorView.dom as HTMLElement).blur();
      }
      selectRow(startIndex, event.shiftKey)(state, dispatch);
    },
    [state, dispatch, showMergedCells, startIndex],
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!hasMergedCells) {
        return;
      }
      dragStart.current = event.clientY;

      function move(moveEvent: MouseEvent) {
        if (
          dragStart.current !== null &&
          !showMergedCells &&
          Math.abs(dragStart.current - moveEvent.clientY) > 5
        ) {
          clearHoverSelection()(editorView.state, dispatch);
          hoverMergedCells()(editorView.state, dispatch);
          setShowMergedCells(true);
        }
      }

      function finish(event: MouseEvent) {
        window.removeEventListener('mouseup', finish);
        window.removeEventListener('mousemove', move);
        dragStart.current = null;
      }
      window.addEventListener('mouseup', finish);
      window.addEventListener('mousemove', move);
    },
    [editorView, state, dispatch, dragStart, hasMergedCells, showMergedCells],
  );

  let portalWidth;
  if (isPortal) {
    const parent = closestElement(tableRef, `.${cl.TABLE_CONTAINER}`);
    if (parent) {
      portalWidth =
        parent.offsetWidth +
        akEditorTableToolbarSize +
        tableInsertColumnButtonSize / 2;
    }
  }

  const style = {
    ...(provided ? provided.draggableProps.style : {}),
    height,
    width: portalWidth || width,
  };

  const numberColumn = isNumberColumnEnabled
    ? hasHeaderRow
      ? startIndex > 0
        ? startIndex
        : null
      : startIndex + 1
    : null;

  const portalContent = useMemo(
    () => (isPortal ? getDraggableCells(startIndex, width, tableRef) : null),
    [isPortal, startIndex, width, tableRef],
  );

  const control = (
    <div
      className={classnames(
        getRowClassNames(
          startIndex,
          state.selection,
          hoveredRows,
          isInDanger,
          isResizing,
        ),
        {
          [cl.ROW_CONTROLS_BUTTON]: !isPortal,
          [cl.CONTROLS_BUTTON]: !isPortal,
          [cl.RBD_PORTAL]: isPortal,
          [cl.ROW_CONTROLS_PORTAL]: isPortal,
          [cl.WITH_NUMBERED_COLUMN]: isPortal && isNumberColumnEnabled,
          [cl.SHOW_MERGED_CELLS]: showMergedCells,
          [cl.MULTI_REORDERING]: multiReorderIndexes.indexOf(startIndex) > -1,
        },
      )}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      data-start-index={startIndex}
      data-end-index={endIndex}
      key={startIndex}
      ref={provided ? provided.innerRef : null}
      {...(provided ? provided.draggableProps : {})}
      {...(provided ? provided.dragHandleProps : {})}
      style={style}
    >
      {isPortal ? (
        <>
          <div className={cl.REORDERING_INDICATOR}>
            {multiReorderIndexes.length || 1}
          </div>
          <div className={cl.ROW_CONTROLS_PORTAL_CONTENT_WRAP}>
            <div className={cl.ROW_CONTROLS}>
              <div
                className={classnames(
                  cl.ROW_CONTROLS_BUTTON,
                  cl.CONTROLS_BUTTON,
                  cl.HOVERED_CELL_ACTIVE,
                )}
              >
                {numberColumn}
              </div>
            </div>
            {portalContent}
          </div>
        </>
      ) : (
        numberColumn
      )}
    </div>
  );

  if (showMergedCells) {
    return (
      <Tooltip
        content={formatMessage(messages.canNotReorderTable)}
        position="top"
      >
        {control}
      </Tooltip>
    );
  }

  return control;
};

export const RowButton = injectIntl(RowControlButton);
