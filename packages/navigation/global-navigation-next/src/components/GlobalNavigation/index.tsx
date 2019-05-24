/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import WidthDetector from '@atlaskit/width-detector';

import getStyles from './styles';

// import {
//   FirstPrimaryItemWrapper,
//   PrimaryItemsList,
//   SecondaryItemsList,
// } from './primitives';
import { GlobalNavigationProps } from '../../types';
import { ProductHome } from '../ProductHome';
import PrimaryItem from '../PrimaryItem';

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
              </Fragment>
            )}
          </WidthDetector>
        </div>
      </NavigationAnalyticsContext>
    );
  }
}
