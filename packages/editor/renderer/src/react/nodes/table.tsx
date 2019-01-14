import * as React from 'react';
import { ReactNode } from 'react';
import { TableLayout } from '@atlaskit/adf-schema';
import {
  calcTableWidth,
  WidthConsumer,
  TableSharedCssClassName,
  tableCellMinWidth,
  akEditorTableNumberColumnWidth,
  akEditorWideLayoutWidth,
  akEditorDefaultLayoutWidth,
} from '@atlaskit/editor-common';
import overflowShadow, { OverflowShadowProps } from '../../ui/overflow-shadow';

export interface TableProps {
  columnWidths?: Array<number>;
  layout: TableLayout;
  isNumberColumnEnabled: boolean;
  children: ReactNode;
  renderWidth: number;
}

interface TableState {
  remappedColWidths?: Array<number>;
}

const isHeaderRowEnabled = rows => {
  if (!rows.length) {
    return false;
  }
  const { children } = rows[0].props;
  for (let i = 0, len = children.length; i < len; i++) {
    if (children[i].type.name === 'TableCell') {
      return false;
    }
  }
  return true;
};

const addNumberColumnIndexes = rows => {
  const headerRowEnabled = isHeaderRowEnabled(rows);
  return React.Children.map(rows, (row, index) => {
    return React.cloneElement(React.Children.only(row), {
      isNumberColumnEnabled: true,
      index: headerRowEnabled ? (index === 0 ? '' : index) : index + 1,
    });
  });
};

const tableLayoutSizes = {
  default: akEditorDefaultLayoutWidth,
  wide: akEditorWideLayoutWidth,
  'full-width': 1800,
};

const shouldRemapCols = (tableWidth, renderWidth, layout) => {
  if (layout === 'full-width') {
    return tableWidth > 1000 || renderWidth < 1000;
  }

  return true;
};

const remapColWidths = (
  columnWidths,
  tableWidth,
  renderWidth,
  zeroBasedCols,
  layout,
) => {
  const isLegacyResizedTable =
    zeroBasedCols > 0 && zeroBasedCols < columnWidths.length;
  if (
    isLegacyResizedTable === false ||
    shouldRemapCols(tableWidth, renderWidth, layout) === false
  ) {
    return;
  }

  const remainingColWidth =
    (tableLayoutSizes[layout] - tableWidth) / zeroBasedCols;

  return columnWidths.map(colWidth => colWidth || remainingColWidth);
};

class Table extends React.Component<
  TableProps & OverflowShadowProps,
  TableState
> {
  originalTableWidth: number = 0;
  legacyResizedTable: boolean;

  constructor(props) {
    super(props);

    if (props.columnWidths.length && props.layout) {
      const zeroBasedCols = props.columnWidths.filter(
        colWidth => colWidth === 0,
      ).length;

      this.originalTableWidth = props.columnWidths.reduce(
        (acc, current) => acc + current,
        0,
      );
      const remappedColWidths = remapColWidths(
        props.columnWidths,
        this.originalTableWidth,
        props.renderWidth,
        zeroBasedCols,
        props.layout,
      );

      this.state = {
        remappedColWidths,
      };

      this.legacyResizedTable =
        zeroBasedCols > 0 &&
        zeroBasedCols < (remappedColWidths || props.columnWidths).length;
    }
  }

  render() {
    const {
      layout,
      handleRef,
      isNumberColumnEnabled,
      children,
      shadowClassNames,
      renderWidth,
    } = this.props;

    const tableWidth = calcTableWidth(layout, renderWidth, false);
    return (
      <div
        className={`${
          TableSharedCssClassName.TABLE_CONTAINER
        } ${shadowClassNames}`}
        data-layout={layout}
        ref={handleRef}
        style={{ width: tableWidth }}
      >
        <div className={TableSharedCssClassName.TABLE_NODE_WRAPPER}>
          <table
            data-number-column={isNumberColumnEnabled}
            data-resized={!!this.originalTableWidth}
          >
            {this.renderColgroup(tableWidth)}
            <tbody>
              {isNumberColumnEnabled
                ? addNumberColumnIndexes(children)
                : children}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  private renderColgroup = tableWidth => {
    const { columnWidths, isNumberColumnEnabled, layout } = this.props;
    const { remappedColWidths } = this.state;

    if (!columnWidths) {
      return null;
    }

    let scale = 1;
    const currentWidth = parseInt(tableWidth, 10);
    let tableOverflowBreakpoint = akEditorDefaultLayoutWidth;
    // If originalTableSize is smaller than breakpoint, use table size as breakpoint.
    if (this.originalTableWidth < currentWidth) {
      tableOverflowBreakpoint = currentWidth;
    }

    if (layout !== 'default' && !this.legacyResizedTable) {
      if (currentWidth > tableOverflowBreakpoint) {
        scale = currentWidth / this.originalTableWidth;
      } else {
        // If our rendering size falls below the breakpoints, we should start overflowing
        // But the table will remain the breakpoint width to avoid snapping.
        scale = tableOverflowBreakpoint / this.originalTableWidth;
      }
    }

    return (
      <colgroup>
        {isNumberColumnEnabled && (
          <col style={{ width: akEditorTableNumberColumnWidth }} />
        )}
        {(remappedColWidths || columnWidths).map((colWidth, idx) => {
          let style;
          if (colWidth) {
            const scaledWidth = Math.floor(colWidth * scale);
            style = { width: `${Math.max(scaledWidth, tableCellMinWidth)}px` };
          }

          return <col key={idx} style={style} />;
        })}
      </colgroup>
    );
  };
}

const TableWithShadows = overflowShadow(Table, {
  overflowSelector: `.${TableSharedCssClassName.TABLE_NODE_WRAPPER}`,
  scrollableSelector: 'table',
});

const TableWithWidth = (props: TableProps) => (
  <WidthConsumer>
    {({ width }) => <TableWithShadows {...props} renderWidth={width} />}
  </WidthConsumer>
);

export default TableWithWidth;
