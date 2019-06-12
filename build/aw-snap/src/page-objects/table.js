const {
  clickElementWithText,
  getBoundingRect,
  scrollToElement,
  animationFrame,
} = require('./editor');
const { clickToolbarMenu, ToolbarMenuItem } = require('./toolbar');

const { pressKeyDown, pressKeyUp } = require('./keyboard');

const messages = {
  layoutFixedWidth: {
    id: 'fabric.editor.layoutFixedWidth',
    defaultMessage: 'Back to Center',
    description:
      'Display your element (image, table, extension, etc) as standard width',
  },
  layoutWide: {
    id: 'fabric.editor.layoutWide',
    defaultMessage: 'Go Wide',
    description:
      'Display your element (image, table, extension, etc) wider than normal',
  },
  layoutFullWidth: {
    id: 'fabric.editor.layoutFullWidth',
    defaultMessage: 'Go Full width',
    description:
      'Display your element (image, table, extension, etc) as full width',
  },
  alignImageRight: {
    id: 'fabric.editor.alignImageRight',
    defaultMessage: 'Align right',
    description: 'Aligns image to the right',
  },
  alignImageCenter: {
    id: 'fabric.editor.alignImageCenter',
    defaultMessage: 'Align center',
    description: 'Aligns image to the center',
  },
  alignImageLeft: {
    id: 'fabric.editor.alignImageLeft',
    defaultMessage: 'Align left',
    description: 'Aligns image to the left',
  },
  remove: {
    id: 'fabric.editor.remove',
    defaultMessage: 'Remove',
    description:
      'Delete the element (image, panel, table, etc.) from your document',
  },
  visit: {
    id: 'fabric.editor.visit',
    defaultMessage: 'Open link in a new window',
    description: '',
  },
};

const clPrefix = 'pm-table-';
const TableCssClassName = {
  TABLE_CONTAINER: `${clPrefix}container`,
  TABLE_NODE_WRAPPER: `${clPrefix}wrapper`,
  TABLE_LEFT_SHADOW: `${clPrefix}with-left-shadow`,
  TABLE_RIGHT_SHADOW: `${clPrefix}with-right-shadow`,
  TABLE_CELL_NODEVIEW_CONTENT_DOM: `${clPrefix}cell-nodeview-content-dom`,

  COLUMN_CONTROLS_WRAPPER: `${clPrefix}column-controls-wrapper`,
  COLUMN_CONTROLS: `${clPrefix}column-controls`,
  COLUMN_CONTROLS_INNER: `${clPrefix}column-controls__inner`,
  COLUMN_CONTROLS_BUTTON_WRAP: `${clPrefix}column-controls__button-wrap`,

  ROW_CONTROLS_WRAPPER: `${clPrefix}row-controls-wrapper`,
  ROW_CONTROLS: `${clPrefix}row-controls`,
  ROW_CONTROLS_INNER: `${clPrefix}row-controls__inner`,
  ROW_CONTROLS_BUTTON_WRAP: `${clPrefix}row-controls__button-wrap`,

  CONTROLS_BUTTON: `${clPrefix}controls__button`,
  CONTROLS_BUTTON_ICON: `${clPrefix}controls__button-icon`,

  CONTROLS_INSERT_BUTTON: `${clPrefix}controls__insert-button`,
  CONTROLS_INSERT_BUTTON_INNER: `${clPrefix}controls__insert-button-inner`,
  CONTROLS_INSERT_BUTTON_WRAP: `${clPrefix}controls__insert-button-wrap`,
  CONTROLS_INSERT_LINE: `${clPrefix}controls__insert-line`,
  CONTROLS_BUTTON_OVERLAY: `${clPrefix}controls__button-overlay`,
  LAYOUT_BUTTON: `${clPrefix}layout-button`,

  CONTROLS_INSERT_MARKER: `${clPrefix}controls__insert-marker`,
  CONTROLS_INSERT_COLUMN: `${clPrefix}controls__insert-column`,
  CONTROLS_INSERT_ROW: `${clPrefix}controls__insert-row`,
  CONTROLS_DELETE_BUTTON_WRAP: `${clPrefix}controls__delete-button-wrap`,
  CONTROLS_DELETE_BUTTON: `${clPrefix}controls__delete-button`,

  CORNER_CONTROLS: `${clPrefix}corner-controls`,
  CONTROLS_CORNER_BUTTON: `${clPrefix}corner-button`,

  NUMBERED_COLUMN: `${clPrefix}numbered-column`,
  NUMBERED_COLUMN_BUTTON: `${clPrefix}numbered-column__button`,

  HOVERED_CELL: `${clPrefix}hovered-cell`,
  WITH_CONTROLS: `${clPrefix}with-controls`,
  RESIZING_PLUGIN: `${clPrefix}resizing-plugin`,
  RESIZE_CURSOR: `${clPrefix}resize-cursor`,
  IS_RESIZING: `${clPrefix}is-resizing`,

  CONTEXTUAL_SUBMENU: `${clPrefix}contextual-submenu`,
  CONTEXTUAL_MENU_BUTTON_WRAP: `${clPrefix}contextual-menu-button-wrap`,
  CONTEXTUAL_MENU_BUTTON: `${clPrefix}contextual-menu-button`,
  CONTEXTUAL_MENU_ICON: `${clPrefix}contextual-submenu-icon`,

  CELL_NODEVIEW_WRAPPER: `${clPrefix}cell-nodeview-wrapper`,

  // come from prosemirror-table
  COLUMN_RESIZE_HANDLE: 'column-resize-handle',
  SELECTED_CELL: 'selectedCell',

  // defined in ReactNodeView based on PM node name
  NODEVIEW_WRAPPER: 'tableView-content-wrap',
  TABLE_HEADER_NODE_WRAPPER: 'tableHeaderView-content-wrap',
  TABLE_CELL_NODE_WRAPPER: 'tableCellView-content-wrap',

  TOP_LEFT_CELL: 'table > tbody > tr:nth-child(2) > td:nth-child(1)',
};

const tableSelectors = {
  contextualMenu: `.${TableCssClassName.CONTEXTUAL_MENU_BUTTON}`,
  hoveredCell: `.ProseMirror table .${TableCssClassName.HOVERED_CELL}`,
  nthRowControl: n =>
    `.${TableCssClassName.ROW_CONTROLS_BUTTON_WRAP}:nth-child(${n}) button`,
  nthColumnControl: n =>
    `.${TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP}:nth-child(${n}) button`,
  firstRowControl: `.${
    TableCssClassName.ROW_CONTROLS_BUTTON_WRAP
  }:nth-child(1) button`,
  firstColumnControl: `.${
    TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(1) button`,
  lastRowControl: `.${
    TableCssClassName.ROW_CONTROLS_BUTTON_WRAP
  }:nth-child(3) button`,
  lastColumnControl: `.${
    TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(3) button`,
  rowControlSelector: TableCssClassName.ROW_CONTROLS_BUTTON_WRAP,
  columnControlSelector: TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP,
  deleteButtonSelector: `.${TableCssClassName.CONTROLS_DELETE_BUTTON_WRAP} .${
    TableCssClassName.CONTROLS_DELETE_BUTTON
  }`,
  rowControls: TableCssClassName.ROW_CONTROLS_WRAPPER,
  columnControls: TableCssClassName.COLUMN_CONTROLS_WRAPPER,
  insertColumnButton: `.${TableCssClassName.CONTROLS_INSERT_COLUMN}`,
  insertRowButton: `.${TableCssClassName.CONTROLS_INSERT_ROW}`,
  cornerButton: `.${TableCssClassName.CONTROLS_CORNER_BUTTON}`,
  breakoutButton: `.${TableCssClassName.LAYOUT_BUTTON}`,
  mergeCellsText: `Merge cells`,
  splitCellText: `Split cell`,
  tableOptionsText: `Table options`,
  removeRowButton: `button[title="Remove row"]`,
  removeColumnButton: `button[title="Remove column"]`,
  removeDanger: '.ProseMirror table .danger',
  removeTable: `button[aria-label="Remove"]`,
  selectedCell: `.ProseMirror table .${TableCssClassName.SELECTED_CELL}`,
  topLeftCell: `table > tbody > tr:nth-child(2) > td:nth-child(1)`,
  wideState: `.ProseMirror table[data-layout="wide"]`,
  fullWidthState: `.ProseMirror table[data-layout="full-width"]`,
  defaultState: `.ProseMirror table[data-layout="center"]`,
  fullWidthSelector: `div[aria-label="${
    messages.layoutFullWidth.defaultMessage
  }"]`,
  wideSelector: `div[aria-label="${messages.layoutWide.defaultMessage}"]`,
  defaultSelector: `div[aria-label="${
    messages.layoutFixedWidth.defaultMessage
  }"]`,
  tableTd: 'table td',
  tableTh: 'table th',
  cellBackgroundText: 'Cell background',
  cellBackgroundSubmenuSelector: `.${TableCssClassName.CONTEXTUAL_SUBMENU}`,
};
// insert table from menu
const insertTable = async page => {
  await clickToolbarMenu(page, ToolbarMenuItem.table);
  await page.waitForSelector(tableSelectors.tableTd);
  await page.click(tableSelectors.tableTh);
};

// click into first cell on table
const clickFirstCell = async page => {
  await page.waitForSelector(tableSelectors.topLeftCell);
  await page.click(tableSelectors.topLeftCell);
  await page.waitForSelector(tableSelectors.removeTable);
};

const selectTable = async page => {
  await page.waitForSelector(tableSelectors.cornerButton);
  await page.click(tableSelectors.cornerButton);
  await page.waitForSelector(tableSelectors.selectedCell);
};

// table floating toolbar interactions
const clickTableOptions = async page => {
  await clickElementWithText({
    page,
    tag: 'span',
    text: tableSelectors.tableOptionsText,
  });
};

const clickCellOptions = async page => {
  await page.waitForSelector(tableSelectors.contextualMenu);
  await page.click(tableSelectors.contextualMenu);
};

const selectCellOption = async (page, option) => {
  await page.waitForSelector(tableSelectors.contextualMenu);
  await page.click(tableSelectors.contextualMenu);
  await clickElementWithText({ page, tag: 'span', text: option });
};

// colorIndex - index of the color button DOM node, values from 1 to 8
const selectCellBackground = async ({ page, from, to, colorIndex }) => {
  const firstCell = getSelectorForTableCell({
    row: from.row,
    cell: from.column,
    cellType: from.row === 1 ? 'th' : 'td',
  });
  const lastCell = getSelectorForTableCell({
    row: to.row,
    cell: to.column,
    cellType: from.row === 1 ? 'th' : 'td',
  });
  await page.click(firstCell);
  await pressKeyDown(page, 'Shift');
  await page.click(lastCell);
  await pressKeyUp(page, 'Shift');
  await page.waitForSelector(tableSelectors.selectedCell);
  await clickCellOptions(page);
  await animationFrame(page);

  const colorButtonSelector =
    tableSelectors.cellBackgroundSubmenuSelector +
    ` span:nth-child(${colorIndex}) button`;

  await selectCellOption(page, tableSelectors.cellBackgroundText);
  await page.waitForSelector(colorButtonSelector);
  await page.click(colorButtonSelector);
  await animationFrame(page);
};

// support for table layout
const setTableLayoutWide = async page => {
  await page.waitForSelector(tableSelectors.wideSelector);
  await page.click(tableSelectors.wideSelector);
  await page.waitForSelector(tableSelectors.wideState);
};

const setTableLayoutFullWidth = async page => {
  await setTableLayoutWide(page);
  await page.click(tableSelectors.fullWidthSelector);
  await page.waitForSelector(tableSelectors.fullWidthState);
};

const resetTableLayoutDefault = async page => {
  await page.waitForSelector(tableSelectors.defaultSelector);
  await page.click(tableSelectors.defaultSelector);
  await page.waitForSelector(tableSelectors.defaultState);
};

const setTableLayout = async (page, layout) => {
  if (layout === 'wide') {
    await setTableLayoutWide(page);
  } else if (layout === 'full-width') {
    await setTableLayoutFullWidth(page);
  }
};

const insertRow = async (page, atIndex) => {
  await insertRowOrColumn(
    page,
    tableSelectors.rowControlSelector,
    tableSelectors.insertRowButton,
    atIndex,
  );
};

const insertColumn = async (page, atIndex) => {
  await insertRowOrColumn(
    page,
    tableSelectors.columnControlSelector,
    tableSelectors.insertColumnButton,
    atIndex,
  );
};

const insertRowOrColumn = async (
  page,
  buttonWrapSelector,
  insertSelector,
  atIndex,
) => {
  await clickFirstCell(page);
  const buttonSelector = `.${buttonWrapSelector}:nth-child(${atIndex}) ${insertSelector}`;
  await page.waitForSelector(buttonSelector);
  await page.hover(buttonSelector);
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);
};

const deleteRow = async (page, atIndex) => {
  const controlSelector = `.${tableSelectors.rowControls} .${
    TableCssClassName.ROW_CONTROLS_BUTTON_WRAP
  }:nth-child(${atIndex}) .${TableCssClassName.CONTROLS_BUTTON}`;
  await deleteRowOrColumn(page, controlSelector);
};

const deleteColumn = async (page, atIndex) => {
  const controlSelector = `.${tableSelectors.columnControls} .${
    TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(${atIndex}) .${TableCssClassName.CONTROLS_BUTTON}`;
  await deleteRowOrColumn(page, controlSelector);
};

const deleteRowOrColumn = async (page, controlSelector) => {
  await clickFirstCell(page);
  await page.waitForSelector(controlSelector);
  await page.click(controlSelector);
  await page.hover(tableSelectors.deleteButtonSelector);
  await page.waitForSelector(tableSelectors.deleteButtonSelector);
  await page.click(tableSelectors.deleteButtonSelector);
};

const getSelectorForTableCell = ({ row, cell, table = 1, cellType = 'td' }) => {
  const rowSelector = `.ProseMirror table:nth-of-type(${table}) tr:nth-child(${row})`;
  if (!cell) {
    return rowSelector;
  }

  return `${rowSelector} > ${cellType}:nth-child(${cell})`;
};

const splitCells = async (page, selector) => {
  await page.click(selector);
  await clickCellOptions(page);
  await selectCellOption(page, tableSelectors.splitCellText);
};

const mergeCells = async (page, firstCell, lastCell) => {
  await page.click(firstCell);
  await pressKeyDown(page, 'Shift');
  await page.click(lastCell);
  await pressKeyUp(page, 'Shift');
  await page.waitForSelector(tableSelectors.selectedCell);
  await clickCellOptions(page);
  await selectCellOption(page, tableSelectors.mergeCellsText);
};

const getSelectorForTableControl = (type, atIndex, table = 1) => {
  let selector = `.pm-table-${type}-controls__button-wrap`;
  if (atIndex) {
    selector += `:nth-child(${atIndex})`;
  }

  return selector;
};

const resizeColumn = async (page, { colIdx, amount, row = 1 }) => {
  let cell = await getBoundingRect(
    page,
    getSelectorForTableCell({ row, cell: colIdx }),
  );

  const columnEndPosition = cell.left + cell.width;

  // Move to the right edge of the cell.
  await page.mouse.move(columnEndPosition, cell.top);

  // Resize
  await page.mouse.down();
  await page.mouse.move(columnEndPosition + amount, cell.top);
  await page.mouse.up();
};

const grabResizeHandle = async (page, { colIdx, row = 1 }) => {
  let cell = await getBoundingRect(
    page,
    getSelectorForTableCell({ row, cell: colIdx }),
  );

  const columnEndPosition = cell.left + cell.width;

  // Move to the right edge of the cell.
  await page.mouse.move(columnEndPosition, cell.top);

  await page.mouse.down();
};

const toggleBreakout = async (page, times) => {
  const timesArray = Array.from({ length: times });

  await page.waitForSelector(tableSelectors.breakoutButton);
  for (let _iter of timesArray) {
    await page.click(tableSelectors.breakoutButton);
  }
};

const scrollToTable = async page => {
  await scrollToElement(page, tableSelectors.tableTd, 50);
};

const select = type => async (n, isShiftPressed = false) => {
  // @ts-ignore
  const page = global.page;
  const selector =
    type === 'row'
      ? tableSelectors.nthRowControl(n + 1)
      : tableSelectors.nthColumnControl(n + 1);
  await page.waitForSelector(selector);

  if (isShiftPressed) {
    await page.keyboard.down('Shift');
    await page.click(selector);
    await page.keyboard.up('Shift');
  } else {
    await page.click(selector);
  }
  await page.waitForSelector(tableSelectors.selectedCell);
};

/**
 * @param n This has `0` based index.
 */
const selectRow = select('row');
/**
 * @param n This has `0` based index.
 */
const selectColumn = select('column');

module.exports = {
  insertTable,
  clickFirstCell,
  selectTable,
  clickTableOptions,
  clickCellOptions,
  selectCellOption,
  selectCellBackground,
  setTableLayoutWide,
  setTableLayoutFullWidth,
  resetTableLayoutDefault,
  setTableLayout,
  insertRow,
  insertColumn,
  insertRowOrColumn,
  deleteRow,
  deleteColumn,
  deleteRowOrColumn,
  splitCells,
  mergeCells,
  getSelectorForTableCell,
  getSelectorForTableControl,
  resizeColumn,
  grabResizeHandle,
  toggleBreakout,
  scrollToTable,
  selectRow,
  selectColumn,
};
