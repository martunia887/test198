import {
  clickElementWithText,
  getBoundingRect,
  scrollToElement,
} from './_editor';
import { clickToolbarMenu, ToolbarMenuItem } from './_toolbar';
import { TableCssClassName as ClassName } from '../../../plugins/table/types';
import messages from '../../../messages';
import {
  pressKeyDown,
  pressKeyUp,
} from '../../__helpers/page-objects/_keyboard';
import { animationFrame } from '../../__helpers/page-objects/_editor';

export const tableSelectors = {
  contextualMenu: `.${ClassName.CONTEXTUAL_MENU_BUTTON}`,
  hoveredCell: `.ProseMirror table .${ClassName.HOVERED_CELL}`,
  nthRowControl: (n: number) =>
    `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}:nth-child(${n}) button`,
  nthColumnControl: (n: number) =>
    `.${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}:nth-child(${n}) button`,
  nthNumberedColumnRowControl: (n: number) =>
    `.${ClassName.NUMBERED_COLUMN_BUTTON}:nth-child(${n})`,
  firstRowControl: `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}:nth-child(1) button`,
  firstColumnControl: `.${
    ClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(1) button`,
  lastRowControl: `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}:nth-child(3) button`,
  lastColumnControl: `.${
    ClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(3) button`,
  rowControlSelector: ClassName.ROW_CONTROLS_BUTTON_WRAP,
  columnControlSelector: ClassName.COLUMN_CONTROLS_BUTTON_WRAP,
  deleteButtonSelector: `.${ClassName.CONTROLS_DELETE_BUTTON_WRAP} .${
    ClassName.CONTROLS_DELETE_BUTTON
  }`,
  rowControls: ClassName.ROW_CONTROLS_WRAPPER,
  columnControls: ClassName.COLUMN_CONTROLS_WRAPPER,
  insertColumnButton: `.${ClassName.CONTROLS_INSERT_COLUMN}`,
  insertRowButton: `.${ClassName.CONTROLS_INSERT_ROW}`,
  cornerButton: `.${ClassName.CONTROLS_CORNER_BUTTON}`,
  breakoutButton: `.${ClassName.LAYOUT_BUTTON}`,
  mergeCellsText: `Merge cells`,
  splitCellText: `Split cell`,
  tableOptionsText: `Table options`,
  removeRowButton: `button[title="Remove row"]`,
  removeColumnButton: `button[title="Remove column"]`,
  removeDanger: '.ProseMirror table .danger',
  removeTable: `button[aria-label="Remove"]`,
  selectedCell: `.ProseMirror table .${ClassName.SELECTED_CELL}`,
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
  cellBackgroundSubmenuSelector: `.${ClassName.CONTEXTUAL_SUBMENU}`,
};
// insert table from menu
export const insertTable = async (page: any) => {
  await clickToolbarMenu(page, ToolbarMenuItem.table);
  await page.waitForSelector(tableSelectors.tableTd);
  await page.click(tableSelectors.tableTh);
};

// click into first cell on table
export const clickFirstCell = async (page: any) => {
  await page.waitForSelector(tableSelectors.topLeftCell);
  await page.click(tableSelectors.topLeftCell);
  await page.waitForSelector(tableSelectors.removeTable);
};

export const selectTable = async (page: any) => {
  await page.waitForSelector(tableSelectors.cornerButton);
  await page.click(tableSelectors.cornerButton);
  await page.waitForSelector(tableSelectors.selectedCell);
};

// table floating toolbar interactions
export const clickTableOptions = async (page: any) => {
  await clickElementWithText({
    page,
    tag: 'span',
    text: tableSelectors.tableOptionsText,
  });
};

export const clickCellOptions = async (page: any) => {
  await page.waitForSelector(tableSelectors.contextualMenu);
  await page.click(tableSelectors.contextualMenu);
};

export const selectCellOption = async (page: any, option: string) => {
  await page.waitForSelector(tableSelectors.contextualMenu);
  await page.click(tableSelectors.contextualMenu);
  await clickElementWithText({ page, tag: 'span', text: option });
};

// colorIndex - index of the color button DOM node, values from 1 to 8
export const selectCellBackground = async ({
  page,
  from,
  to,
  colorIndex,
}: {
  page: any;
  from: { row: number; column: number };
  to: { row: number; column: number };
  colorIndex: number;
}) => {
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
export const setTableLayoutWide = async (page: any) => {
  await page.waitForSelector(tableSelectors.wideSelector);
  await page.click(tableSelectors.wideSelector);
  await page.waitForSelector(tableSelectors.wideState);
};

export const setTableLayoutFullWidth = async (page: any) => {
  await setTableLayoutWide(page);
  await page.click(tableSelectors.fullWidthSelector);
  await page.waitForSelector(tableSelectors.fullWidthState);
};

export const resetTableLayoutDefault = async (page: any) => {
  await page.waitForSelector(tableSelectors.defaultSelector);
  await page.click(tableSelectors.defaultSelector);
  await page.waitForSelector(tableSelectors.defaultState);
};

export const setTableLayout = async (page: any, layout: string) => {
  if (layout === 'wide') {
    await setTableLayoutWide(page);
  } else if (layout === 'full-width') {
    await setTableLayoutFullWidth(page);
  }
};

export const insertRow = async (page: any, atIndex: number) => {
  await insertRowOrColumn(
    page,
    tableSelectors.rowControlSelector,
    tableSelectors.insertRowButton,
    atIndex,
  );
};

export const insertColumn = async (page: any, atIndex: number) => {
  await insertRowOrColumn(
    page,
    tableSelectors.columnControlSelector,
    tableSelectors.insertColumnButton,
    atIndex,
  );
};

export const insertRowOrColumn = async (
  page: any,
  buttonWrapSelector: string,
  insertSelector: string,
  atIndex: number,
) => {
  await clickFirstCell(page);
  const buttonSelector = `.${buttonWrapSelector}:nth-child(${atIndex}) ${insertSelector}`;
  await page.waitForSelector(buttonSelector);
  await page.hover(buttonSelector);
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);
};

export const deleteRow = async (page: any, atIndex: number) => {
  const controlSelector = `.${tableSelectors.rowControls} .${
    ClassName.ROW_CONTROLS_BUTTON_WRAP
  }:nth-child(${atIndex}) .${ClassName.CONTROLS_BUTTON}`;
  await deleteRowOrColumn(page, controlSelector);
};

export const deleteColumn = async (page: any, atIndex: number) => {
  const controlSelector = `.${tableSelectors.columnControls} .${
    ClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(${atIndex}) .${ClassName.CONTROLS_BUTTON}`;
  await deleteRowOrColumn(page, controlSelector);
};

export const deleteRowOrColumn = async (page: any, controlSelector: string) => {
  await clickFirstCell(page);
  await page.waitForSelector(controlSelector);
  await page.click(controlSelector);
  await page.hover(tableSelectors.deleteButtonSelector);
  await page.waitForSelector(tableSelectors.deleteButtonSelector);
  await page.click(tableSelectors.deleteButtonSelector);
};

type CellSelectorOpts = {
  row: number;
  cell?: number;
  cellType?: 'td' | 'th';
};

export const getSelectorForTableCell = ({
  row,
  cell,
  cellType = 'td',
}: CellSelectorOpts) => {
  const rowSelector = `table tr:nth-child(${row})`;
  if (!cell) {
    return rowSelector;
  }

  return `${rowSelector} > ${cellType}:nth-child(${cell})`;
};

export const splitCells = async (page: any, selector: string) => {
  await page.click(selector);
  await clickCellOptions(page);
  await selectCellOption(page, tableSelectors.splitCellText);
};

export const mergeCells = async (
  page: any,
  firstCell: string,
  lastCell: string,
) => {
  await page.click(firstCell);
  await pressKeyDown(page, 'Shift');
  await page.click(lastCell);
  await pressKeyUp(page, 'Shift');
  await page.waitForSelector(tableSelectors.selectedCell);
  await clickCellOptions(page);
  await selectCellOption(page, tableSelectors.mergeCellsText);
};

export const getSelectorForTableControl = (type: string, atIndex?: number) => {
  let selector = `.pm-table-${type}-controls__button-wrap`;
  if (atIndex) {
    selector += `:nth-child(${atIndex})`;
  }

  return selector;
};

type ResizeColumnOpts = {
  colIdx: number;
  amount: number;
  // Useful if a row has a colspan and you need resize a col it spans over.
  row?: number;
};

export const resizeColumn = async (
  page: any,
  { colIdx, amount, row = 1 }: ResizeColumnOpts,
) => {
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

export const grabResizeHandle = async (
  page: any,
  { colIdx, row = 1 }: { colIdx: number; row: number },
) => {
  let cell = await getBoundingRect(
    page,
    getSelectorForTableCell({ row, cell: colIdx }),
  );

  const columnEndPosition = cell.left + cell.width;

  // Move to the right edge of the cell.
  await page.mouse.move(columnEndPosition, cell.top);

  await page.mouse.down();
};

export const toggleBreakout = async (page: any, times: number) => {
  const timesArray = Array.from({ length: times });

  await page.waitForSelector(tableSelectors.breakoutButton);
  for (let _iter of timesArray) {
    await page.click(tableSelectors.breakoutButton);
  }
};

export const scrollToTable = async (page: any) => {
  await scrollToElement(page, tableSelectors.tableTd, 50);
};

const select = (type: 'row' | 'column' | 'numbered') => async (
  n: number,
  isShiftPressed: boolean = false,
) => {
  // @ts-ignore
  const page = global.page;
  const selector =
    type === 'row'
      ? tableSelectors.nthRowControl(n + 1)
      : type === 'column'
      ? tableSelectors.nthColumnControl(n + 1)
      : tableSelectors.nthNumberedColumnRowControl(n + 1);

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
export const selectRow = select('row');
/**
 * @param n This has `0` based index.
 */
export const selectColumn = select('column');
/**
 * @param n This has `1` based index.
 */
export const selectNumberedColumnRow = select('numbered');
