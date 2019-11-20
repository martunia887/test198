import { Schema, Slice } from 'prosemirror-model';
import { mapSlice } from '../../../../utils/slice';

export const transformSliceToRemoveColumnsWidths = (
  slice: Slice,
  schema: Schema,
): Slice => {
  const { tableHeader, tableCell } = schema.nodes;

  return mapSlice(slice, maybeCell => {
    if (maybeCell.type === tableCell || maybeCell.type === tableHeader) {
      if (!maybeCell.attrs.colwidth) {
        return maybeCell;
      }
      return maybeCell.type.createChecked(
        { ...maybeCell.attrs, colwidth: undefined },
        maybeCell.content,
        maybeCell.marks,
      );
    }
    return maybeCell;
  });
};
