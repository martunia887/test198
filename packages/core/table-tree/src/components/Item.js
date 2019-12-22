// @flow
import React, { Component } from 'react';

import type { RenderFunction, RowData } from '../types';
import toItemId from '../utils/toItemId';

import Items from './Items';

type Props = {
  data: RowData,
  depth?: number,
  render: RenderFunction,
};

export default class Item extends Component<Props> {
  static defaultProps = {
    depth: 0,
  };

  render() {
    const { depth, data, render } = this.props;

    const renderedRow = render(data);
    if (!renderedRow) {
      return null;
    }
    const { itemId, items } = renderedRow.props;
    return React.cloneElement(renderedRow, {
      depth,
      data,
      renderChildren: () => (
        <div id={toItemId(itemId)}>
          <Items
            parentData={data}
            depth={depth}
            items={items}
            render={render}
          />
        </div>
      ),
    });
  }
}
