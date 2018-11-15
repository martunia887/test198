import { EditorState, Transaction } from 'prosemirror-state';
import { defineMessages } from 'react-intl';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import SettingsIcon from '@atlaskit/icon/glyph/editor/settings';
import EditorTableIcon from '@atlaskit/icon/glyph/editor/table';
import EditorAddonIcon from '@atlaskit/icon/glyph/editor/addon';

import commonMessages from '../../messages';
import { Command } from '../../types';
import {
  analyticsService as analytics,
  AnalyticsProperties,
} from '../../analytics';
import { FloatingToolbarHandler } from '../floating-toolbar/types';
import { TablePluginState } from './types';
import { pluginKey } from './pm-plugins/main';
import {
  hoverTable,
  deleteTable,
  clearHoverSelection,
  toggleHeaderRow,
  toggleHeaderColumn,
  toggleNumberColumn,
  setViewMode,
} from './actions';
import {
  checkIfHeaderRowEnabled,
  checkIfHeaderColumnEnabled,
  checkIfNumberColumnEnabled,
} from './utils';

export const messages = defineMessages({
  tableOptions: {
    id: 'fabric.editor.tableOptions',
    defaultMessage: 'Table options',
    description: 'Opens a menu with additional table options',
  },
  headerRow: {
    id: 'fabric.editor.headerRow',
    defaultMessage: 'Header row',
    description: 'Marks the first table row as a header row',
  },
  headerColumn: {
    id: 'fabric.editor.headerColumn',
    defaultMessage: 'Header column',
    description: 'Marks the first table column as a header row',
  },
  numberedColumn: {
    id: 'fabric.editor.numberedColumn',
    defaultMessage: 'Numbered column',
    description: 'Adds an auto-numbering column to your table',
  },
});

const withAnalytics = (
  command: Command,
  eventName: string,
  properties?: AnalyticsProperties,
) => (state: EditorState, dispatch: (tr: Transaction) => void) => {
  analytics.trackEvent(eventName, properties);
  return command(state, dispatch);
};

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
) => {
  const tableState: TablePluginState | undefined = pluginKey.getState(state);
  if (
    tableState &&
    tableState.tableRef &&
    tableState.tableNode &&
    tableState.pluginConfig
  ) {
    const { pluginConfig } = tableState;
    const isFormViewEnabled = tableState.tableNode.attrs.viewMode === 'form';

    return {
      title: 'Table floating controls',
      getDomRef: () => tableState.tableFloatingToolbarTarget!,
      nodeType: state.schema.nodes.table,
      items: [
        {
          type: 'dropdown',
          title: formatMessage(messages.tableOptions),
          icon: SettingsIcon,
          hidden:
            isFormViewEnabled ||
            !(pluginConfig.allowHeaderRow && pluginConfig.allowHeaderColumn),
          options: [
            {
              title: formatMessage(messages.headerRow),
              onClick: withAnalytics(
                toggleHeaderRow,
                'atlassian.editor.format.table.toggleHeaderRow.button',
              ),
              selected: checkIfHeaderRowEnabled(state),
              hidden: !pluginConfig.allowHeaderRow,
            },
            {
              title: formatMessage(messages.headerColumn),
              onClick: withAnalytics(
                toggleHeaderColumn,
                'atlassian.editor.format.table.toggleHeaderColumn.button',
              ),
              selected: checkIfHeaderColumnEnabled(state),
              hidden: !pluginConfig.allowHeaderColumn,
            },
            {
              title: formatMessage(messages.numberedColumn),
              selected: checkIfNumberColumnEnabled(state),
              onClick: withAnalytics(
                toggleNumberColumn,
                'atlassian.editor.format.table.toggleNumberColumn.button',
              ),
              hidden: !pluginConfig.allowNumberColumn,
            },
          ],
        },
        {
          type: 'separator',
          hidden:
            isFormViewEnabled ||
            !(
              pluginConfig.allowBackgroundColor &&
              pluginConfig.allowHeaderRow &&
              pluginConfig.allowHeaderColumn &&
              pluginConfig.allowMergeCells
            ),
        },
        {
          type: 'button',
          icon: EditorTableIcon,
          onClick: setViewMode('table'),
          title: 'Table view',
          selected: !isFormViewEnabled,
        },
        {
          type: 'button',
          icon: EditorAddonIcon,
          onClick: setViewMode('form'),
          title: 'Form view',
          selected: isFormViewEnabled,
        },
        {
          type: 'separator',
          hidden: !(
            pluginConfig.allowBackgroundColor &&
            pluginConfig.allowHeaderRow &&
            pluginConfig.allowHeaderColumn &&
            pluginConfig.allowMergeCells
          ),
        },
        {
          type: 'button',
          appearance: 'danger',
          icon: RemoveIcon,
          onClick: deleteTable,
          onMouseEnter: hoverTable(true),
          onMouseLeave: clearHoverSelection,
          title: formatMessage(commonMessages.remove),
        },
      ],
    };
  }
};
