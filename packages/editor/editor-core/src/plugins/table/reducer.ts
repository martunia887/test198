import { DecorationSet } from 'prosemirror-view';
import { TablePluginState, TablePluginAction } from './types';
import { defaultTableSelection } from './pm-plugins/main';

export default (
  pluginState: TablePluginState,
  action: TablePluginAction,
): TablePluginState => {
  switch (action.type) {
    case 'TOGGLE_HEADER_COLUMN':
      return {
        ...pluginState,
        isHeaderColumnEnabled: !pluginState.isHeaderColumnEnabled,
      };

    case 'TOGGLE_HEADER_ROW':
      return {
        ...pluginState,
        isHeaderRowEnabled: !pluginState.isHeaderRowEnabled,
      };

    case 'CLEAR_HOVER_SELECTION':
      return { ...pluginState, ...action.data, ...defaultTableSelection };

    case 'SET_TARGET_CELL_POSITION':
      return { ...pluginState, ...action.data, isContextualMenuOpen: false };

    case 'SET_TABLE_LAYOUT':
      return { ...pluginState, ...action.data };

    case 'TOGGLE_CONTEXTUAL_MENU':
      return {
        ...pluginState,
        isContextualMenuOpen: !pluginState.isContextualMenuOpen,
      };

    case 'SHOW_INSERT_ROW_BUTTON':
      if (
        action.data.insertRowButtonIndex === pluginState.insertRowButtonIndex
      ) {
        return pluginState;
      }

      return {
        ...pluginState,
        ...action.data,
        insertColumnButtonIndex: undefined, // We need to assure that column is not shown
      };

    case 'SHOW_INSERT_COLUMN_BUTTON':
      if (
        action.data.insertColumnButtonIndex ===
        pluginState.insertColumnButtonIndex
      ) {
        return pluginState;
      }
      return {
        ...pluginState,
        ...action.data,
        insertRowButtonIndex: undefined, // We need to assure that row is not shown
      };

    case 'HIDE_INSERT_COLUMN_OR_ROW_BUTTON':
      if (
        pluginState.insertRowButtonIndex !== undefined ||
        pluginState.insertColumnButtonIndex !== undefined
      ) {
        return {
          ...pluginState,
          insertRowButtonIndex: undefined,
          insertColumnButtonIndex: undefined,
        };
      }
      return pluginState;
    case 'ON_BEFORE_REORDERING_START':
      return {
        ...pluginState,
        ...defaultTableSelection,
        decorationSet: DecorationSet.empty,
        insertRowButtonIndex: undefined,
        insertColumnButtonIndex: undefined,
        reordering: action.data.type,
        rowHeights: action.data.rowHeights,
        columnWidths: action.data.columnWidths,
        tableHeight: action.data.tableHeight,
        tableWidth: action.data.tableWidth,
        reorderIndex: action.data.reorderIndex,
        multiReorderIndexes: action.data.multiReorderIndexes,
      };
    case 'ON_REORDERING_END':
      return {
        ...pluginState,
        reordering: undefined,
        rowHeights: undefined,
        columnWidths: undefined,
        tableWidth: undefined,
        tableHeight: undefined,
        reorderIndex: undefined,
        multiReorderIndexes: undefined,
      };

    case 'ADD_RESIZE_HANDLE_DECORATIONS':
    case 'SET_TABLE_REF':
    case 'HOVER_ROWS':
    case 'HOVER_COLUMNS':
    case 'HOVER_TABLE':
    case 'HOVER_CELLS':
    case 'SHOW_RESIZE_HANDLE_LINE':
    case 'HIDE_RESIZE_HANDLE_LINE':
    case 'SET_EDITOR_FOCUS':
      return { ...pluginState, ...action.data };
    default:
      return pluginState;
  }
};
