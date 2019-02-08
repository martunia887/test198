import * as React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../primitives';
import { CustomLink, RecentContainer } from '../types';
import {
  getProductLinks,
  getAdministrationLinks,
  SuggestedProductLink,
} from '../utils/product-links';
import Lozenge from '@atlaskit/lozenge';
import { ChildrenProps } from '../providers/as-data-provider';

import { SuggestedProductItemText } from './styled';
import {
  CustomLinksProviderDataStructure,
  LicenseInformationDataStructure,
} from '../providers/types';
import { RecentContainersDataStructure } from '../providers/instance-data-providers';

interface AppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
  customLinks: ChildrenProps<CustomLinksProviderDataStructure>;
  suggestedProductLink: SuggestedProductLink;
  recentContainers: ChildrenProps<RecentContainersDataStructure>;
  licenseInformation: ChildrenProps<LicenseInformationDataStructure>;
  managePermission: ChildrenProps<boolean>;
  addProductsPermission: ChildrenProps<boolean>;
  isXFlowEnabled: ChildrenProps<boolean>;
}

export default class AppSwitcher extends React.Component<AppSwitcherProps> {
  triggerXFlow = () => {
    const { triggerXFlow, suggestedProductLink } = this.props;
    if (suggestedProductLink) {
      triggerXFlow(suggestedProductLink.key);
    }
  };

  render() {
    const {
      cloudId,
      suggestedProductLink,
      customLinks: { isLoading: isLoadingCustomLinks, data: customLinksData },
      recentContainers: {
        isLoading: isLoadingRecentContainers,
        data: recentContainersData,
      },
      licenseInformation: {
        isLoading: isLoadingLicenseInformation,
        data: licenseInformationData,
      },
      managePermission: {
        isLoading: isLoadingManagePermission,
        data: managePermissionData,
      },
      addProductsPermission: {
        isLoading: isLoadingAddProductsPermission,
        data: addProductsPermissionData,
      },
      isXFlowEnabled: {
        isLoading: isLoadingIsXFlowEnabled,
        data: isXFlowEnabledData,
      },
    } = this.props;

    const isLoadingAdministrativeSectionData =
      isLoadingManagePermission && isLoadingAddProductsPermission;
    const shouldRenderAdministrativeSection =
      !isLoadingManagePermission &&
      !isLoadingAddProductsPermission &&
      (managePermissionData || addProductsPermissionData);

    const isLoadingProductsSectionData =
      isLoadingLicenseInformation || isLoadingAddProductsPermission;
    const shouldRenderProductsSection =
      licenseInformationData && !isLoadingAddProductsPermission;

    const shouldRenderXSellLink =
      suggestedProductLink && !isLoadingIsXFlowEnabled && isXFlowEnabledData;

    return (
      <AppSwitcherWrapper>
        {isLoadingAdministrativeSectionData ? (
          <Skeleton />
        ) : (
          shouldRenderAdministrativeSection && (
            <Section title="Administration" isAdmin>
              {getAdministrationLinks(cloudId, managePermissionData!).map(
                ({ label, icon, key, link }) => (
                  <AppSwitcherItem key={key} icon={icon} href={link}>
                    {label}
                  </AppSwitcherItem>
                ),
              )}
            </Section>
          )
        )}
        {isLoadingProductsSectionData ? (
          <Skeleton />
        ) : (
          shouldRenderProductsSection && (
            <Section title="Products">
              {[
                ...getProductLinks(licenseInformationData!).map(
                  ({ label, icon, key, link }) => (
                    <AppSwitcherItem key={key} icon={icon} href={link}>
                      {label}
                    </AppSwitcherItem>
                  ),
                ),
                shouldRenderXSellLink ? (
                  <AppSwitcherItem
                    key={suggestedProductLink!.key}
                    icon={suggestedProductLink!.icon}
                    onClick={this.triggerXFlow}
                  >
                    <SuggestedProductItemText>
                      {suggestedProductLink!.label}
                    </SuggestedProductItemText>
                    <Lozenge appearance="inprogress" isBold>
                      {addProductsPermissionData! ? 'Try' : 'Request'}
                    </Lozenge>
                  </AppSwitcherItem>
                ) : null,
              ]}
            </Section>
          )
        )}
        {isLoadingCustomLinks ? (
          <Skeleton />
        ) : (
          <Section title="More" isCustom>
            {customLinksData &&
              customLinksData[0].map(({ label, link }: CustomLink) => (
                <AppSwitcherItem key={label} href={link}>
                  {label}
                </AppSwitcherItem>
              ))}
          </Section>
        )}
        {isLoadingRecentContainers ? (
          <Skeleton />
        ) : (
          recentContainersData &&
          recentContainersData.data.length && (
            <Section title="Recent Containers">
              {recentContainersData.data.map(
                ({ objectId, name, url, iconUrl }: RecentContainer) => (
                  <AppSwitcherItem key={objectId} iconUrl={iconUrl} href={url}>
                    {name}
                  </AppSwitcherItem>
                ),
              )}
            </Section>
          )
        )}
        {customLinksData && <ManageButton href={customLinksData[1]} />}
      </AppSwitcherWrapper>
    );
  }
}
