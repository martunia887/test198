/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment } from 'react';
import { DrawerItemProps, DrawerItemState } from './types';
import Drawer from '@atlaskit/drawer';

export default class DrawerItem extends React.Component<
  DrawerItemProps,
  DrawerItemState
> {
  static defaultProps = {};

  isControlled = false;

  state = {
    isOpen: false,
  };

  constructor(props: DrawerItemProps) {
    super(props);
    this.isControlled = this.props.isOpen !== undefined;
  }

  closeDrawer = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClose) {
      this.props.onClose(e);
    }
    if (!this.isControlled) {
      this.setState({ isOpen: false });
    }
  };

  onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (!this.isControlled) {
      this.setState(state => ({ isOpen: !state.isOpen }));
    }
  };

  render() {
    const {
      children, // trigger
      className,
      drawerContent: DrawerContent,
      isOpen,
    } = this.props;
    return (
      <Fragment>
        <button className={className} onClick={this.onClick}>
          {children}
        </button>
        <Drawer
          openFromRight
          isOpen={this.isControlled ? isOpen : this.state.isOpen}
          onClose={this.closeDrawer}
        >
          <DrawerContent />
        </Drawer>
      </Fragment>
    );
  }
}
