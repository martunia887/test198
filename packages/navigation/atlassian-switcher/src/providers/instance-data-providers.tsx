import React from 'react';

import { fetchJson, postJson } from '../utils/fetch';
import asDataProvider, {
  ProviderResult,
  ResultLoading,
  Status,
} from './as-data-provider';
import {
  LicenseInformationResponse,
  Permissions,
  UserPermissionResponse,
  WithCloudId,
  XFlowSettingsResponse,
} from '../types';
import { withCached } from '../utils/with-cached';
import withHandleOptionalCloudId from './with-handle-optional-cloud-id';

// License information api
const fetchLicenseInformation = withCached(({ cloudId }: WithCloudId) =>
  fetchJson<LicenseInformationResponse>(
    `/gateway/api/xflow/${cloudId}/license-information`,
  ),
);

const RealLicenseInformationProvider = asDataProvider(
  'licenseInformation',
  fetchLicenseInformation,
  fetchLicenseInformation.cached,
);

const unresolvedLicenseInformation: ResultLoading = {
  status: Status.LOADING,
  data: null,
};

export const LicenseInformationProvider = withHandleOptionalCloudId(
  ({
    cloudId,
    isUserCentric,
    children,
  }: {
    cloudId: string;
    isUserCentric: boolean;
    children: (
      licenseInformation: ProviderResult<LicenseInformationResponse>,
    ) => React.ReactNode;
  }) => {
    if (!isUserCentric) {
      return (
        <RealLicenseInformationProvider cloudId={cloudId}>
          {children}
        </RealLicenseInformationProvider>
      );
    }
    // We should never be reading from this provider in user-centric mode, so here I model it as a provider that never resolves.
    return (
      <React.Fragment>{children(unresolvedLicenseInformation)}</React.Fragment>
    );
  },
  {
    hostname: '',
    products: {},
  },
);

// Permissions api
type FetchPermissionParamsType = WithCloudId & {
  permissionId: Permissions;
};
const fetchPermission = withCached(
  ({ cloudId, permissionId }: FetchPermissionParamsType) =>
    postJson<UserPermissionResponse>(`/gateway/api/permissions/permitted`, {
      permissionId,
      resourceId: `ari:cloud:platform::site/${cloudId}`,
    }).then(permission => permission.permitted),
);

export const UserPermissionProvider = withHandleOptionalCloudId(
  asDataProvider('permission', fetchPermission, fetchPermission.cached),
  false,
);

// Xflow settings api
const fetchXflowSettings = withCached(({ cloudId }: WithCloudId) =>
  fetchJson<XFlowSettingsResponse>(
    `/gateway/api/site/${cloudId}/setting/xflow`,
  ).then(xFlowSettings =>
    xFlowSettings['product-suggestions-enabled'] !== undefined
      ? xFlowSettings['product-suggestions-enabled']
      : true,
  ),
);

export const XFlowSettingsProvider = withHandleOptionalCloudId(
  asDataProvider(
    'xflowSettings',
    fetchXflowSettings,
    fetchXflowSettings.cached,
  ),
  false,
);

export const prefetchAll = ({ cloudId }: WithCloudId) => {
  fetchLicenseInformation({ cloudId });
  fetchXflowSettings({ cloudId });
  fetchPermission({
    cloudId,
    permissionId: Permissions.ADD_PRODUCTS,
  });
  fetchPermission({ cloudId, permissionId: Permissions.MANAGE });
};

export const resetAll = () => {
  fetchLicenseInformation.reset();
  fetchXflowSettings.reset();
  fetchPermission.reset();
};
