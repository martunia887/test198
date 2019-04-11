import { Node as PmNode } from 'prosemirror-model';

export interface Reference {
  id: string;
  title: string;
  columns?: Array<{
    id: string;
    title: string;
  }>;
}

export interface TableReference {
  id: string;
  title: string;
}

type Events = 'add' | 'update' | 'update:title';

export interface ReferenceProvider {
  getValues: (reference?: string) => Promise<PmNode[]>;
  getReferences: () => Promise<Reference[]>;
  getDocumentId: () => string;

  getTableReferences: () => Promise<Array<TableReference>>;
  addTable: (table: PmNode) => boolean;
  updateTable: (tableId: string, table: PmNode) => boolean;
  getTable: (tableId: string) => PmNode;
  getTables: () => Array<PmNode>;

  on: (eventName: Events, callback: Function) => void;
}
