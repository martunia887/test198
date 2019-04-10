import * as React from 'react';
import { tableEditing } from 'prosemirror-tables';
import { createTable } from 'prosemirror-utils';
import { Node as PMNode, Schema } from 'prosemirror-model';
import { tableCellMinWidth } from '@atlaskit/editor-common';
import { table, tableCell, tableHeader, tableRow } from '@atlaskit/adf-schema';

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
    quickInsert: ({ formatMessage }) => {
      const customTableType: QuickInsertItem[] = [
        {
          title: 'OKR detail',
          description: 'by Agnes Ro',
          icon: () => (
            <IconLiveTable label={formatMessage(messages.summaryTable)} />
          ),
          action(insert, state) {
            const table = (state.schema as Schema).nodeFromJSON(okrTable);
            return insert(table);
          },
          keywords: ['table'],
        },
      ];

      return [
        ...customTableType,
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
        {
          title: formatMessage(messages.summaryTable),
          description: formatMessage(messages.summaryTableDescription),
          priority: 601,
          icon: () => (
            <IconSummaryTable label={formatMessage(messages.summaryTable)} />
          ),
          action(insert, state) {
            const tables: Array<PMNode> = [
              PMNode.fromJSON(state.schema, {
                type: 'table',
                attrs: {
                  isNumberColumnEnabled: false,
                  layout: 'default',
                  __autoSize: false,
                  id: 'b886a638-0e9b-4c1f-be5c-93d4a58a95f1',
                  title: null,
                },
                content: [
                  {
                    type: 'tableRow',
                    attrs: { isFiltered: false },
                    content: [
                      {
                        type: 'tableHeader',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          id: 'b24f51f0-7b76-4bea-a1bc-bcff6a156748',
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Foo' }],
                          },
                        ],
                      },
                      {
                        type: 'tableCell',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          id: '9271840a-5bdc-46d3-b1f8-52cf4bfa3c54',
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Three' }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'tableRow',
                    attrs: { isFiltered: false },
                    content: [
                      {
                        type: 'tableHeader',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          id: 'fe752373-b5a2-4091-af9c-bced1e06920b',
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Bar' }],
                          },
                        ],
                      },
                      {
                        type: 'tableCell',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          id: '884edda6-0089-411d-a737-8d825f7cba57',
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'One' }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'tableRow',
                    attrs: { isFiltered: false },
                    content: [
                      {
                        type: 'tableHeader',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          id: 'e66e1392-7aba-498b-a3dc-e9afd977104b',
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Baz' }],
                          },
                        ],
                      },
                      {
                        type: 'tableCell',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          id: 'bf976def-aefa-4bb7-8eb1-1bd80416d1be',
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Two' }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              }),
              PMNode.fromJSON(state.schema, {
                type: 'table',
                attrs: {
                  isNumberColumnEnabled: false,
                  layout: 'default',
                  __autoSize: false,
                  id: '5b83932f-c52b-4801-b3af-a050c9128b20',
                  title: null,
                },
                content: [
                  {
                    type: 'tableRow',
                    attrs: { isFiltered: false },
                    content: [
                      {
                        type: 'tableHeader',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Alex' }],
                          },
                        ],
                      },
                      {
                        type: 'tableCell',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Bravo' }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'tableRow',
                    attrs: { isFiltered: false },
                    content: [
                      {
                        type: 'tableHeader',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Foo' }],
                          },
                        ],
                      },
                      {
                        type: 'tableCell',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Five' }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'tableRow',
                    attrs: { isFiltered: false },
                    content: [
                      {
                        type: 'tableHeader',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Baz' }],
                          },
                        ],
                      },
                      {
                        type: 'tableCell',
                        attrs: {
                          colspan: 1,
                          rowspan: 1,
                          colwidth: null,
                          background: null,
                          reference: null,
                          isFormatted: false,
                          formatting: null,
                          filter: null,
                          sort: null,
                        },
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'emoji',
                                attrs: {
                                  shortName: ':slight_smile:',
                                  id: '1f642',
                                  text: '🙂',
                                },
                              },
                              { type: 'text', text: ' ' },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              }),
            ];
            const tr = insert(insertSummaryTable(tables, state));
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
