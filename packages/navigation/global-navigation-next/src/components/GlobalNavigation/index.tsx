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
import Create from './Create';

import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Search from './Search';

export default class GlobalNavigation extends Component<GlobalNavigationProps> {
  static defaultProps = {
    primaryItems: [],
  };
  render() {
    const {
      appSwitcherComponent: AppSwitcherComponent,
      create,
      search,
      help,
      notifications,
      primaryItems,
      product,
      settings,
    } = this.props;
    const styles = getStyles();

    return (
      <NavigationAnalyticsContext
        data={{
          attributes: { navigationLayer: 'global' },
          componentName: 'globalNav',
        }}
      >
        <div>
          <WidthDetector containerStyle={styles.outer as any}>
            {(width: number | undefined) => (
              <Fragment>
                <div css={styles.left}>
                  <ProductHome {...product} width={width} />
                  {primaryItems.map(props => (
                    <Item key={props.id} {...props} />
                  ))}
                </div>
                <div css={styles.right}>
                  {create && <Create {...create} width={width} />}
                  {search && <Search {...search} width={width} />}
                  <Item
                    appearance="secondary"
                    drawerContent={() => {
                      return <AppSwitcherComponent />;
                    }}
                    text={<AppSwitcherIcon label="Switch to..." />}
                  />
                  {notifications && <NotificationIcon label="Notifications" />}
                  {settings && (
                    <Item
                      appearance="secondary"
                      {...settings}
                      text={<SettingsIcon label="Settings" />}
                    />
                  )}
                  {help && (
                    <Item
                      appearance="secondary"
                      {...help}
                      text={
                        <QuestionCircleIcon
                          label="Help"
                          secondaryColor={styles.outer.fill}
                        />
                      }
                    />
                  )}
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
