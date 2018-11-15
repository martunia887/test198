import {
  EditorState,
  Plugin,
  PluginKey,
  Transaction,
  NodeSelection,
  Selection,
} from 'prosemirror-state';
import { Node as PMNode, Fragment } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import {
  isCellSelection,
  findParentNodeOfTypeClosestToPos,
  getCellsInColumn,
  findDomRefAtPos,
  findCellClosestToPos,
} from 'prosemirror-utils';
import { CellType } from '@atlaskit/editor-common';
import { pluginKey as datePluginKey } from '../../date/plugin';
import { Cell, TableCssClassName as ClassName } from '../types';
import { Dispatch } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { Command } from '../../../types';
import { pluginKey as tablePluginKey } from './main';
import { sliderNodeViewFactory } from '../nodeviews/slider';
import { createSingleSelectView } from '../nodeviews/single-select';

export const pluginKey = new PluginKey('tableColumnTypesPlugin');

export interface PluginState {
  // clicked cell needed to position cellType dropdowns (date, emoji, mention, link)
  clickedCell?: Cell;
  // index of the column where column types menu button was clicked
  columnIndex?: number;
  isMenuOpen?: boolean;
  selectMenuType?: CellType;
}

export const createColumnTypesPlugin = (
  dispatch: Dispatch,
  portalProviderAPI: PortalProviderAPI,
) =>
  new Plugin({
    key: pluginKey,

    state: {
      init: (): PluginState => ({
        clickedCell: undefined,
      }),
      apply(tr: Transaction, _pluginState: PluginState, _, state: EditorState) {
        let pluginState = { ..._pluginState };

        if (tr.docChanged && pluginState.clickedCell) {
          const { pos, deleted } = tr.mapping.mapResult(
            pluginState.clickedCell.pos,
          );
          pluginState = {
            ...pluginState,
            clickedCell: deleted
              ? undefined
              : findCellClosestToPos(tr.doc.resolve(pos)),
          };
          dispatch(pluginKey, pluginState);
        }

        const meta = tr.getMeta(pluginKey) as PluginState | undefined;
        if (meta !== undefined) {
          const nextState = {
            ...pluginState,
            ...meta,
          };
          dispatch(pluginKey, nextState);
          return nextState;
        }

        return pluginState;
      },
    },

    props: {
      nodeViews: {
        slider: sliderNodeViewFactory(portalProviderAPI),
        singleSelect: createSingleSelectView(portalProviderAPI),
      },

      handleDOMEvents: {
        mousedown(view: EditorView, event: MouseEvent) {
          const { state, dispatch } = view;
          const { tableRef } = tablePluginKey.getState(state);
          const posAtCoords = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (
            !tableRef ||
            isCellSelection(view.state.selection) ||
            !posAtCoords
          ) {
            return setClickedCell(undefined)(state, dispatch);
          }
          const $pos = state.doc.resolve(posAtCoords.pos);
          const cell = findParentNodeOfTypeClosestToPos($pos, [
            state.schema.nodes.tableCell,
          ]);
          if (
            !cell ||
            [
              'date',
              'mention',
              'checkbox',
              'emoji',
              'slider',
              'person',
              'single-select',
              'multi-select',
              'radio-select',
              'status-select',
            ].indexOf(cell.node.attrs.cellType) === -1
          ) {
            return setClickedCell(undefined)(state, dispatch);
          }
          event.preventDefault();
          return setClickedCell(cell)(state, dispatch);
        },
      },
    },
  });

export const setClickedCell = (clickedCell?: Cell): Command => (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean => {
  const pluginState = pluginKey.getState(state);
  if (
    pluginState.clickedCell === clickedCell ||
    (clickedCell && clickedCell.node.type === state.schema.nodes.tableHeader)
  ) {
    return false;
  }
  let { tr } = state;
  tr.setMeta(pluginKey, {
    ...pluginState,
    clickedCell,
  });

  // insert mention on click on cellType="mention"
  if (clickedCell && clickedCell.node.attrs.cellType === 'mention') {
    const mark = state.schema.mark('mentionQuery', { active: true });
    const query = state.schema.text('@', [mark]);
    tr = setCellContent(query, clickedCell)(tr);
  }

  // insert emoji on click on cellType="emoji"
  if (clickedCell && clickedCell.node.attrs.cellType === 'emoji') {
    const mark = state.schema.mark('emojiQuery');
    const query = state.schema.text(':', [mark]);
    tr = setCellContent(query, clickedCell)(tr);
  }

  // cellType="date"
  if (clickedCell && clickedCell.node.attrs.cellType === 'date') {
    // insert today's date if cell is empty
    if (clickedCell.node.nodeSize === 4) {
      const currentDate = new Date();
      const timestamp = Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      ).toString();
      const node = state.schema.nodes.date.createChecked({ timestamp });
      tr = setCellContent(node, clickedCell)(tr);
    }
    tr.setSelection(NodeSelection.create(tr.doc, clickedCell.pos + 1)).setMeta(
      datePluginKey,
      { showDatePickerAt: clickedCell.pos + 2 },
    );
  }

  if (clickedCell && clickedCell.node.attrs.cellType === 'checkbox') {
    if (clickedCell.node.nodeSize === 4) {
      const query = state.schema.text('✅');
      tr = setCellContent(query, clickedCell)(tr);
    } else {
      tr = setCellContent([], clickedCell)(tr);
    }
  }

  dispatch(tr);

  return true;
};

export const setCellContent = (nodes: PMNode | PMNode[], clickedCell: Cell) => (
  tr: Transaction,
) => {
  const { pos, start } = clickedCell;
  const { paragraph } = clickedCell.node.type.schema.nodes;
  const content = Fragment.from(nodes);
  const newCell = clickedCell.node.type.create(
    clickedCell.node.attrs,
    paragraph.create({}, content),
  );

  return tr
    .replaceWith(pos, pos + clickedCell.node.nodeSize, newCell)
    .setSelection(Selection.near(tr.doc.resolve(start + content.size + 1)));
};

export const getColumnTypesButtonRef = (columnIndex: number) => (
  view: EditorView,
): HTMLElement | undefined => {
  const cells = getCellsInColumn(columnIndex)(view.state.selection);
  if (cells) {
    const firstCell = cells[0];
    const { tableHeader } = view.state.schema.nodes;
    if (firstCell && firstCell.node.type === tableHeader) {
      const domAtPos = view.domAtPos.bind(view);
      const cellRef = findDomRefAtPos(cells[0].pos, domAtPos) as HTMLElement;
      if (cellRef) {
        return cellRef.querySelector(
          `.${ClassName.CELL_NODEVIEW_COLUMN_TYPES_BUTTON}`,
        ) as HTMLElement;
      }
    }
  }
};

export const setColumnType = (
  columnIndex: number,
  cellType: CellType,
  content: PMNode,
): Command => (state, dispatch) => {
  const cells = getCellsInColumn(columnIndex)(state.selection);
  if (!cells) {
    return false;
  }
  const { tr } = state;
  const { tableHeader, paragraph } = state.schema.nodes;

  cells.forEach(cell => {
    let cellContent;
    if (cell.node.type === tableHeader) {
      cellContent = paragraph.createAndFill();
    } else if (
      (cellType === 'number' || cellType === 'currency') &&
      cell.node.child(0).type.name === 'paragraph' &&
      `${parseInt(cell.node.textContent, 10)}` === cell.node.textContent
    ) {
      cellContent = cell.node.content;
    } else {
      cellContent = content;
    }

    const newCell = cell.node.type.create(
      { ...cell.node.attrs, cellType },
      cellContent,
    );

    tr.replaceWith(
      tr.mapping.map(cell.pos),
      tr.mapping.map(cell.pos + cell.node.nodeSize),
      newCell,
    );
  });

  if (cells[1]) {
    const newSelection = Selection.findFrom(
      tr.doc.resolve(tr.mapping.map(cells[1].pos)),
      1,
      true,
    );
    if (newSelection) {
      tr.setSelection(newSelection);
    }
  }

  dispatch(tr);

  return true;
};
