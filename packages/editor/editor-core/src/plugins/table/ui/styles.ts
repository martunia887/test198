import { css } from 'styled-components';
import { borderRadius, colors, fontSize } from '@atlaskit/theme';
import {
  browser,
  tableMarginTop,
  tableMarginBottom,
  tableSharedStyle,
  akEditorTableToolbarSize,
  akEditorUnitZIndex,
  akEditorSmallZIndex,
  akEditorTableNumberColumnWidth,
  akEditorTableBorder,
  akMediaSingleResizeZIndex,
  tableCellBorderWidth,
} from '@atlaskit/editor-common';
import { scrollbarStyles } from '../../../ui/styles';
import { TableCssClassName as ClassName, RESIZE_HANDLE_AREA_DECORATION_GAP } from '../types';
import { tableBackgroundBorderColor, N30 } from '@atlaskit/adf-schema';

const {
  N40A,
  B100,
  B300,
  N300,
  B75,
  N20,
  N50,
  R50,
  R300,
  R75,
  N20A,
  N60A,
  N90,
  N200,
  N0,
  Y50,
  Y200,
} = colors;

export const tableToolbarColor = N20;
export const tableBorderColor = N50;
export const tableFloatingControlsColor = N20;
export const tableCellSelectedColor = B75;
export const tableToolbarSelectedColor = B100;
export const tableBorderSelectedColor = B300;
export const tableCellDeleteColor = R50;
export const tableBorderDeleteColor = R300;
export const tableToolbarDeleteColor = R75;
export const tableToolbarSize = akEditorTableToolbarSize;
export const tableBorderRadiusSize = 3;
export const tableInsertColumnButtonSize = 20;
export const tableDeleteButtonSize = 16;
export const tableDeleteButtonOffset = 6;
export const tablePadding = 8;
export const contextualMenuTriggerSize = 16;
export const contextualMenuDropdownWidth = 180;
export const layoutButtonSize = 32;
export const tableInsertColumnButtonOffset = 3;
export const tableScrollbarOffset = 15;
export const tableMarginFullWidthMode = 2;
export const lineMarkerOffsetFromControls = 13;
export const lineMarkerSize = 4;
export const columnControlsDecorationHeight = 25;
export const columnControlsZIndex = akEditorUnitZIndex * 10;
export const columnControlsSelectedZIndex = columnControlsZIndex + 1;
export const columnResizeHandleZIndex = columnControlsSelectedZIndex + 1;
export const resizeHandlerAreaWidth = RESIZE_HANDLE_AREA_DECORATION_GAP / 3;
export const resizeLineWidth = 2;
export const resizeHandlerZIndex = columnControlsZIndex + akMediaSingleResizeZIndex;

const isIE11 = browser.ie_version === 11;

const InsertLine = (css?: string) => `
  .${ClassName.CONTROLS_INSERT_LINE} {
    background: ${tableBorderSelectedColor};
    display: none;
    position: absolute;
    z-index: ${akEditorUnitZIndex};
    ${css}
  }
`;

const Marker = `
  background-color: ${tableBorderColor};
  position: absolute;
  height: ${lineMarkerSize}px;
  width: ${lineMarkerSize}px;
  border-radius: 50%;
  pointer-events: none;
`;

const InsertMarker = (css?: string) => `
  .${ClassName.CONTROLS_INSERT_MARKER} {
    ${Marker};
    ${css}
  }
`;

const Button = (css?: string) => `
  border-radius: ${borderRadius()}px;
  border-width: 0px;
  display: inline-flex;
  max-width: 100%;
  text-align: center;
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  outline: none !important;
  cursor: none;

  > .${ClassName.CONTROLS_BUTTON_ICON} {
    display: inline-flex;
    max-height: 100%;
    max-width: 100%;
  }
  ${css}
`;

const HeaderButton = (css?: string) => `
  .${ClassName.CONTROLS_BUTTON} {
    background: ${tableToolbarColor};
    border-top: 1px solid ${tableBorderColor};
    border-left: 1px solid ${tableBorderColor};
    display: block;
    box-sizing: border-box;
    padding: 0;

    :focus {
      outline: none;
    }
    ${css}
  }

  .${ClassName.COLUMN_CONTROLS_BUTTON}::after {
    content: ' ';
    background-color: transparent;
    position: absolute;
    width: 100%;
    left: 0;
      top: -30px;
    height: 30px;
    cursor: pointer;
    z-index: 1;
  }

  .${ClassName.ROW_CONTROLS_BUTTON}::after {
    content: ' ';
    background-color: transparent;
    left: -15px;
    top: 0;
    position: absolute;
    width: 15px;
    height: 100%;
    z-index: 1;
  }

  .active.${ClassName.CONTROLS_BUTTON} {
    color: ${N0};
    background-color: ${tableToolbarSelectedColor};
    border-color: ${tableBorderSelectedColor};
  }
`;


const HeaderButtonHover = () => `
  .${ClassName.CONTROLS_BUTTON}:not(.${ClassName.NUMBERED_COLUMN_BUTTON}):hover {
    cursor: pointer;
  }
  .${ClassName.CONTROLS_BUTTON}:not(.${ClassName.NUMBERED_COLUMN_BUTTON}, .${ClassName.SHOW_MERGED_CELLS}):hover {
    color: ${N0};
    background-color: ${tableToolbarSelectedColor};
    border-color: ${tableBorderSelectedColor};
  }
`;

const HeaderButtonDanger = () => `
  .${ClassName.HOVERED_CELL_IN_DANGER} .${ClassName.CONTROLS_BUTTON},
  .${ClassName.HOVERED_CELL_IN_DANGER}.${ClassName.CONTROLS_BUTTON} {
    background-color: ${tableToolbarDeleteColor};
    border-color: ${tableBorderDeleteColor};
    position: relative;
    z-index: ${akEditorUnitZIndex};
  }
`;

const InsertButton = () => `
  .${ClassName.CONTROLS_INSERT_BUTTON_INNER} {
    position: absolute;
    z-index: ${akEditorUnitZIndex + 10};
    bottom: 0;
  }
  .${ClassName.CONTROLS_INSERT_BUTTON_INNER},
  .${ClassName.CONTROLS_INSERT_BUTTON} {
    height: ${tableInsertColumnButtonSize}px;
    width: ${tableInsertColumnButtonSize}px;
  }
  .${ClassName.CONTROLS_INSERT_BUTTON} {
    ${Button(`
      background: white;
      box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
      color: ${N300};
    `)}
  }
  .${ClassName.CONTROLS_INSERT_LINE} {
    display: none;
  }
  &:hover .${ClassName.CONTROLS_INSERT_LINE} {
    display: flex;
  }
`;

const InsertButtonHover = () => `
  .${ClassName.CONTROLS_INSERT_BUTTON}:hover {
    background: ${B300};
    color: white;
    cursor: pointer;
  }
`;

const insertColumnButtonWrapper = `
  ${InsertButton()}
  ${InsertButtonHover()}
  ${InsertLine(`
    width: 2px;
    left: 9px;
  `)}
`;

const insertRowButtonWrapper = `
  ${InsertButton()}
  ${InsertButtonHover()}
  ${InsertLine(`
    height: 2px;
    top: -11px;
    left: ${tableInsertColumnButtonSize - 1}px;
  `)}
`;

const DeleteButton = `
  .${ClassName.CONTROLS_DELETE_BUTTON_WRAP},
  .${ClassName.CONTROLS_DELETE_BUTTON} {
    height: ${tableDeleteButtonSize}px;
    width: ${tableDeleteButtonSize}px;
  }
  .${ClassName.CONTROLS_DELETE_BUTTON_WRAP} {
    .${ClassName.CONTROLS_DELETE_BUTTON} {
      ${Button(`
        background: ${N20A};
        color: ${N300};
      `)}
    }
  }

  .${ClassName.CONTROLS_DELETE_BUTTON}:hover {
    background: ${R300};
    color: white;
    cursor: pointer;
  }
`;

const OverflowShadow = `
.${ClassName.TABLE_RIGHT_SHADOW},
.${ClassName.TABLE_LEFT_SHADOW}{
  display: block;
  height: calc(100% - ${tableMarginTop + tableMarginBottom + tableToolbarSize - 2}px);
  position: absolute;
  pointer-events: none;
  top: ${tableMarginTop + tableToolbarSize - 1}px;
  z-index: ${akEditorSmallZIndex};
  width: 8px;
}
.${ClassName.TABLE_LEFT_SHADOW} {
  background: linear-gradient(
    to left,
    rgba(99, 114, 130, 0) 0,
    ${N40A} 100%
  );
  left: 0px;
}
.${ClassName.TABLE_RIGHT_SHADOW} {
  background: linear-gradient(
    to right,
    rgba(99, 114, 130, 0) 0,
    ${N40A} 100%
  );
  left: calc(100% + 2px);
}
.${ClassName.WITH_CONTROLS} {
  .${ClassName.TABLE_RIGHT_SHADOW},
  .${ClassName.TABLE_LEFT_SHADOW}{
    height: calc(100% - ${tableMarginTop + tableMarginBottom - 2}px);
    top: ${tableMarginTop - 1}px;
  }
  .${ClassName.TABLE_LEFT_SHADOW} {
    border-left: 1px solid ${tableBorderColor};
  }
}
`;

const columnControls = `
  .${ClassName.COLUMN_CONTROLS} {
    height: ${tableToolbarSize}px;
    box-sizing: border-box;
    display: none;
    position: absolute;
    top: ${tableMarginTop - 1}px;
  }
  :not(.${ClassName.IS_RESIZING}) .${ClassName.COLUMN_CONTROLS} {
    ${HeaderButtonHover()}
    ${HeaderButtonDanger()}
  }
  .${ClassName.COLUMN_CONTROLS_INNER} {
    display: flex;
  }
  .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP} {
    position: relative;
    margin-right: -1px;
  }
  .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}::before {
    content: ' ';
    ${Marker};
    top: -${lineMarkerOffsetFromControls}px;
    right: -${lineMarkerSize / 2}px;
  }
  .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}:last-child {
    border-top-right-radius: ${tableBorderRadiusSize}px;
  }
  .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}.active,
  .${ClassName.CONTROLS_BUTTON}:hover {
    z-index: ${akEditorUnitZIndex};
    position: relative;
  }
  ${HeaderButton(`
    border-right: 1px solid ${tableBorderColor};
    height: ${tableToolbarSize}px;
    width: 100%;

    .${ClassName.CONTROLS_BUTTON_OVERLAY} {
      position: absolute;
      width: 50%;
      height: 30px;
      bottom: 0;
      right: 0;
    }
    .${ClassName.CONTROLS_BUTTON_OVERLAY}:first-child {
      left: 0;
    }
  `)}
`;

const reordering = `
  .${ClassName.RBD_PORTAL} {
    line-height: 24px;

    td, th {
      opacity: 0.75;
      position: relative;
    }

    .${ClassName.TABLE_CONTAINER} {
      margin: 0;
    }

    .${ClassName.TABLE_NODE_WRAPPER} {
      padding-right: 0;
      padding-left: 0;
      padding-bottom: 0;
      padding-top: 0;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;

      .${ClassName.TABLE_PORTAL} {
        margin: 0;
      }
    }

    .${ClassName.CONTROLS_INSERT_MARKER},
    .${ClassName.COLUMN_CONTROLS_BUTTON}:before {
      display: none;
    }
  }
  .${ClassName.ROW_CONTROLS_PORTAL} {
    display: block;
    margin-top: -1px;

    .${ClassName.ROW_CONTROLS_PORTAL_CONTENT_WRAP} {
      overflow: hidden;
      height: 100%;
      position: relative;
    }

    .${ClassName.TABLE_CONTAINER} {
      position: absolute;
      top: 0;
      left: ${tableToolbarSize}px;
    }
    .${ClassName.ROW_CONTROLS} {
      width: ${tableToolbarSize + 1}px;
      height: 100%;

      div.${ClassName.ROW_CONTROLS_BUTTON}:last-child {
        margin: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .${ClassName.WITH_NUMBERED_COLUMN} {
    text-align: center;
    font-size: ${fontSize()}px;
    color: ${N200};

    .${ClassName.ROW_CONTROLS} .${ClassName.ROW_CONTROLS_BUTTON} {
      width: ${akEditorTableToolbarSize + akEditorTableNumberColumnWidth}px;
    }
    .${ClassName.TABLE_CONTAINER} {
      left: ${akEditorTableToolbarSize + akEditorTableNumberColumnWidth - 1}px;
    }
  }

  .${ClassName.REORDERING}-rows {
    .${ClassName.COLUMN_CONTROLS} .${ClassName.CONTROLS_BUTTON} {
      border-bottom: 1px solid ${tableBorderColor};
      height: ${tableToolbarSize + 1}px;
    }
    table tbody {
      border-right: none;
    }
    tr {
      border-right: 1px solid ${tableBorderColor};
    }
  }
  .${ClassName.REORDERING}-columns  {
    td:before,
    th:before {
      content: ' ';
      width: 1px;
      height: calc(100% + 2px);
      border-right: ${tableCellBorderWidth}px solid ${akEditorTableBorder};
      position: absolute;
      right: -1px;
      top: -1px;
    }
  }
  .${ClassName.REORDERING}-rows,
  .${ClassName.REORDERING}-columns {
    user-select: none;

    table tbody {
      border-top: none;
      border-bottom: none;
    }
    td:after,
    th:after {
      content: ' ';
      width: calc(100% + 2px);
      height: 1px;
      border-bottom: ${tableCellBorderWidth}px solid ${akEditorTableBorder};
      position: absolute;
      bottom: -1px;
      left: -1px;
    }
  }
  .${ClassName.REORDERING_INDICATOR} {
    background: ${colors.R300};
    border-radius: 50%;
    position: absolute;
    color: white;
    z-index: 2;
    font-size: 75%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
    top: -9px;
  }
  .${ClassName.COLUMN_CONTROLS_PORTAL} .${ClassName.REORDERING_INDICATOR} {
    right: -9px;
  }
  .${ClassName.ROW_CONTROLS_PORTAL} .${ClassName.REORDERING_INDICATOR} {
    left: -9px;
  }
  td.${ClassName.MULTI_REORDERING},
  th.${ClassName.MULTI_REORDERING},
  tr.${ClassName.MULTI_REORDERING} th,
  tr.${ClassName.MULTI_REORDERING} td,
  .${ClassName.CONTROLS_BUTTON}.${ClassName.MULTI_REORDERING} {
    opacity: 0.5;
    border-color: ${colors.N50};
  }
`;

const hoveredDeleteButton = `
  .${ClassName.TABLE_CONTAINER}.${ClassName.HOVERED_DELETE_BUTTON} {
    .${ClassName.SELECTED_CELL},
    .${ClassName.COLUMN_SELECTED},
    .${ClassName.HOVERED_CELL} {
      border: 1px solid ${tableBorderDeleteColor};
    }
    .${ClassName.SELECTED_CELL}::after {
      background: ${tableCellDeleteColor};
    }
  }
`;

const hoveredCell = `
  :not(.${ClassName.IS_RESIZING}) .${ClassName.TABLE_CONTAINER}:not(.${ClassName.HOVERED_DELETE_BUTTON}) {
    .${ClassName.HOVERED_CELL} {
      position: relative;
      border: 1px solid ${tableBorderSelectedColor};
    }
  }
`

const hoveredWarningCell = `
  :not(.${ClassName.IS_RESIZING}) .${ClassName.TABLE_CONTAINER}:not(.${ClassName.HOVERED_DELETE_BUTTON}) {
    td.${ClassName.HOVERED_CELL_WARNING} {
      background-color: ${Y50} !important; // We need to override the background-color added to the cell
      border: 1px solid ${Y200};
    }
  }
`

const resizeHandle = `
  .${ClassName.TABLE_CONTAINER} {
    .${ClassName.RESIZE_HANDLE_DECORATION} {
      background-color: transparent;
      position: absolute;
      width: ${resizeHandlerAreaWidth}px;
      height: 100%;
      top: 0;
      right: -${resizeHandlerAreaWidth / 2}px;
      cursor: col-resize;
      z-index: ${resizeHandlerZIndex};
    }

    td.${ClassName.WITH_RESIZE_LINE},
    th.${ClassName.WITH_RESIZE_LINE} {
      .${ClassName.RESIZE_HANDLE_DECORATION}::after {
        content: ' ';
        right: ${(resizeHandlerAreaWidth - resizeLineWidth) / 2}px;
        position: absolute;
        width: ${resizeLineWidth}px;
        height: calc(100% + 1px);
        background-color: ${tableBorderSelectedColor};
        z-index: ${columnControlsZIndex * 2};
        top: 0;
      }
    }

    table tr:first-child th.${ClassName.WITH_RESIZE_LINE} .${ClassName.RESIZE_HANDLE_DECORATION}::after,
    table tr:first-child td.${ClassName.WITH_RESIZE_LINE} .${ClassName.RESIZE_HANDLE_DECORATION}::after {
      top: -${tableToolbarSize + tableCellBorderWidth}px;
      height: calc(100% + ${tableToolbarSize + tableCellBorderWidth}px);
    }
  }
`;

export const tableStyles = css`
  .${ClassName.LAYOUT_BUTTON} button {
    background: ${N20A};
    color: ${N300};
    cursor: none;
  }

  .${ClassName.LAYOUT_BUTTON}:not(.${ClassName.IS_RESIZING}) button:hover {
    background: ${B300};
    color: white !important;
    cursor: pointer;
  }

  .ProseMirror {
    ${tableSharedStyle};
    ${columnControls};
    ${hoveredDeleteButton};
    ${hoveredCell};
    ${hoveredWarningCell};
    ${resizeHandle};
    ${reordering}

    .${ClassName.LAST_ITEM_IN_CELL} {
      margin-bottom: 0;
    }

    .${ClassName.TABLE_NODE_WRAPPER} {
      td.${ClassName.TABLE_CELL},
      th.${ClassName.TABLE_HEADER_CELL} {
        position: relative;
        overflow: visible;
      }

      td.${ClassName.TABLE_CELL} {
        background-color: #ffffff; // basic color to avoid overflow content on cell
      }
    }

    .${ClassName.CONTROLS_FLOATING_BUTTON_COLUMN} {
      ${insertColumnButtonWrapper}
    }

    .${ClassName.CONTROLS_FLOATING_BUTTON_ROW} {
      ${insertRowButtonWrapper}
    }

    /* Delete button*/
    ${DeleteButton}
    /* Ends Delete button*/

    ${OverflowShadow}
    .less-padding {
      padding: 0 ${tablePadding}px;

      .${ClassName.ROW_CONTROLS_WRAPPER} {
        padding: 0 ${tablePadding}px;
      }

      &.${ClassName.TABLE_CONTAINER}[data-number-column='true'] {
        padding-left: ${akEditorTableNumberColumnWidth + tablePadding - 1}px;
      }
    }

    /* Breakout only works on top level */
    > .${ClassName.NODEVIEW_WRAPPER} .${ClassName.TABLE_CONTAINER}[data-layout='full-width'],
    > .${ClassName.NODEVIEW_WRAPPER} .${ClassName.TABLE_CONTAINER}[data-layout='wide'] {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    > * .${ClassName.NODEVIEW_WRAPPER} .${ClassName.TABLE_CONTAINER} {
      width: 100% !important;
    }

    /* Corner controls */
    .${ClassName.CORNER_CONTROLS} {
      width: ${tableToolbarSize + 1}px;
      height: ${tableToolbarSize + 1}px;
      display: none;

      .${ClassName.CORNER_CONTROLS_INSERT_ROW_MARKER} {
        position: relative;

        ${InsertMarker(`
          left: -11px;
          top: 9px;
        `)};
      }

      .${ClassName.CORNER_CONTROLS_INSERT_COLUMN_MARKER} {
        position: relative;

        ${InsertMarker(`
          right: -1px;
          top: -12px;
        `)};
      }
    }
    .${ClassName.CONTROLS_CORNER_BUTTON} {
      position: absolute;
      top: 0;
      width: ${tableToolbarSize + 1}px;
      height: ${tableToolbarSize + 1}px;
      border: 1px solid ${tableBorderColor};
      border-radius: 0;
      border-top-left-radius: ${tableBorderRadiusSize}px;
      background: ${tableToolbarColor};
      box-sizing: border-box;
      padding: 0;
      :focus {
        outline: none;
      }
    }
    .active .${ClassName.CONTROLS_CORNER_BUTTON} {
      border-color: ${tableBorderSelectedColor};
      background: ${tableToolbarSelectedColor};
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.CONTROLS_CORNER_BUTTON}:hover {
      border-color: ${tableBorderSelectedColor};
      background: ${tableToolbarSelectedColor};
      cursor: pointer;
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.CONTROLS_CORNER_BUTTON}.${ClassName.HOVERED_CELL_IN_DANGER} {
      border-color: ${tableBorderDeleteColor};
      background: ${tableToolbarDeleteColor};
    }

    /* Row controls */
    .${ClassName.ROW_CONTROLS} {
      width: ${tableToolbarSize + 1}px;
      box-sizing: border-box;
      position: relative;

      .${ClassName.ROW_CONTROLS_INNER} {
        display: flex;
        flex-direction: column;
      }
      ${HeaderButton(`
        border-bottom: 1px solid ${tableBorderColor};
        border-right: 1px solid ${tableBorderColor};
        border-radius: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .${ClassName.CONTROLS_BUTTON_OVERLAY} {
          position: absolute;
          width: 30px;
          height: 50%;
          right: 0;
          bottom: 0;
        }
        .${ClassName.CONTROLS_BUTTON_OVERLAY}:first-child {
          top: 0;
        }
      `)}
      .${ClassName.ROW_CONTROLS_BUTTON}:last-child {
        border-bottom-left-radius: ${tableBorderRadiusSize}px;
      }
      .${ClassName.ROW_CONTROLS_BUTTON} {
        width: ${tableToolbarSize + 1}px;
        position: relative;
        margin-top: -1px;
      }
      .${ClassName.ROW_CONTROLS_BUTTON}:hover,
      .${ClassName.ROW_CONTROLS_BUTTON}.active,
      .${ClassName.CONTROLS_BUTTON}:hover {
        z-index: ${akEditorUnitZIndex};
      }
      .${ClassName.ROW_CONTROLS_BUTTON}::before {
        content: ' ';
        ${Marker};
        bottom: -${lineMarkerSize / 2}px;
        left: -${lineMarkerOffsetFromControls}px;
      }
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.ROW_CONTROLS} {
      ${HeaderButtonHover()}
      ${HeaderButtonDanger()}
    }

    .${ClassName.NUMBERED_COLUMN} .${ClassName.ROW_CONTROLS_BUTTON}{
      text-align: center;
      font-size: ${fontSize()}px;
      color: ${N200};
      width: ${akEditorTableToolbarSize + akEditorTableNumberColumnWidth}px;
    }
    .${ClassName.TABLE_CONTAINER}[data-number-column='true'] {
      .${ClassName.CORNER_CONTROLS},
      .${ClassName.CONTROLS_CORNER_BUTTON},
      .${ClassName.NUMBERED_COLUMN} {
        width: ${akEditorTableToolbarSize + akEditorTableNumberColumnWidth}px;
      }
      .${ClassName.TABLE_LEFT_SHADOW} {
        left: ${akEditorTableNumberColumnWidth}px;
      }
    }

    .${ClassName.NUMBERED_COLUMN} {
      margin-top: ${akEditorTableToolbarSize}px;
    }
    .${ClassName.NUMBERED_COLUMN_BUTTON} {
      margin-top: -1px;
      font-size: ${fontSize()}px;
      color: ${N200};

      :first-child {
        margin-top: 0;
      }
      :last-child {
        border-bottom: 1px solid ${akEditorTableBorder};
      }
    }

    .${ClassName.WITH_CONTROLS} {
      .${ClassName.COLUMN_CONTROLS},
      .${ClassName.CORNER_CONTROLS},
      .${ClassName.ROW_CONTROLS} {
        display: block;
      }
      .${ClassName.NUMBERED_COLUMN} {
        margin-top: 0;
      }
    }

    /* Table */
    .${ClassName.TABLE_NODE_WRAPPER} > table {
      /* overflow: hidden visible; */
      table-layout: fixed;

      .${ClassName.SELECTED_CELL},
      .${ClassName.HOVERED_CELL_IN_DANGER} {
        position: relative;
      }
      /* Give selected cells a blue overlay */
      .${ClassName.SELECTED_CELL}::after,
      .${ClassName.HOVERED_CELL_IN_DANGER}::after {
        z-index: ${akEditorSmallZIndex};
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0.3;
        pointer-events: none;
      }
      .${ClassName.SELECTED_CELL} {
        border: 1px solid ${tableBorderSelectedColor};
      }
      .${ClassName.SELECTED_CELL}::after {
        background: ${tableCellSelectedColor};
      }
      th.${ClassName.HOVERED_CELL_IN_DANGER}::after, td.${ClassName.HOVERED_CELL_IN_DANGER}::after {
        background: ${tableCellDeleteColor};
      }
    }
    .${ClassName.ROW_CONTROLS_WRAPPER} {
      position: absolute;
      top: ${tableMarginTop - 1}px;
    }
    .${ClassName.ROW_CONTROLS_WRAPPER}.${ClassName.TABLE_LEFT_SHADOW} {
      z-index: ${akEditorUnitZIndex};
    }
    .${ClassName.ROW_CONTROLS_WRAPPER} {
      left: -${tableToolbarSize}px;
    }
    .${ClassName.TABLE_NODE_WRAPPER} {
      padding-right: ${tableInsertColumnButtonSize / 2}px;
      margin-right: -${tableInsertColumnButtonSize / 2}px;
      padding-top: ${tableInsertColumnButtonSize / 2}px;
      margin-top: -${tableInsertColumnButtonSize / 2}px;
      padding-bottom: ${tableScrollbarOffset}px;
      margin-bottom: -${tableScrollbarOffset}px;
      z-index: ${akEditorUnitZIndex - 1};
      /* fixes gap cursor height */
      overflow-x: ${isIE11 ? 'none' : 'auto'};
      overflow-y: hidden;
      position: relative;
    }
  }

  .ProseMirror.${ClassName.RESIZE_CURSOR} {
    cursor: col-resize;
  }

`;

export const tableFloatingCellButtonStyles = css`
  > div {
    background: ${N20};
    border-radius: ${borderRadius()}px;
    border: 2px solid ${N0};
    display: flex;
    height: ${contextualMenuTriggerSize - 2}px;
    flex-direction: column;
  }
  button {
    flex-direction: column;
    padding: 0;
    height: 100%;
    display: flex;
  }
  span {
    pointer-events: none;
  }
`;

export const tableFullPageEditorStyles = css`
  .ProseMirror .${ClassName.TABLE_NODE_WRAPPER} > table {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;

export const tableCommentEditorStyles = css`
  .ProseMirror .${ClassName.TABLE_NODE_WRAPPER} > table {
    margin-left: 0;
    margin-right: 0;

    ${scrollbarStyles};
  }
`;

const colorsButtonPerLine = 7;
const colorsButtonRows = 3;
const colorButtonSizeWithPadding = 32;
export const tablePopupStyles = css`
  .${ClassName.CONTEXTUAL_SUBMENU} {
    border-radius: ${borderRadius()}px;
    background: white;
    box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
    display: block;
    position: absolute;
    width: ${colorButtonSizeWithPadding * colorsButtonPerLine}px;
    height: ${colorButtonSizeWithPadding * colorsButtonRows}px;
    top: 0;
    left: ${contextualMenuDropdownWidth}px;
    padding: 8px;

    > div {
      padding: 0;
    }
  }

  .${ClassName.CONTEXTUAL_MENU_ICON} {
    border: 1px solid ${tableBackgroundBorderColor};
    border-radius: ${borderRadius()}px;
    display: block;
    width: 20px;
    height: 20px;
    position: relative;
    left: -10px;

    &::after {
      content: '›';
      display: inline-block;
      width: 1px;
      position: relative;
      left: 25px;
      top: 9px;
      color: ${N90};
    }
  }
`;
