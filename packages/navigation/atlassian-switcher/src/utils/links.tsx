import * as React from 'react';

import DiscoverFilledGlyph from '@atlaskit/icon/glyph/discover-filled';
import SettingsGlyph from '@atlaskit/icon/glyph/settings';

import {
  ConfluenceIcon,
  JiraIcon,
  JiraSoftwareIcon,
  JiraServiceDeskIcon,
  JiraCoreIcon,
} from '@atlaskit/logo';
import { LicenseInformationDataStructure } from '../providers/types';
import JiraOpsLogo from './assets/jira-ops-logo';
import PeopleLogo from './assets/people';
import { CustomLink, RecentContainer } from '../types';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { createIcon, createImageIcon, IconType } from './icon-themes';

enum ProductActivationStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

export enum ProductKey {
  CONFLUENCE = 'confluence.ondemand',
  JIRA_CORE = 'jira-core.ondemand',
  JIRA_SOFTWARE = 'jira-software.ondemand',
  JIRA_SERVICE_DESK = 'jira-servicedesk.ondemand',
  JIRA_OPS = 'jira-incident-manager.ondemand',
}

const SINGLE_JIRA_PRODUCT: 'jira' = 'jira';

interface StringDict {
  [index: string]: string;
}

export type SwitcherItemType = {
  key: string;
  label: string;
  Icon: IconType;
  href: string;
};

export type RecentItemType = SwitcherItemType & {
  type: string;
  description: string;
};

export type SuggestedProductItemType = SwitcherItemType | null;

export const OBJECT_TYPE_TO_LABEL_MAP: StringDict = {
  'jira-project': 'Jira project',
  'confluence-space': 'Confluence space',
};

export const PRODUCT_DATA_MAP: {
  [productKey in ProductKey | typeof SINGLE_JIRA_PRODUCT]: {
    label: string;
    Icon: React.ComponentType<any>;
    href: string;
  }
} = {
  [ProductKey.CONFLUENCE]: {
    label: 'Confluence',
    Icon: createIcon(ConfluenceIcon, { size: 'small' }),
    href: '/wiki',
  },
  [ProductKey.JIRA_CORE]: {
    label: 'Jira Core',
    Icon: createIcon(JiraCoreIcon, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=business',
  },
  [ProductKey.JIRA_SOFTWARE]: {
    label: 'Jira Software',
    Icon: createIcon(JiraSoftwareIcon, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=software',
  },
  [ProductKey.JIRA_SERVICE_DESK]: {
    label: 'Jira Service Desk',
    Icon: createIcon(JiraServiceDeskIcon, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=service_desk',
  },
  [ProductKey.JIRA_OPS]: {
    label: 'Jira Ops',
    Icon: createIcon(JiraOpsLogo, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=ops',
  },
  [SINGLE_JIRA_PRODUCT]: {
    label: 'Jira',
    Icon: createIcon(JiraIcon, { size: 'small' }),
    href: '/secure/MyJiraHome.jspa',
  },
};

export const getObjectTypeLabel = (type: string): string => {
  return OBJECT_TYPE_TO_LABEL_MAP[type] || type;
};

export const getFixedProductLinks = (): SwitcherItemType[] => [
  {
    key: 'people',
    label: 'People',
    Icon: createIcon(PeopleLogo, { size: 'small' }),
    href: `/people`,
  },
];

export const getProductLink = (
  productKey: ProductKey | typeof SINGLE_JIRA_PRODUCT,
): SwitcherItemType => ({
  key: productKey,
  ...PRODUCT_DATA_MAP[productKey],
});

export const getProductIsActive = (
  { products }: LicenseInformationDataStructure,
  productKey: string,
): boolean =>
  products.hasOwnProperty(productKey) &&
  products[productKey].state === ProductActivationStatus.ACTIVE;

export const getLicensedProductLinks = (
  licenseInformationData: LicenseInformationDataStructure,
  enableSplitJira: boolean,
): SwitcherItemType[] => {
  const activeJiraProducts = [
    ProductKey.JIRA_SOFTWARE,
    ProductKey.JIRA_SERVICE_DESK,
    ProductKey.JIRA_CORE,
    ProductKey.JIRA_OPS,
  ].filter(productKey =>
    getProductIsActive(licenseInformationData, productKey),
  );

  const jiraProducts =
    !enableSplitJira && activeJiraProducts.length
      ? [SINGLE_JIRA_PRODUCT]
      : activeJiraProducts;

  const otherProducts = [ProductKey.CONFLUENCE].filter(productKey =>
    getProductIsActive(licenseInformationData, productKey),
  );

  return [...jiraProducts, ...otherProducts].map(productKey =>
    getProductLink(productKey),
  );
};

export const getAdministrationLinks = (
  cloudId: string,
  isAdmin: boolean,
): SwitcherItemType[] => {
  const adminBaseUrl = isAdmin ? `/admin/s/${cloudId}` : '/trusted-admin';
  return [
    {
      key: 'discover-applications',
      label: 'Discover more',
      Icon: createIcon(DiscoverFilledGlyph, { size: 'medium' }),
      href: `${adminBaseUrl}/billing/addapplication`,
    },
    {
      key: 'administration',
      label: 'Administration',
      Icon: createIcon(SettingsGlyph, { size: 'medium' }),
      href: adminBaseUrl,
    },
  ];
};

export const getSuggestedProductLink = (
  licenseInformationData: LicenseInformationDataStructure | null,
): SuggestedProductItemType => {
  if (!licenseInformationData) {
    return null;
  }
  if (!getProductIsActive(licenseInformationData, ProductKey.CONFLUENCE)) {
    return getProductLink(ProductKey.CONFLUENCE);
  }
  if (
    !getProductIsActive(licenseInformationData, ProductKey.JIRA_SERVICE_DESK)
  ) {
    return getProductLink(ProductKey.JIRA_SERVICE_DESK);
  }
  return null;
};

export const getCustomLinkItems = (
  list: Array<CustomLink>,
): SwitcherItemType[] =>
  list.map(customLink => ({
    key: customLink.key,
    label: customLink.label,
    Icon: createIcon(WorldIcon),
    href: customLink.link,
  }));

export const getRecentLinkItems = (
  list: Array<RecentContainer>,
): RecentItemType[] =>
  list.map(customLink => ({
    key: customLink.objectId,
    label: customLink.name,
    Icon: createImageIcon(customLink.iconUrl),
    href: customLink.url,
    type: customLink.type,
    description: getObjectTypeLabel(customLink.type),
  }));
