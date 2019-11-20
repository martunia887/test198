import { Node as PMNode, Schema, Slice } from 'prosemirror-model';
import { mapSlice } from '../../../../utils/slice';

export const transformSliceToAddTableHeaders = (
  slice: Slice,
  schema: Schema,
): Slice => {
  const { table, tableHeader, tableRow } = schema.nodes;

  return mapSlice(slice, maybeTable => {
    if (maybeTable.type === table) {
      const firstRow = maybeTable.firstChild;
      if (firstRow) {
        const headerCols = [] as PMNode[];
        firstRow.forEach(oldCol => {
          headerCols.push(
            tableHeader.createChecked(
              oldCol.attrs,
              oldCol.content,
              oldCol.marks,
            ),
          );
        });
        const headerRow = tableRow.createChecked(
          firstRow.attrs,
          headerCols,
          firstRow.marks,
        );
        return maybeTable.copy(maybeTable.content.replaceChild(0, headerRow));
      }
    }
    return maybeTable;
  });
};
