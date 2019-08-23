/** @jsx jsx */
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import WidthDetector from '@atlaskit/width-detector';
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import Item from '../Item';
import getStyles from './styles';
import { GlobalNavigationProps } from './types';

const analyticsData = {
  attributes: { navigationLayer: 'global' },
  componentName: 'globalNav',
};

const styles = getStyles();

export const GlobalNavigation = (props: GlobalNavigationProps) => {
  const {
    primaryItems,
    renderAppSwitcher: AppSwitcher,
    renderCreate: Create,
    renderHelp: Help,
    renderProductHome: ProductHome,
    renderProfile: Profile,
    renderNotifications: Notifications,
    renderSearch: Search,
    renderSettings: Settings,
  } = props;

  const width = 1800;

  return (
    <NavigationAnalyticsContext data={analyticsData}>
      <div css={styles.outer}>
        <div css={styles.left}>
          {ProductHome && <ProductHome width={width} />}
          {primaryItems.map(props => (
            <Item key={props.id} {...props} />
          ))}
        </div>
        <div css={styles.right}>
          {Create && <Create width={width} />}
          {Search && <Search width={width} />}
          {AppSwitcher && <AppSwitcher />}
          {Notifications && <Notifications />}
          {Settings && <Settings />}
          {Help && <Help />}
          <Profile />
        </div>
      </div>
    </NavigationAnalyticsContext>
  );
};

GlobalNavigation.defaultProps = {
  primaryItems: [],
};

export default GlobalNavigation;
