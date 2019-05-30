/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { ElementType, Fragment } from 'react';
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
      component,
      drawerContent: DrawerContent,
      isOpen,
      onDrawerCloseComplete,
    } = this.props;

    let ItemComponent: ElementType = 'button';
    let itemProps: Partial<DrawerItemProps> = {
      className,
      onClick: this.onClick,
    };
    if (component) {
      ItemComponent = component;
      itemProps = {
        ...this.props,
        onClick: this.onClick,
      };
    }
    return (
      <Fragment>
        <ItemComponent {...itemProps}>{children}</ItemComponent>
        <Drawer
          openFromRight
          isOpen={this.isControlled ? isOpen : this.state.isOpen}
          onClose={this.closeDrawer}
          onCloseComplete={onDrawerCloseComplete}
        >
          <DrawerContent />
        </Drawer>
      </Fragment>
    );
  }
}
