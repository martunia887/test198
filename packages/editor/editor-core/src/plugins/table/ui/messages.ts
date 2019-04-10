import { defineMessages } from 'react-intl';

export default defineMessages({
  insertColumn: {
    id: 'fabric.editor.insertColumn',
    defaultMessage: 'Insert column',
    description: 'Add a new column to your table.',
  },
  removeColumns: {
    id: 'fabric.editor.removeColumns',
    defaultMessage: 'Remove {0, plural, one {column} other {columns}}',
    description: 'Deletes a table column.',
  },
  insertRow: {
    id: 'fabric.editor.insertRow',
    defaultMessage: 'Insert row',
    description: 'Add a new row to your table.',
  },
  removeRows: {
    id: 'fabric.editor.removeRows',
    defaultMessage: 'Remove {0, plural, one {row} other {rows}}',
    description: 'Deletes a table row.',
  },
  cellOptions: {
    id: 'fabric.editor.cellOptions',
    defaultMessage: 'Cell options',
    description: 'Opens a menu with options for the current table cell.',
  },
  reference: {
    id: 'fabric.editor.reference',
    defaultMessage: 'Live data',
    description: 'Links a column to records from another table',
  },
  formatting: {
    id: 'fabric.editor.formatting',
    defaultMessage: 'Format',
    description: 'Applies formatting rules to your table',
  },
  filter: {
    id: 'fabric.editor.filter',
    defaultMessage: 'Filter',
    description: 'Applies filtering rules to your table',
  },
  sort: {
    id: 'fabric.editor.sort',
    defaultMessage: 'Sort',
    description: 'Sort your table',
  },
});
