/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import WidthDetector from '@atlaskit/width-detector';
import Avatar from '@atlaskit/avatar';

import getStyles from './styles';

import { ProductHome } from './ProductHome';
import PrimaryItem from '../PrimaryItem';
import { GlobalNavigationProps } from './types';
import PlatformServices from './PlatformServices';

export default class GlobalNavigation extends Component<GlobalNavigationProps> {
  static defaultProps = {
    primaryItems: [],
  };
  render() {
    const { primaryItems, product } = this.props;
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
                    <PrimaryItem key={props.id} {...props} />
                  ))}
                </div>
                <div css={styles.right}>
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
