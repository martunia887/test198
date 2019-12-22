// @flow
import React, { PureComponent } from 'react';

import { drawerIconOffset } from '../../../shared-variables';
import Drawer from '../Drawer';

import type { DrawerProps } from './types';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
export default class CustomDrawer extends PureComponent<
  DrawerProps & { width: 'narrow' | 'medium' | 'wide' | 'full' },
> {
  static defaultProps = {
    width: 'wide',
  };

  render() {
    return <Drawer iconOffset={drawerIconOffset} {...this.props} />;
  }
}
