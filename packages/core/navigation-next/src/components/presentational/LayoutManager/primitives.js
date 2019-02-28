// @flow

import React, { type ElementRef } from 'react';
import { layers } from '@atlaskit/theme';

export const LayoutContainer = (props: {}) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      flexGrow: 1,
    }}
    {...props}
  />
);

export const NavigationContainer = ({ innerRef, ...props }: *) => (
  <div
    ref={innerRef}
    css={{
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      left: 0,
      position: 'absolute',
      top: 0,
      zIndex: layers.navigation(),
    }}
    {...props}
  />
);

// Resizable Elements can be disabled

export type Resizable = {
  innerRef?: ElementRef<*>,
  disableInteraction: boolean,
};
