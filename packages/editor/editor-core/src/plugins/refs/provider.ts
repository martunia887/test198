import { ADNode } from '@atlaskit/editor-common';

export interface Reference {
  id: string;
  title: string;
  columns?: {
    id: string;
    title: string;
  };
}

export interface ReferenceProvider {
  getValues: (reference?: string) => Promise<ADNode[]>;
  getReferences: () => Promise<Reference[]>;
  getDocumentId: () => string;
}
