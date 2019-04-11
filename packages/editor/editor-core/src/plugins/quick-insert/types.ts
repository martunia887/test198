import { InjectedIntl } from 'react-intl';
import { EditorState, Transaction } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { ProviderFactory } from '@atlaskit/editor-common';
import { TypeAheadItem } from '../type-ahead/types';

export type QuickInsertActionInsert = (
  node?: Node | Object | string,
  opts?: { selectInlineNode?: boolean },
) => Transaction;

export type QuickInsertItem = TypeAheadItem & {
  keywords?: Array<string>;
  priority?: number;
  action: (
    insert: QuickInsertActionInsert,
    state: EditorState,
  ) => Transaction | false;
};

export type QuickInsertProvider = {
  getItems: () => Promise<Array<QuickInsertItem>>;
};

export type QuickInsertOptions =
  | boolean
  | {
      provider: Promise<QuickInsertProvider>;
    };

export type QuickInsertHandler =
  | Array<QuickInsertItem>
  | ((
      intl: InjectedIntl,
      setItems: SetQuickInsertItems,
      providerFactory: ProviderFactory,
    ) => Array<QuickInsertItem>);

export type IconProps = {
  label?: string;
};

export type SetQuickInsertItems = (
  id: string,
  items: QuickInsertItem[],
) => void;
