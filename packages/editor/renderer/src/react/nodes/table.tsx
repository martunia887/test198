import * as React from 'react';
import { ReactNode } from 'react';
import { TableLayout } from '@atlaskit/adf-schema';
import {
  calcTableWidth,
  WidthConsumer,
  TableSharedCssClassName,
  tableCellMinWidth,
  akEditorTableNumberColumnWidth,
  akEditorDefaultLayoutWidth as tableOverflowBreakpoint,
} from '@atlaskit/editor-common';
import overflowShadow, { OverflowShadowProps } from '../../ui/overflow-shadow';

export interface TableProps {
  columnWidths?: Array<number>;
  layout: TableLayout;
  isNumberColumnEnabled: boolean;
  children: ReactNode;
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

class Table extends React.Component<TableProps & OverflowShadowProps> {
  originalTableWidth: number = 0;
  legacyResizedTable: boolean;

  constructor(props) {
    super(props);

    if (props.columnWidths.length && props.layout) {
      let zeroWidthCols: Array<number> = [];
      this.originalTableWidth = props.columnWidths.reduce((acc, current) => {
        if (current === 0) {
          zeroWidthCols.push(current);
        }
        return acc + current;
      }, 0);

      this.legacyResizedTable =
        zeroWidthCols.length > 0 &&
        zeroWidthCols.length < props.columnWidths.length;
    }
  }

  render() {
    const {
      layout,
      handleRef,
      isNumberColumnEnabled,
      children,
      shadowClassNames,
    } = this.props;
    return (
      <WidthConsumer>
        {({ width }) => {
          const tableWidth = calcTableWidth(layout, width, false);
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
                  data-legacy-resize={this.legacyResizedTable}
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
        }}
      </WidthConsumer>
    );
  }

  private renderColgroup = tableWidth => {
    const { columnWidths, isNumberColumnEnabled, layout } = this.props;

    if (!columnWidths) {
      return null;
    }

    let scale = 1;
    const currentWidth = parseInt(tableWidth, 10);
    // TODO if originalTableSize is smaller than breakpoint, use table size as breakpoint.
    if (layout !== 'default') {
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
        {columnWidths.map((colWidth, idx) => {
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

export default overflowShadow(Table, {
  overflowSelector: `.${TableSharedCssClassName.TABLE_NODE_WRAPPER}`,
  scrollableSelector: 'table',
});
