/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import WidthDetector from '@atlaskit/width-detector';
import Avatar from '@atlaskit/avatar';

import getStyles from './styles';

import { ProductHome } from './ProductHome';
import Item from '../Item';
import { GlobalNavigationProps } from './types';
import PlatformServices from './PlatformServices';
import Create from './Create';

export default class GlobalNavigation extends Component<GlobalNavigationProps> {
  static defaultProps = {
    primaryItems: [],
  };
  render() {
    const { create, primaryItems, product } = this.props;
    const styles = getStyles();

    return (
      <NavigationAnalyticsContext
        data={{
          attributes: { navigationLayer: 'global' },
          componentName: 'globalNav',
        }}
      >
        <div>
          <WidthDetector containerStyle={styles.outer}>
            {width => (
              <Fragment>
                <div css={styles.left}>
                  <ProductHome {...product} width={width} />
                  {primaryItems.map(props => (
                    <Item key={props.id} {...props} />
                  ))}
                </div>
                <div css={styles.right}>
                  {create && <Create {...create} width={width} />}
                  <PlatformServices {...this.props} />
                  <Avatar />
                </div>
              </Fragment>
            )}
          </WidthDetector>
        </div>
      </NavigationAnalyticsContext>
    );
  }
}
