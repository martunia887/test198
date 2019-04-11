import * as React from 'react';
import { tableEditing } from 'prosemirror-tables';
import { createTable } from 'prosemirror-utils';
import { tableCellMinWidth } from '@atlaskit/editor-common';
import {
  table,
  tableCell,
  tableHeader,
  tableRow,
  uuid,
} from '@atlaskit/adf-schema';

import LayoutButton from './ui/LayoutButton';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { PluginConfig, PermittedLayoutsDescriptor } from './types';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { keymapPlugin } from './pm-plugins/keymap';
import {
  createPlugin as createFlexiResizingPlugin,
  pluginKey as tableResizingPluginKey,
} from './pm-plugins/table-resizing';
import { getToolbarConfig } from './toolbar';
import { ColumnResizingPlugin } from './types';
import FloatingContextualMenu from './ui/FloatingContextualMenu';
import FormattingMenu from './ui/FormattingMenu';
import RefsMenu from './ui/RefsMenu';
import FilterMenu from './ui/FilterMenu';
import { isLayoutSupported } from './utils';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
  EVENT_TYPE,
} from '../analytics';
import { tooltip, toggleTable } from '../../keymaps';
import {
  IconTable,
  IconSummaryTable,
  IconLiveTable,
} from '../quick-insert/assets';
import { pluginKey as referencePluginKey } from '../refs/pm-plugins/main';
import { QuickInsertItem } from '../quick-insert/types';
import { insertSummaryTable } from './actions';
import okrTable from './shipit.adf.json';
import { processRawValue } from '../../utils';
import { ReferenceProvider } from '../refs/provider';

export const HANDLE_WIDTH = 6;

export const pluginConfig = (tablesConfig?: PluginConfig | boolean) => {
  const config =
    !tablesConfig || typeof tablesConfig === 'boolean' ? {} : tablesConfig;
  return config.advanced
    ? {
        allowBackgroundColor: true,
        allowColumnResizing: true,
        allowHeaderColumn: true,
        allowHeaderRow: true,
        allowMergeCells: true,
        allowNumberColumn: true,
        stickToolbarToBottom: true,
        permittedLayouts: 'all' as PermittedLayoutsDescriptor,
        allowControls: true,
        ...config,
      }
    : config;
};

const tablesPlugin = (options?: PluginConfig | boolean): EditorPlugin => ({
  nodes() {
    return [
      { name: 'table', node: table },
      { name: 'tableHeader', node: tableHeader },
      { name: 'tableRow', node: tableRow },
      { name: 'tableCell', node: tableCell },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'table',
        plugin: ({ props, eventDispatcher, dispatch, portalProviderAPI }) => {
          const {
            allowTables,
            appearance,
            allowDynamicTextSizing,
            fullWidthMode,
          } = props;
          const isContextMenuEnabled = appearance !== 'mobile';
          const isBreakoutEnabled = !fullWidthMode;
          return createPlugin(
            dispatch,
            portalProviderAPI,
            eventDispatcher,
            pluginConfig(allowTables),
            isContextMenuEnabled,
            allowDynamicTextSizing && !fullWidthMode,
            isBreakoutEnabled,
          );
        },
      },
      {
        name: 'tablePMColResizing',
        plugin: ({
          dispatch,
          props: { allowTables, allowDynamicTextSizing, fullWidthMode },
        }) => {
          const { allowColumnResizing } = pluginConfig(allowTables);
          return allowColumnResizing
            ? createFlexiResizingPlugin(dispatch, {
                handleWidth: HANDLE_WIDTH,
                cellMinWidth: tableCellMinWidth,
                dynamicTextSizing: allowDynamicTextSizing && !fullWidthMode,
              } as ColumnResizingPlugin)
            : undefined;
        },
      },
      // Needs to be lower priority than prosemirror-tables.tableEditing
      // plugin as it is currently swallowing backspace events inside tables
      { name: 'tableKeymap', plugin: () => keymapPlugin() },
      { name: 'tableEditing', plugin: () => tableEditing() },
    ];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    appearance,
  }) {
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
          tableResizingPluginState: tableResizingPluginKey,
          referencePluginState: referencePluginKey,
        }}
        render={_ => {
          const { state } = editorView;
          const pluginState = pluginKey.getState(state);
          const tableResizingPluginState = tableResizingPluginKey.getState(
            state,
          );
          const referencePluginState = referencePluginKey.getState(state);
          return (
            <>
              <FloatingContextualMenu
                editorView={editorView}
                mountPoint={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                targetCellPosition={pluginState.targetCellPosition}
                isOpen={pluginState.isContextualMenuOpen}
                pluginConfig={pluginState.pluginConfig}
              />
              {appearance === 'full-page' && isLayoutSupported(state) && (
                <LayoutButton
                  editorView={editorView}
                  mountPoint={popupsMountPoint}
                  boundariesElement={popupsBoundariesElement}
                  scrollableElement={popupsScrollableElement}
                  targetRef={pluginState.tableFloatingToolbarTarget}
                  isResizing={
                    !!tableResizingPluginState &&
                    !!tableResizingPluginState.dragging
                  }
                />
              )}
              {referencePluginState.provider && (
                <RefsMenu
                  editorView={editorView}
                  mountPoint={popupsMountPoint}
                  boundariesElement={popupsBoundariesElement}
                  targetCellPosition={pluginState.targetCellPosition}
                  isOpen={pluginState.isReferenceMenuOpen}
                  provider={referencePluginState.provider}
                />
              )}
              <FormattingMenu
                editorView={editorView}
                mountPoint={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                targetCellPosition={pluginState.targetCellPosition}
                isOpen={pluginState.isFormattingMenuOpen}
              />
              <FilterMenu
                editorView={editorView}
                mountPoint={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                targetCellPosition={pluginState.targetCellPosition}
                isOpen={pluginState.isFilterMenuOpen}
              />
            </>
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }, setItems, providerFactory) => {
      const providerHandler = async (
        _: string,
        $provider: Promise<ReferenceProvider>,
      ) => {
        const provider = await $provider;
        provider.on('update:title', async () => {
          const refs = await provider.getTableReferences();
          setItems(
            'alexIsKing',
            refs.map(ref => {
              return {
                title: ref.title,
                description: 'by Agnes Ro',
                icon: () => (
                  <IconLiveTable label={formatMessage(messages.summaryTable)} />
                ),
                action: (insert: any) => {
                  const table = provider.getTable(ref.id);
                  const newTable = table.copy(table.content);
                  newTable.attrs.id = uuid.generate();
                  provider.addTable(newTable);
                  return insert(newTable);
                },
                keywords: ['table'],
              };
            }),
          );
        });

        setItems('nathanIsKing', [
          {
            title: formatMessage(messages.summaryTable),
            description: formatMessage(messages.summaryTableDescription),
            priority: 601,
            icon: () => (
              <IconSummaryTable label={formatMessage(messages.summaryTable)} />
            ),
            action(insert, state) {
              const tables = provider.getTables();
              const tr = insert(insertSummaryTable(tables, state));
              return tr;
            },
            keywords: ['table'],
          },
        ]);
      };

      providerFactory.subscribe('referenceProvider', providerHandler as any);

      return [
        {
          title: formatMessage(messages.table),
          description: formatMessage(messages.tableDescription),
          priority: 600,
          keyshortcut: tooltip(toggleTable),
          icon: () => <IconTable label={formatMessage(messages.table)} />,
          action(insert, state) {
            const tr = insert(createTable(state.schema));
            return addAnalytics(tr, {
              action: ACTION.INSERTED,
              actionSubject: ACTION_SUBJECT.DOCUMENT,
              actionSubjectId: ACTION_SUBJECT_ID.TABLE,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.TRACK,
            });
          },
        },
      ];
    },
    floatingToolbar: getToolbarConfig,
  },
});

export default tablesPlugin;
