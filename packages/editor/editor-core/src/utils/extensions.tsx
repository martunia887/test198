import * as React from 'react';
import Loadable from 'react-loadable';
import {
  ExtensionProvider,
  combineProviders,
  getItemsFromModule,
  resolveImport,
} from '@atlaskit/editor-common';
import {
  QuickInsertProvider,
  QuickInsertItem,
} from '../plugins/quick-insert/types';
import { EditorActions } from '../';

export async function extensionProviderToQuickInsertProvider(
  extensionProvider: ExtensionProvider,
  editorActions: EditorActions,
): Promise<QuickInsertProvider> {
  const extensions = await extensionProvider.getExtensions();

  return {
    getItems: () => {
      const quickInsertItems = getItemsFromModule<QuickInsertItem>(
        extensions,
        'quickInsert',
        item => {
          const Icon = Loadable<{ label: string }, any>({
            loader: item.icon,
            loading: () => null,
          });

          return {
            title: item.title,
            description: item.description,
            icon: () => <Icon label={item.title} />,
            action: insert => {
              if (typeof item.node === 'function') {
                resolveImport(item.node()).then(node => {
                  editorActions.replaceSelection(node);
                });
                return insert('');
              } else {
                return insert(item.node);
              }
            },
          };
        },
      );

      return Promise.all(quickInsertItems);
    },
  };
}

export async function combineQuickInsertProviders(
  quickInsertProviders: Array<
    QuickInsertProvider | Promise<QuickInsertProvider>
  >,
): Promise<QuickInsertProvider> {
  const { invokeList } = combineProviders<QuickInsertProvider>(
    quickInsertProviders,
  );

  return {
    getItems() {
      return invokeList('getItems');
    },
  };
}
