import React from 'react';

import { CustomLinksResponse, CustomLink } from '../types';
import { fetchJson } from '../utils/fetch';

import asDataProvider, {
  ResultComplete,
  Status,
  ProviderResult,
} from './as-data-provider';

export const MANAGE_HREF = '/plugins/servlet/customize-application-navigator';

const fetchCustomLinks = () =>
  fetchJson<CustomLinksResponse>(`/rest/menu/latest/appswitcher`);

const RealCustomLinksProvider = asDataProvider('customLinks', fetchCustomLinks);

const emptyCustomLinks: ResultComplete<CustomLinksResponse> = {
  status: Status.COMPLETE,
  data: [],
};

export const CustomLinksProvider = ({
  disableCustomLinks,
  children,
}: {
  disableCustomLinks?: boolean;
  children: (customLinks: ProviderResult<CustomLink[]>) => React.ReactNode;
}) => {
  if (disableCustomLinks) {
    return <React.Fragment>{children(emptyCustomLinks)}</React.Fragment>;
  }

  return <RealCustomLinksProvider>{children}</RealCustomLinksProvider>;
};
