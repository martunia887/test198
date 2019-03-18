// @flow

import React, { Component, type ComponentType } from 'react';
import { withTheme } from 'emotion-theming';

import { light } from './modes';
import type {
  GlobalTheme,
  ProductTheme,
  Theme,
  ThemeWrappedComp,
} from './types';

const withDefaultTheme = <P: {}, C: ComponentType<P>>(
  WrappedComponent: ComponentType<P>,
  defaultTheme: Theme,
): ThemeWrappedComp<C> =>
  class WithDefaultTheme extends Component<*, *> {
    static displayName = `WithDefaultTheme(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    render() {
      // TODO: investigate just using defaultProps
      const tempTheme = Object.keys(this.props.theme).length
        ? this.props.theme
        : defaultTheme;

      return <WrappedComponent {...this.props} theme={tempTheme} />;
    }
  };

const defaultContentTheme: ProductTheme = { mode: light, context: 'container' };
const defaultGlobalTheme: GlobalTheme = { mode: light };

export const withContentTheme = <P: {}, C: ComponentType<P>>(
  WrappedComponent: C,
): ThemeWrappedComp<C> => {
  return withTheme(withDefaultTheme(WrappedComponent, defaultContentTheme));
};

export const withGlobalTheme = <P: {}, C: ComponentType<P>>(
  WrappedComponent: C,
): ThemeWrappedComp<C> =>
  withTheme(withDefaultTheme(WrappedComponent, defaultGlobalTheme));

export default withTheme;
