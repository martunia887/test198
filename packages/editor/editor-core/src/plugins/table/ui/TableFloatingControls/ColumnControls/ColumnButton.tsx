import * as React from 'react';
import { useMemo, useEffect } from 'react';
import classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { browser } from '@atlaskit/editor-common';
import { TableCssClassName as cl } from '../../../types';
import { getColumnClassNames, onReorderingColumns } from '../../../utils';
import { ColumnProps } from './types';

import {
  hoverColumns,
  selectColumn,
  clearHoverSelection,
} from '../../../commands';

const getDraggableCells = (
  columnIndex: number,
  rowHeights?: number[],
  tableRef?: HTMLTableElement,
) => {
  if (!rowHeights || !tableRef || !tableRef.lastChild) {
    return null;
  }

  let html = '';
  for (
    let i = 0, rowsCount = tableRef.lastChild.childNodes.length;
    i < rowsCount;
    i++
  ) {
    const row = tableRef.lastChild.childNodes[i];
    const cell = row.childNodes[columnIndex] as HTMLElement;
    const nodeNade = cell.nodeName.toLowerCase();
    const { backgroundColor } = cell.style;
    let style = `height:${rowHeights[i] - 1}px;`;
    if (backgroundColor) {
      style += `background:${backgroundColor};`;
    }
    html += `<tr><${nodeNade} style="${style}" class="${cell.className} ${cl.SELECTED_CELL}">${cell.innerHTML}</${nodeNade}></tr>`;
  }

  return (
    <div className={cl.TABLE_CONTAINER}>
      <div className={cl.TABLE_NODE_WRAPPER}>
        <table className={cl.TABLE_PORTAL}>
          <tbody dangerouslySetInnerHTML={{ __html: html }} />
        </table>
      </div>
    </div>
  );
};

const ColumnControlButton = ({
  editorView,
  hoveredColumns,
  isInDanger,
  isResizing,
  provided,
  startIndex,
  endIndex,
  width,
  height,
  tableRef,
  rowHeights,
  isPortal,
  hasMergedCells,
  multiReorderIndexes = [],
  intl: { formatMessage },
}: ColumnProps & InjectedIntlProps) => {
  const { state, dispatch } = editorView;

  useEffect(() => {
    if (!provided) {
      return;
    }
    onReorderingColumns(
      startIndex,
      // @ts-ignore
      provided.draggableProps.style,
      // @ts-ignore
      provided.draggableProps[cl.RBD_DRAGGABLE_CONTEXT_ID],
      state,
    );
  }, [state, startIndex, provided]);

  const onMouseOver = () =>
    hoverColumns([startIndex])(editorView.state, dispatch);

  const onMouseOut = () => {
    clearHoverSelection()(editorView.state, dispatch);
  };

  const onClick = (event: React.MouseEvent) => {
    // fix for issue ED-4665
    if (browser.ie_version === 11) {
      (editorView.dom as HTMLElement).blur();
    }
    selectColumn(startIndex, event.shiftKey)(editorView.state, dispatch);
  };

  const style = {
    ...(provided ? provided.draggableProps.style : {}),
    width,
    height,
  };

  const portalContent = useMemo(
    () =>
      isPortal ? getDraggableCells(startIndex, rowHeights, tableRef) : null,
    [isPortal, startIndex, rowHeights, tableRef],
  );

  return (
    <div
      className={classnames(
        getColumnClassNames(
          startIndex,
          state.selection,
          hoveredColumns,
          isInDanger,
          isResizing,
        ),
        {
          [cl.COLUMN_CONTROLS_BUTTON]: !isPortal,
          [cl.CONTROLS_BUTTON]: !isPortal,
          [cl.RBD_PORTAL]: isPortal,
          [cl.COLUMN_CONTROLS_PORTAL]: isPortal,
          [cl.MULTI_REORDERING]:
            (multiReorderIndexes || []).indexOf(startIndex) > -1,
        },
      )}
      onClick={onClick}
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
      {isPortal && (
        <>
          <div
            className={classnames(
              cl.COLUMN_CONTROLS_BUTTON,
              cl.CONTROLS_BUTTON,
              cl.HOVERED_CELL_ACTIVE,
            )}
          />
          {multiReorderIndexes.length > 1 && (
            <div className={cl.REORDERING_INDICATOR}>
              {multiReorderIndexes.length}
            </div>
          )}
          {portalContent}
        </>
      )}
    </div>
  );
};

export const ColumnButton = injectIntl(ColumnControlButton);
