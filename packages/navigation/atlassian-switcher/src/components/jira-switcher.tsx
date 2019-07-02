import * as React from 'react';
import { Messages } from 'react-intl';
import Switcher from './switcher';
import {
  CustomLinksProvider,
  MANAGE_HREF,
} from '../providers/jira-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { mapResultsToSwitcherProps } from '../utils/map-results-to-switcher-props';
import { FeatureFlagProps, AvailableProductsResponse } from '../types';
import { AvailableProductsProvider } from '../providers/products-data-provider';
import { ProviderResult } from '../providers/as-data-provider';

type JiraSwitcherProps = {
  cloudId: string;
  messages: Messages;
  features: FeatureFlagProps;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
};

export default (props: JiraSwitcherProps) => (
  <CustomLinksProvider>
    {customLinks => (
      <AvailableProductsProvider
        isUserCentric={props.features.enableUserCentricProducts}
      >
        {(availableProducts: ProviderResult<AvailableProductsResponse>) => (
          <CommonDataProvider
            cloudId={props.cloudId}
            isUserCentric={props.features.enableUserCentricProducts}
          >
            {providerResults => {
              const {
                showManageLink,
                ...switcherLinks
              } = mapResultsToSwitcherProps(
                props.cloudId,
                { customLinks, ...providerResults },
                { ...props.features, xflow: true },
                availableProducts,
              );

              return (
                <Switcher
                  {...props}
                  {...switcherLinks}
                  manageLink={showManageLink ? MANAGE_HREF : undefined}
                />
              );
            }}
          </CommonDataProvider>
        )}
      </AvailableProductsProvider>
    )}
  </CustomLinksProvider>
);
