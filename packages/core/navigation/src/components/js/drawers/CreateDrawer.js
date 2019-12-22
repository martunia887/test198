// @flow
import React, { PureComponent } from 'react';

import { drawerIconOffset } from '../../../shared-variables';
import Drawer from '../Drawer';

import type { DrawerProps } from './types';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
export default class CreateDrawer extends PureComponent<DrawerProps> {
  render() {
    return (
      <Drawer
        iconOffset={drawerIconOffset}
        width={this.props.isFullWidth ? 'full' : 'narrow'}
        {...this.props}
      />
    );
  }
}
