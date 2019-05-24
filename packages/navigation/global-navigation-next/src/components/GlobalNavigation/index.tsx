/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import Avatar from '@atlaskit/avatar';

import getStyles from './styles';

// import {
//   FirstPrimaryItemWrapper,
//   PrimaryItemsList,
//   SecondaryItemsList,
// } from './primitives';
import { GlobalNavigationProps } from './types';
import PlatformServices from './PlatformServices';

export default class GlobalNavigation extends React.Component<
  GlobalNavigationProps
> {
  render() {
    const {
      // itemComponent: ItemComponent,
      // primaryItems,
      // secondaryItems,
      // productLogo: ProductLogo,
      productWordmark: ProductWordmark,
    } = this.props;
    const wrapperStyles = getStyles();

    // theme.mode.horizontalGlobalNav({
    //   topOffset: theme.topOffset,
    // });

    return (
      <NavigationAnalyticsContext
        data={{
          attributes: { navigationLayer: 'global' },
          componentName: 'globalNav',
        }}
      >
        <div css={wrapperStyles}>
          <ProductWordmark />
          {/* <PrimaryItemsList>
            <NavigationAnalyticsContext
              data={{ attributes: { navigationIconGrouping: 'primary' } }}
            >
              <Fragment>
                {primaryItems.map((props, index) => {
                  // Render the first item with a margin beneath it and a large icon
                  if (!index) {
                    const { icon: Icon, ...rest } = props;
                    return (
                      <FirstPrimaryItemWrapper key={props.id}>
                        <ItemComponent
                          {...rest}
                          icon={provided => <Icon {...provided} size="large" />}
                          size="large"
                          index={index}
                        />
                      </FirstPrimaryItemWrapper>
                    );
                  }
                  return (
                    <ItemComponent
                      {...props}
                      key={props.id}
                      size="small"
                      index={index}
                    />
                  );
                })}
              </Fragment>
            </NavigationAnalyticsContext>
          </PrimaryItemsList>

          <SecondaryItemsList>
            <NavigationAnalyticsContext
              data={{ attributes: { navigationIconGrouping: 'secondary' } }}
            >
              <Fragment>
                {secondaryItems.map((props, index) => (
                  <ItemComponent
                    {...props}
                    key={props.id}
                    size="small"
                    index={index}
                  />
                ))}
              </Fragment>
            </NavigationAnalyticsContext>
          </SecondaryItemsList> */}
          <PlatformServices {...this.props} />
          <Avatar />
        </div>
      </NavigationAnalyticsContext>
    );
  }
}
