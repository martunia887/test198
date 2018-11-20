// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';
import { borderRadius, colors, fontSize } from '@atlaskit/theme';
import {
  browser,
  tableMarginTop,
  tableSharedStyle,
  akEditorTableToolbarSize,
  akEditorUnitZIndex,
  akEditorSmallZIndex,
  akEditorTableNumberColumnWidth,
  akEditorTableBorder,
} from '@atlaskit/editor-common';
import { scrollbarStyles } from '../../../ui/styles';
import { TableCssClassName as ClassName } from '../types';

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
  N30,
  N90,
  N200,
  N0,
  R500,
  N40,
  G300,
  N10,
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
export const contextualMenuTriggerSize = 16;
export const contextualMenuDropdownWidth = 180;
export const layoutButtonSize = 32;

const isIE11 = browser.ie_version === 11;

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
  cursor: pointer;

  > .${ClassName.CONTROLS_BUTTON_ICON} {
    display: inline-flex;
    max-height: 100%;
    max-width: 100%;
  }
  ${css}
`;

const InsertLine = (css?: string) => `
  .${ClassName.CONTROLS_INSERT_LINE} {
    background: ${tableBorderSelectedColor};
    display: none;
    position: absolute;
    z-index: ${akEditorUnitZIndex};
    ${css}
  }
`;

const HeaderButton = (css?: string) => `
  .${ClassName.CONTROLS_BUTTON} {
    background: ${tableToolbarColor};
    border-top: 1px solid ${tableBorderColor};
    border-left: 1px solid ${tableBorderColor};
    display: block;
    box-sizing: border-box;
    padding: 0;
    cursor: pointer;

    :focus {
      outline: none;
    }
    ${css}
  }
  .active .${ClassName.CONTROLS_BUTTON},
  .${ClassName.HOVERED_TABLE} .${ClassName.CONTROLS_BUTTON},
  .${ClassName.CONTROLS_BUTTON}:hover {
    color: ${N0};
    background-color: ${tableToolbarSelectedColor};
    border-color: ${tableBorderSelectedColor};
  }
  .danger .${ClassName.CONTROLS_BUTTON} {
    background-color: ${tableToolbarDeleteColor};
    border-color: ${tableBorderDeleteColor};
    position: relative;
    z-index: ${akEditorUnitZIndex};
  }
`;

const InsertButton = () => `
  .${ClassName.CONTROLS_INSERT_BUTTON_INNER} {
    position: absolute;
    z-index: ${akEditorUnitZIndex};
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
      :hover {
        background: ${B300};
        color: white;
      }
    `)}
  }
  .${ClassName.CONTROLS_INSERT_LINE} {
    display: none;
  }
`;

const DeleteButton = (css?: string) => `
  .${ClassName.CONTROLS_DELETE_BUTTON_WRAP},
  .${ClassName.CONTROLS_DELETE_BUTTON} {
    height: ${tableDeleteButtonSize}px;
    width: ${tableDeleteButtonSize}px;
  }
  .${ClassName.CONTROLS_DELETE_BUTTON_WRAP} {
    position: absolute;
    cursor: pointer;
    ${css}

    .${ClassName.CONTROLS_DELETE_BUTTON} {
      ${Button(`
        background: ${N20A};
        color: ${N300};
        :hover {
          background: ${R300};
          color: white;
        }
      `)}
    }
  }
`;

const InsertMarker = (css?: string) => `
  .${ClassName.CONTROLS_INSERT_MARKER} {
    background-color: ${tableBorderColor};
    position: absolute;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    pointer-events: none;
    ${css}
  }
`;

export const tableStyles = css`
  .${ClassName.LAYOUT_BUTTON} button {
    background: ${N20A};
    color: ${N300};
    :hover {
      background: ${B300};
      color: white !important;
    }
  }

  .ProseMirror {
    ${tableSharedStyle}

    .less-padding {
      padding: 0 8px;

      .${ClassName.ROW_CONTROLS_WRAPPER} {
         padding: 0 8px;
      }
    }

    /* Breakout only works on top level */
    > .${ClassName.NODEVIEW_WRAPPER} .${
  ClassName.TABLE_CONTAINER
}[data-layout='full-width'],
    > .${ClassName.NODEVIEW_WRAPPER} .${
  ClassName.TABLE_CONTAINER
}[data-layout='wide'] {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    > * .${ClassName.NODEVIEW_WRAPPER} .${ClassName.TABLE_CONTAINER} {
      width: 100% !important;
    }

    /* Column controls */
    .${ClassName.COLUMN_CONTROLS} {
      height: ${tableToolbarSize}px;
      box-sizing: border-box;
      display: none;

      .${ClassName.COLUMN_CONTROLS_INNER} {
        display: flex;
      }
      .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP} {
        position: relative;
        margin-right: -1px;
      }
      .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}:last-child > button {
        border-top-right-radius: ${tableBorderRadiusSize}px;
      }
      .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}.active .${
  ClassName.CONTROLS_BUTTON
},
      .${ClassName.CONTROLS_BUTTON}:hover {
        z-index: ${akEditorUnitZIndex};
        position: relative;
      }
      ${HeaderButton(`
        border-right: 1px solid ${tableBorderColor};
        border-bottom: none;
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
    }
    .${ClassName.COLUMN_CONTROLS},
    .${ClassName.CORNER_CONTROLS} {
      ${DeleteButton(`
        top: -${tableDeleteButtonSize + 4}px;
      `)}
      .${ClassName.CONTROLS_INSERT_BUTTON_WRAP} {
        position: absolute;
        height: ${tableInsertColumnButtonSize}px;
        width: ${tableInsertColumnButtonSize}px;
        z-index: ${akEditorSmallZIndex};
        cursor: pointer;
        &:hover .${ClassName.CONTROLS_INSERT_LINE} {
          display: flex;
        }
      }
      .${ClassName.CONTROLS_INSERT_COLUMN} {
        top: -${tableInsertColumnButtonSize - 2}px;
        right: -${tableInsertColumnButtonSize / 2}px;
      }
      .${ClassName.CONTROLS_INSERT_ROW} {
        top: 2px;
        left: -${tableDeleteButtonSize + 2}px;
      }
    }
    .${ClassName.COLUMN_CONTROLS},
    .${ClassName.CONTROLS_INSERT_COLUMN} {
      ${InsertButton()}
      ${InsertLine(`
        width: 2px;
        left: 8px;
        top: ${tableInsertColumnButtonSize - 2}px;
      `)}
      ${InsertMarker(`
        bottom: 5px;
        left: 7px;
      `)}
    }
    .${ClassName.ROW_CONTROLS},
    .${ClassName.CONTROLS_INSERT_ROW} {
      ${InsertButton()}
      ${InsertLine(`
        height: 2px;
        top: 8px;
        left: ${tableInsertColumnButtonSize - 2}px;
      `)}
      ${InsertMarker(`
        top: 7px;
        right: 5px;
      `)}
    }

    /* Corner controls */
    .${ClassName.CORNER_CONTROLS} {
      width: ${tableToolbarSize + 1}px;
      height: ${tableToolbarSize + 1}px;
      display: none;
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
      cursor: pointer;
      box-sizing: border-box;
      padding: 0;
      :focus {
        outline: none;
      }
    }
    .${ClassName.HOVERED_TABLE} .${ClassName.CONTROLS_CORNER_BUTTON},
    .active .${ClassName.CONTROLS_CORNER_BUTTON},
    .${ClassName.CONTROLS_CORNER_BUTTON}:hover {
      border-color: ${tableBorderSelectedColor};
      background: ${tableToolbarSelectedColor};
    }
    .${ClassName.CONTROLS_CORNER_BUTTON}.danger {
      border-color: ${tableBorderDeleteColor};
      background: ${tableToolbarDeleteColor};
    }
    .${ClassName.TABLE_CONTAINER}[data-number-column='true'] {
      .${ClassName.CORNER_CONTROLS},
      .${ClassName.CONTROLS_CORNER_BUTTON} {
        width: ${akEditorTableToolbarSize + akEditorTableNumberColumnWidth}px;
      }
      .${ClassName.ROW_CONTROLS} .${ClassName.CONTROLS_BUTTON} {
        border-right-width: 0;
      }
    }

    /* Row controls */
    .${ClassName.ROW_CONTROLS} {
      width: ${tableToolbarSize}px;
      box-sizing: border-box;
      display: none;
      position: relative;

      .${ClassName.ROW_CONTROLS_INNER} {
        display: flex;
        flex-direction: column;
      }
      .${ClassName.ROW_CONTROLS_BUTTON_WRAP}:last-child > button {
        border-bottom-left-radius: ${tableBorderRadiusSize}px;
      }
      .${ClassName.ROW_CONTROLS_BUTTON_WRAP} {
        position: relative;
        margin-top: -1px;
      }
      .${ClassName.ROW_CONTROLS_BUTTON_WRAP}.active .${
  ClassName.CONTROLS_BUTTON
},
      .${ClassName.CONTROLS_BUTTON}:hover {
        z-index: ${akEditorUnitZIndex};
        position: relative;
      }
      .${ClassName.CONTROLS_INSERT_BUTTON_WRAP} {
        position: absolute;
        bottom: -${tableInsertColumnButtonSize / 2}px;
        left: -${tableInsertColumnButtonSize - 2}px;
        height: ${tableInsertColumnButtonSize}px;
        width: ${tableInsertColumnButtonSize}px;
        z-index: ${akEditorSmallZIndex};
        cursor: pointer;
        &:hover .${ClassName.CONTROLS_INSERT_LINE} {
          display: flex;
        }
      }
      ${DeleteButton(`
        bottom: -${tableInsertColumnButtonSize / 2}px;
        left: -${tableDeleteButtonSize + 6}px;
      `)}
      ${HeaderButton(`
        border-bottom: 1px solid ${tableBorderColor};
        border-right: 1px solid ${tableBorderColor};
        border-radius: 0;
        height: 100%;
        width: ${tableToolbarSize + 1}px;

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
    }

    /* numbered column */
    .${ClassName.NUMBERED_COLUMN} {
      position: relative;
      float: right;
      margin-left: ${akEditorTableToolbarSize - 1}px;
      top: ${akEditorTableToolbarSize}px;
      width: ${akEditorTableNumberColumnWidth + 1}px;
      box-sizing: border-box;
      border-left: 1px solid ${akEditorTableBorder};
    }
    .${ClassName.NUMBERED_COLUMN_BUTTON} {
      border-top: 1px solid ${akEditorTableBorder};
      border-right: 1px solid ${akEditorTableBorder};
      box-sizing: border-box;
      margin-top: -1px;
      padding: 10px 2px;
      text-align: center;
      font-size: ${fontSize()}px;
      background-color: ${tableToolbarColor};
      color: ${N200};
      border-color: ${akEditorTableBorder};

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
        border-left: 0 none;
        padding-left: 1px;

        .${ClassName.NUMBERED_COLUMN_BUTTON} {
          cursor: pointer;
        }
        .${ClassName.NUMBERED_COLUMN_BUTTON}:hover,
        .${ClassName.NUMBERED_COLUMN_BUTTON}.active,
        .${ClassName.NUMBERED_COLUMN_BUTTON}.${ClassName.HOVERED_TABLE} {
          border-bottom: 1px solid ${tableBorderSelectedColor};
          border-color: ${tableBorderSelectedColor};
          background-color: ${tableToolbarSelectedColor};
          position: relative;
          z-index: ${akEditorUnitZIndex};
          color: ${N0};
        }
        .${ClassName.NUMBERED_COLUMN_BUTTON}.danger {
          background-color: ${tableToolbarDeleteColor};
          border: 1px solid ${tableBorderDeleteColor};
          color: ${R500};
          position: relative;
          z-index: ${akEditorUnitZIndex};
        }
      }
      /* scroll shadows */
      .${ClassName.TABLE_RIGHT_SHADOW},
      .${ClassName.TABLE_LEFT_SHADOW}::after {
        display: block;
        position: absolute;
        pointer-events: none;
        z-index: ${akEditorSmallZIndex};
        width: 8px;
      }
      .${ClassName.TABLE_LEFT_SHADOW}::after {
        background: linear-gradient(
          to left,
          rgba(99, 114, 130, 0) 0,
          ${N40A} 100%
        );
        content: '';
        height: 100%;
        right: -8px;
        bottom: 0;
      }
      .${ClassName.TABLE_RIGHT_SHADOW} {
        background: linear-gradient(
          to right,
          rgba(99, 114, 130, 0) 0,
          ${N40A} 100%
        );
        height: calc(100% - ${tableMarginTop + 8}px);
        left: calc(100% + 2px);
        top: ${tableMarginTop - 1}px;
      }
    }

    /* Table */
    .${ClassName.TABLE_NODE_WRAPPER} > table {
      table-layout: fixed;

      td,
      th {
        position: relative;
      }

      .${ClassName.SELECTED_CELL},
      .${ClassName.HOVERED_CELL} {
        position: relative;
        border: 1px solid ${tableBorderSelectedColor};
      }
      /* Give selected cells a blue overlay */
      .${ClassName.SELECTED_CELL}::after {
        z-index: ${akEditorSmallZIndex};
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: ${tableCellSelectedColor};
        opacity: 0.3;
        pointer-events: none;
      }
      .${ClassName.SELECTED_CELL}.danger,
      .${ClassName.HOVERED_CELL}.danger {
        border: 1px solid ${tableBorderDeleteColor};
      }
      .${ClassName.SELECTED_CELL}.danger::after {
        background: ${tableCellDeleteColor};
      }
    }
    .${ClassName.COLUMN_CONTROLS_WRAPPER},
    .${ClassName.ROW_CONTROLS_WRAPPER} {
      position: absolute;
      top: ${tableMarginTop - 1}px;
    }
    .${ClassName.ROW_CONTROLS_WRAPPER}.${ClassName.TABLE_LEFT_SHADOW} {
      z-index: ${akEditorUnitZIndex};
    }
    .${ClassName.COLUMN_CONTROLS_WRAPPER} {
      left: 0;
    }
    .${ClassName.ROW_CONTROLS_WRAPPER} {
      left: -${tableToolbarSize}px;
    }
    .${ClassName.TABLE_NODE_WRAPPER} {
      padding-right: ${tableInsertColumnButtonSize / 2}px;
      margin-right: -${tableInsertColumnButtonSize / 2}px;
      padding-top: ${tableInsertColumnButtonSize / 2}px;
      margin-top: -${tableInsertColumnButtonSize / 2}px;
      z-index: ${akEditorUnitZIndex - 1};
      /* fixes gap cursor height */
      overflow: ${isIE11 ? 'none' : 'auto'};
      position: relative;
    }
    .${ClassName.COLUMN_RESIZE_HANDLE} {
      bottom: 0;
      top: -1px;
      right: -2px;
      width: 2px;
      height: calc(100% + 2px);
    }
  }

  /* =============== TABLE COLUMN RESIZING ================== */
  .ProseMirror.${ClassName.RESIZING} {
    .${ClassName.TABLE_NODE_WRAPPER} {
      overflow-x: ${isIE11 ? 'none' : 'auto'};
      ${!isIE11 ? scrollbarStyles : ''};
    }
    .${ClassName.COLUMN_RESIZE_HANDLE} {
      background-color: ${tableBorderSelectedColor};
      position: absolute;
      bottom: 0;
      top: -1px;
      right: -2px;
      width: 2px;
      height: calc(100% + 2px);
      pointer-events: none;
      z-index: ${akEditorUnitZIndex};
    }
    .${ClassName.WITH_CONTROLS} .${ClassName.COLUMN_RESIZE_HANDLE} {
      top: -${tableToolbarSize}px;
      height: calc(100% + ${tableToolbarSize}px);
    }
  }

  .ProseMirror.resize-cursor {
    cursor: col-resize;
  }

  /* =============== TABLE CONTEXTUAL MENU ================== */
  .${ClassName.CONTEXTUAL_MENU_BUTTON} {
    position: absolute;
    right: 2px;
    top: 2px;

    > div {
      background: ${N20};
      border-radius: ${borderRadius()}px;
      border: 2px solid ${N0};
      display: flex;
      height: ${contextualMenuTriggerSize + 2}px;
      flex-direction: column;
    }
    button {
      flex-direction: column;
      padding: 0;
    }
  }
  .${ClassName.CONTEXTUAL_SUBMENU} {
    border-radius: ${borderRadius()}px;
    background: white;
    box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
    display: block;
    position: absolute;
    width: 130px;
    height: 64px;
    top: 0;
    left: ${contextualMenuDropdownWidth}px;
    padding: 5px;

    > div {
      padding: 0;
    }
  }
  .${ClassName.CONTEXTUAL_MENU_ICON} {
    border: 1px solid ${N30};
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

/* =============== TABLE CELL TYPE ================== */
  .${ClassName.TABLE_CONTAINER}.-hidden {
    .${ClassName.ROW_CONTROLS_WRAPPER},
    .${ClassName.COLUMN_CONTROLS_WRAPPER},
    .${ClassName.TABLE_LEFT_SHADOW},
    .${ClassName.TABLE_RIGHT_SHADOW} {
      display: none !important;
    }
    .${ClassName.TABLE_NODE_WRAPPER} {
      height: 0;
      width: 0;
      overflow: hidden;
      padding: 0;
    }
  }

  /* FORM */
  .${ClassName.FORM_ADD_FIELD_BUTTON} span {
    text-align: left;
  }
  .${ClassName.FORM_WRAPPER} {
    box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
    padding: 30px 0 40px;
    margin: 20px 0;

    .${ClassName.FORM} {
      margin: 0 auto;
      width: 400px;

      .${ClassName.FORM_INPUT_LABEL} {
        font-size: 85%;
        font-weight: bold;
        margin-bottom: 5px;
        color: ${N90};
      }
      .${ClassName.FORM_INPUT_WRAP} {
        margin-bottom: 20px;

        .${ClassName.FORM_INPUT} {
          background: ${N20A};
          border-radius: ${borderRadius()}px;
          padding: 7px 10px;
          min-width: 100px;
          cursor: pointer;
          transition: background 0.1s ease-out 0s;
          color: ${N200};

          &:hover {
            background: ${N40A};
          }
        }
      }
      .${ClassName.FORM_INPUT_WRAP}:last-child {
        margin-bottom: 0;
      }

      .${ClassName.FORM_SECTION} {
        margin-bottom: 20px;

        button span {
          vertical-align: middle;
        }
      }
      .${ClassName.FORM_SECTION}:last-child {
        margin-bottom: 0;
      }

      .${ClassName.CELL_NODEVIEW_COLUMN_TYPES_BUTTON},
      .${ClassName.FORM_REMOVE_FIELD_BUTTON} {
        visibility: hidden;
        padding: 0;
        position: absolute;
        top: 15px;
      }
      .${ClassName.FORM_REMOVE_FIELD_BUTTON} {
        right: 15px;
      }
      .${ClassName.CELL_NODEVIEW_COLUMN_TYPES_BUTTON} {
        right: 53px;
      }

      .${ClassName.FORM_SLIDER_WRAPPER} {
        background: ${N10};
        border-radius: ${borderRadius()}px;
        padding: 15px;
        caret-color: transparent;
      }

      /* DRAGGING */
      .${ClassName.FORM_BODY}.${ClassName.FORM_SECTION}.dragging {
        box-shadow: 6px 11px 20px -4px ${N60A}, 0 0 1px ${N60A};
      }

      .${ClassName.FORM_BODY}.${ClassName.FORM_SECTION} {
        background: white;
        border-radius: 3px;
        position: relative;
        padding: 15px;
        padding-right: 90px;

        &:hover {
          box-shadow: 0 1px 8px -2px ${N60A}, 0 0 1px ${N60A};

          .${ClassName.FORM_REMOVE_FIELD_BUTTON},
          .${ClassName.CELL_NODEVIEW_COLUMN_TYPES_BUTTON} {
            visibility: visible;
          }
        }

        .${ClassName.FORM_COLUMN_FIELD_WRAPPER} {
          display: flex;
          align-items: center;
          justify-content: space-between;

          > div {
            flex: 1;
          }
        }
      }

      .${ClassName.FORM_FOOTER}.${ClassName.FORM_SECTION} {
        width: 295px;
        margin-left: 15px;
      }

      .${ClassName.FORM_MENTION_FIELD_CHECHBOX_WRAP} {
        display: inline-flex;
        vertical-align: middle;
      }
    }
  }

  /* STATUS COLOR PICKER */
  .${ClassName.STATUS_LOZENGE} {
    padding: 0px 6px;
    border-radius: 6px;
    display: inline-block;
  }
  .${ClassName.STATUS_COLOR_PICKER} {
    margin-left: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;

    .${ClassName.STATUS_COLOR_PICKER_ICON} {
      width: 28px;
      height: 28px;
      border: 1px solid ${N40};
      border-radius: ${borderRadius()}px;
      cursor: pointer;
    }
    .${ClassName.STATUS_COLOR_PICKER_PALETTE} {
      top: 10px;
      left: 25px;
      position: absolute;
      background: white;
      border-radius: ${borderRadius()}px;
      z-index: 999;
      width: 128px;
      padding: 10px;
      box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};

      > div {
        padding: 0;
      }
      button {
        margin: 0 !important;
      }
    }

  }

  /* SELECT */
  .${ClassName.SINGLE_SELECT_WRAPPER} {
    background: ${N20A};
    padding: 5px 10px;
    border-radius: ${borderRadius()}px;
    color: ${N200};
    display: inline-flex;
  }
  .${ClassName.SINGLE_SELECT_CONTENT} {
    max-width: 120px;
    min-width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
    flex: 1;
  }
  .${ClassName.SINGLE_SELECT_ICON} {
    display: inline-flex;
    margin-left: 10px;
  }
  .${ClassName.SINGLE_SELECT_DEFAULT_OPTION} {
    border-top: 1px solid ${N40};
  }

  /* COLUMN TYPES SETTINGS_MENU */
  .${ClassName.COLUMN_TYPES_SETTINGS_MENU} {
    background: white;
    box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
    border-radius: ${borderRadius()}px;
    padding: 15px;
    width: 250px;
    .${ClassName.COLUMN_TYPES_SETTINGS_MENU_TITLE} {
      color: ${N200};
      text-transform: uppercase;
      font-weight: bold;
      font-size: 80%;
    }
    button {
      margin-top: 15px;
    }
    .${ClassName.COLUMN_TYPES_SETTINGS_MENU_ALLOW_CREATE_WRAP} {
      display: flex;
      margin-top: 15px;

      label > span:last-child {
        font-size: 90%;
        color: ${N200};
      }
    }

    .${ClassName.COLUMN_TYPES_SETTINGS_MENU_BUTTONS_WRAP} {
      margin-top: 15px;
      border-top: 1px solid ${N20};
      text-align: right;

      button:last-child {
        margin-left: 10px;
      }
    }
    .${ClassName.SINGLE_SELECT_OPTION_SETTINGS} {
      display: flex;
      margin-top: 10px;

      button {
        background: ${N20A};
        color: ${N300};
        border-radius: ${borderRadius()}px;
        border-width: 0px;
        display: inline-block;
        align-self: center;
        margin: -1px 0 0 10px;
        padding: 3px 5px;
        transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
        outline: none !important;
        cursor: pointer;
        :hover {
          background: ${R300};
          color: white;
        }
      }
    }
  }
  button[aria-label="Form view"].cFRffJ path{
    fill: white;
  }
  .ProseMirror {
    table {
      .${ClassName.CELL_NODEVIEW_WRAPPER} {
        display: flex;
        margin-right: 12px;
      }
      .${ClassName.CELL_NODEVIEW_CONTENT} {
        flex: 1;
      }
      .${ClassName.CELL_NODEVIEW_COLUMN_TYPES_BUTTON} button {
        height: 24px;
        width: 24px;
        border-radius: ${borderRadius};
        opacity: 0.5;
        &:hover {
          opacity: 1;
        }
      }

      td[celltype='date'],
      td[celltype='mention'],
      td[celltype='emoji'],
      td[celltype='link'],
      td[celltype='checkbox'],
      td[celltype='single-select'],
      td[celltype='multi-select'],
      td[celltype='radio-select'],
      td[celltype='status-select'] {
        cursor: pointer;
        caret-color: transparent;
      }
      td[celltype='checkbox']{
        text-align: center;
      }
      td[celltype='number'],
      td[celltype='currency'] {
        text-align: right;
        padding-right: 20px;

        &.invalid {
          border: 1px solid ${R300};
          background: ${R50};
        }
      }

      td[celltype='currency']:before {
        content: '$';
        float: left;
        color: ${N200};
      }

      td[celltype='slider'] {
        caret-color: transparent;
      }

      tr:not(:first-child) th .ProseMirror-tableHeader-button-container {
        display: none;
      }
    }

    /* Range Slider */
    .rangeslider {
      flex: 1;
      margin: 0 10px;
      position: relative;
      background: #e6e6e6;
      -ms-touch-action: none;
      touch-action: none;
    }
    .rangeslider,
    .rangeslider .rangeslider__fill {
      display: block;
    }
    .rangeslider .rangeslider__handle {
      cursor: pointer;
      display: inline-block;
      position: absolute;
    }
    .rangeslider .rangeslider__handle .rangeslider__active {
      opacity: 1;
    }
    .rangeslider .rangeslider__handle-tooltip {
      width: 40px;
      height: 40px;
      text-align: center;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.8);
      font-weight: 400;
      font-size: 14px;
      transition: all 0.1s ease-in;
      border-radius: 4px;
      display: inline-block;
      color: #fff;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
    .rangeslider .rangeslider__handle-tooltip span {
      margin-top: 12px;
      display: inline-block;
      line-height: 100%;
    }
    .rangeslider .rangeslider__handle-tooltip:after {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
    }
    .rangeslider-horizontal .rangeslider__fill {
      height: 100%;
      background-color: ${G300};
      border-radius: 3px;
      top: 0;
    }
    .rangeslider-horizontal .rangeslider__handle {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .rangeslider-horizontal .rangeslider__handle-tooltip {
      top: -55px;
    }
    .rangeslider-horizontal .rangeslider__handle-tooltip:after {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid rgba(0, 0, 0, 0.8);
      left: 50%;
      bottom: -8px;
      transform: translate3d(-50%, 0, 0);
    }
    .rangeslider-vertical {
      margin: 20px auto;
      height: 150px;
      max-width: 10px;
      background-color: transparent;
    }
    .rangeslider-vertical .rangeslider__fill,
    .rangeslider-vertical .rangeslider__handle {
      position: absolute;
    }
    .rangeslider-vertical .rangeslider__fill {
      width: 100%;
      background-color: #7cb342;
      box-shadow: none;
      bottom: 0;
    }
    .rangeslider-vertical .rangeslider__handle {
      width: 30px;
      height: 10px;
      left: -10px;
      box-shadow: none;
    }
    .rangeslider-vertical .rangeslider__handle-tooltip {
      left: -100%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .rangeslider-vertical .rangeslider__handle-tooltip:after {
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid rgba(0, 0, 0, 0.8);
      left: 100%;
      top: 12px;
    }
    .rangeslider-reverse.rangeslider-horizontal .rangeslider__fill {
      right: 0;
    }
    .rangeslider-reverse.rangeslider-vertical .rangeslider__fill {
      top: 0;
      bottom: inherit;
    }
    .rangeslider__labels {
      position: relative;
    }
    .rangeslider-vertical .rangeslider__labels {
      position: relative;
      list-style-type: none;
      margin: 0;
      padding: 0;
      text-align: left;
      width: 250px;
      height: 100%;
      left: 10px;
    }
    .rangeslider-vertical .rangeslider__labels .rangeslider__label-item {
      position: absolute;
      transform: translate3d(0, -50%, 0);
    }
    .rangeslider-vertical
      .rangeslider__labels
      .rangeslider__label-item::before {
      content: '';
      width: 10px;
      height: 2px;
      background: #000;
      position: absolute;
      left: -14px;
      top: 50%;
      transform: translateY(-50%);
      z-index: -1;
    }
    .rangeslider__labels .rangeslider__label-item {
      position: absolute;
      font-size: 14px;
      cursor: pointer;
      display: inline-block;
      top: 10px;
      transform: translate3d(-50%, 0, 0);
    }
    ul.rangeslider__labels {
      margin: 0;
    }
    .rangeslider-horizontal {
      height: 4px;
      border-radius: 3px;
      background: ${N40};
    }
    .rangeslider-horizontal .rangeslider__handle {
      width: 14px;
      height: 14px;
      background: ${G300};
      outline: none;
    }
    .rangeslider .rangeslider__handle-tooltip {
      display: none;
    }

    .slider {
      display: flex;
      align-items: center;
      width: 100%;
      height: 17px;
    }
    .slider__value {
      padding: 0 4px;
      background: ${N20};
      color: ${G300};
      border-radius: ${borderRadius};
      min-width: 32px;
      text-align: center;
    }
    /* Range Slider End */
    .danger {
      .rangeslider__fill {
        background-color: ${R300};
        td[celltype='checkbox'] {
          width: 60px;
        }
      }
      .rangeslider__handle {
        background: ${R300};
      }
      .slider__value {
        color: ${R300};
      }
    }
  }
`;

export const tableFullPageEditorStyles = css`
  .ProseMirror .${ClassName.TABLE_NODE_WRAPPER} > table {
    .${ClassName.SELECTED_CELL}.danger, .${ClassName.HOVERED_CELL}.danger {
      border: 1px solid ${tableBorderDeleteColor};
      background: ${tableCellDeleteColor};
    }
    .${ClassName.SELECTED_CELL}.danger:after {
      background: ${tableCellDeleteColor};
    }
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
