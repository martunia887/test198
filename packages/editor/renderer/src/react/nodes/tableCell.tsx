import * as React from 'react';
import {
  hexToRgba,
  akEditorTableCellBackgroundOpacity,
} from '@atlaskit/editor-common';

// tslint:disable-next-line:variable-name
const TableCell = props => {
  let style = {};
  if (props.background) {
    // we do this when doing toDOM, so do here as well
    const color = hexToRgba(
      props.background,
      akEditorTableCellBackgroundOpacity,
    );
    style['background-color'] = color;
  }

  if (props.cellType === 'slider') {
    const { value = 0.0 } = props.content[0].content[0].attrs;
    const color = hexToRgba(
      value >= 0.7 ? '#abf5d1' : '#ffbdad',
      akEditorTableCellBackgroundOpacity,
    );
    style['backgroundColor'] = color;
    style['textAlign'] = 'center';
  }

  return (
    <td style={style} rowSpan={props.rowspan} colSpan={props.colspan}>
      {props.children}
    </td>
  );
};

export default TableCell;
