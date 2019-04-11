import { Node as PmNode } from 'prosemirror-model';
import { uuid } from '@atlaskit/adf-schema';
import { ReferenceProvider } from '../../src/plugins/refs/provider';

const mem: { [key: string]: PmNode } = {};
const handlers = { 'update:title': [] };

const referenceProvider: ReferenceProvider = {
  on: (eventName, callback) => {
    (handlers as any)[eventName].push(callback);
  },

  getTableReferences: async () => {
    return Object.keys(mem).map(id => ({
      id,
      title: mem[id].attrs.title || 'Untitled',
    }));
  },

  addTable: (table: PmNode) => {
    console.log(
      `%c addTable: ${table.attrs.id}`,
      'color: green; font-weight: bold;',
    );
    mem[table.attrs.id] = table;
    return true;
  },

  updateTable: (tableId: string, table: PmNode) => {
    console.log(
      `%c updateTable: ${table.attrs.id}. title: ${table.attrs.title}`,
      'color: yellow; font-weight: bold;',
    );

    if (mem[tableId]) {
      const oldTable = mem[tableId];
      mem[tableId] = table;
      if (oldTable.attrs.title !== table.attrs.title) {
        handlers['update:title'].forEach((fn: any) => fn());
      }
      return true;
    }
    return false;
  },

  getTable: (tableId: string) => {
    return mem[tableId];
  },

  getReferences: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: Fix the type
        resolve({} as any);
      }, 1000);
    });
  },

  getValues: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({} as any);
      }, 1000);
    });
  },
  getDocumentId: () => {
    const docId = localStorage.getItem('fabric.editor.docId');
    if (docId) {
      return docId;
    }
    const newDocId = uuid.generate() as string;
    localStorage.setItem('fabric.editor.docId', newDocId);
    return newDocId;
  },
};

export default referenceProvider;
