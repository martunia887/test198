// @flow
import React, { PureComponent, type Node } from 'react';

import { type DataFunction } from './../types';
import { TreeHead as StyledTreeHead } from '../styled';
import withColumnWidth from './withColumnWidth';

type Props = {
  children: Array<Node>,
  columnWidth: number,
};

class TreeHead extends PureComponent<Props> {
  render() {
    return (
      <StyledTreeHead width={this.props.columnWidth}>
        {this.props.children}
      </StyledTreeHead>
    );
  }
}

export default withColumnWidth(TreeHead);
