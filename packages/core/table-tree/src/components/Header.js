// @flow
import React, { Component } from 'react';

import { Header as StyledHeader } from '../styled';
import type { CSSWidth } from '../types';

import withColumnWidth from './withColumnWidth';

type Props = {
  /** The width of the Headers and Cells in this column. A CSS length string. Unitless numbers are interpreted as pixels. */
  columnWidth?: Array<CSSWidth>,

  /** Any content to be rendered inside the header. */
  children?: Node,
};

class Header extends Component<Props> {
  render() {
    const { props } = this;
    return (
      <StyledHeader role="columnheader" {...props}>
        {props.children}
      </StyledHeader>
    );
  }
}

export default withColumnWidth(Header);
