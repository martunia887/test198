import { Schema, Slice } from 'prosemirror-model';
import { mapSlice } from '../../../../utils/slice';
import { CellAttributes } from '@atlaskit/adf-schema';

export const transformSliceRemoveCellBackgroundColor = (
  slice: Slice,
  schema: Schema,
): Slice => {
  const { tableCell, tableHeader } = schema.nodes;
  return mapSlice(slice, maybeCell => {
    if (maybeCell.type === tableCell || maybeCell.type === tableHeader) {
      const cellAttrs: CellAttributes = { ...maybeCell.attrs };
      cellAttrs.background = undefined;
      return maybeCell.type.createChecked(
        cellAttrs,
        maybeCell.content,
        maybeCell.marks,
      );
    }
    return maybeCell;
  });
};
