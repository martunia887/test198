import { ADNode } from '@atlaskit/editor-common';

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

export interface ReferenceProvider {
  getValues: (reference?: string) => Promise<ADNode[]>;
  getReferences: () => Promise<Reference[]>;
  getDocumentId: () => string;

  getTableReferences: () => Promise<Array<TableReference>>;
  addTableReference: (table: TableReference) => void;
}
