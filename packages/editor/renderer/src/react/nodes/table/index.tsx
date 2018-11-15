import * as React from 'react';
import { Component } from 'react';
import {
  calcTableWidth,
  WidthConsumer,
  TableSharedCssClassName,
  TableLayout,
  ProviderFactory,
  WithProviders,
} from '@atlaskit/editor-common';

import overflowShadow, {
  OverflowShadowProps,
} from '../../../ui/overflow-shadow';

import FormView from './FormView';
import Summary from './Summary';

export { OverflowShadowProps };
export interface TableProps extends OverflowShadowProps {
  columnWidths?: Array<number>;
  layout: TableLayout;
  isNumberColumnEnabled: boolean;
  children: React.ReactChildren;
  viewMode: 'table' | 'form';
  content: Array<any>;
  localId: string;
  providers?: ProviderFactory;
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

class Table extends Component<TableProps> {
  state = { checkboxStates: {} };

  constructor(props) {
    super(props);
  }

  render() {
    const { providers } = this.props;
    if (!providers) {
      return null;
    }

    return (
      <WithProviders
        providers={['formProvider']}
        providerFactory={providers}
        renderNode={this.renderTable}
      />
    );
  }

  renderTable = (providers: { formProvider?: any } = {}) => {
    const { props } = this;

    if (
      props.viewMode === 'form' &&
      providers.formProvider &&
      !providers.formProvider.formSubmitted(props.localId)
    ) {
      return <FormView {...props} />;
    }

    const colgroup = props.columnWidths ? (
      <colgroup>
        {props.columnWidths.map((colWidth, idx) => {
          const style = colWidth ? { width: `${colWidth}px` } : {};
          return <col key={idx} style={style} />;
        })}
      </colgroup>
    ) : null;

    return (
      <WidthConsumer>
        {({ width }) => (
          <div
            className={`${TableSharedCssClassName.TABLE_CONTAINER} ${
              props.shadowClassNames
            }`}
            data-layout={props.layout}
            ref={props.handleRef}
            style={{ width: calcTableWidth(props.layout, width, false) }}
          >
            <div className={TableSharedCssClassName.TABLE_NODE_WRAPPER}>
              <table data-number-column={props.isNumberColumnEnabled}>
                {colgroup}
                <tbody>
                  {props.isNumberColumnEnabled
                    ? addNumberColumnIndexes(props.children)
                    : props.children}
                </tbody>
                <Summary content={props.content} />
              </table>
            </div>
          </div>
        )}
      </WidthConsumer>
    );
  };
}

export default overflowShadow(Table, {
  overflowSelector: `.${TableSharedCssClassName.TABLE_NODE_WRAPPER}`,
  scrollableSelector: 'table',
});
