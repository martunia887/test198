import { Transaction } from 'prosemirror-state';
import { findTable } from 'prosemirror-utils';

export const dismissTypeAhead = (tr: Transaction) => {
  const table = findTable(tr.selection);
  if (table) {
    const { schema } = tr.doc.type;
    const { typeAheadQuery, emojiQuery } = schema.marks;
    table.node.descendants((node, pos) => {
      if (
        node.type === schema.nodes.text &&
        node.marks.find(
          mark => mark.type === emojiQuery || mark.type === typeAheadQuery,
        )
      ) {
        tr.delete(
          tr.mapping.map(table.start + pos),
          tr.mapping.map(table.start + pos + node.nodeSize),
        );
      }
    });
  }

  return tr;
};
