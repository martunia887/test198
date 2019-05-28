/** @jsx jsx */
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import WidthDetector from '@atlaskit/width-detector';
import { jsx } from '@emotion/core';
import { Component, Fragment } from 'react';
import Item from '../Item';
import Create from './Create';
import Notifications from './Notifications';
import { ProductHome } from './ProductHome';
import Search from './Search';
import getStyles from './styles';
import { GlobalNavigationProps } from './types';
import Profile from './Profile';

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
      profile,
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
                    drawerContent={AppSwitcherComponent}
                    text={<AppSwitcherIcon label="Switch to..." />}
                  />
                  {notifications && <Notifications {...notifications} />}
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
                  <Profile {...profile} />
                </div>
              </Fragment>
            )}
          </WidthDetector>
        </div>
      </NavigationAnalyticsContext>
    );
  }
}
