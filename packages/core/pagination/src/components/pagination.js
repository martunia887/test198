//@flow
import React, { Component } from 'react';
import Page from './page';
import { LeftNavigator, RightNavigator } from './navigators';
import Ellipses from './ellipses';

type Props = {
  /** Render prop to compose pagiation */
  children: Function,
};

export default class Pagination extends Component<Props> {
  render() {
    const { children } = this.props;
    const style = {
      display: 'flex',
    };
    return (
      <div style={style}>
        {children
          ? children(LeftNavigator, Page, RightNavigator, Ellipses)
          : null}
      </div>
    );
  }
}
