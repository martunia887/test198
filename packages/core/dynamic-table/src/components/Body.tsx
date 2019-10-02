import React from 'react';
import TableRow from './TableRow';
import withSortedPageRows, {
  WithSortedPageRowsProps,
} from '../hoc/withSortedPageRows';
import { HeadType, RowClickCallback } from '../types';

interface Props extends WithSortedPageRowsProps {
  head?: HeadType;
  highlightedRowIndex?: number;
  isFixedSize: boolean;
  onRowClick?: RowClickCallback;
}

class Body extends React.Component<Props, {}> {
  render() {
    const {
      pageRows,
      head,
      isFixedSize,
      highlightedRowIndex,
      onRowClick,
    } = this.props;

    return (
      <tbody>
        {pageRows.map((row, rowIndex) => (
          <TableRow
            head={head}
            isFixedSize={isFixedSize}
            key={rowIndex} // eslint-disable-line react/no-array-index-key
            row={row}
            isHighlighted={highlightedRowIndex === rowIndex}
            onClick={onRowClick && (e => onRowClick(e, rowIndex))}
          />
        ))}
      </tbody>
    );
  }
}

export default withSortedPageRows<Props>(Body);
