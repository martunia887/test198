// @flow

import React from 'react';
import Table from '@atlaskit/dynamic-table';
import Tabs from '@atlaskit/tabs';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { gridSize } from '@atlaskit/theme';
import * as fs from '../utils/fs';
import Page, { Title, Section } from '../components/Page';
import { externalPackages as packages, getConfig } from '../site';
import LinkTabItem from '../components/LinkTabItem';
import type { RouterMatch } from '../types';

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 15,
    },
    {
      key: 'description',
      content: 'Description',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
    {
      key: 'publishTime',
      content: 'Latest',
      shouldTruncate: true,
      isSortable: false,
      width: 20,
    },
    {
      key: 'team',
      content: 'Team',
      shouldTruncate: true,
      isSortable: true,
      width: 20,
    },
    {
      key: 'maintainers',
      content: 'Maintainers',
      shouldTruncate: true,
      isSortable: false,
      width: 20,
    },
  ],
};

const renderRow = (
  {
    name: packageName,
    description,
    maintainers,
    // lastPublishedOn,
    version,
  },
  { id },
  groupId,
) => {
  return {
    cells: [
      {
        key: id,
        content: (
          <RowCell>
            <a href={`/packages/${groupId}/${id}`}>{fs.titleize(id)}</a>
          </RowCell>
        ),
      },
      {
        key: 'description',
        shouldTruncate: true,
        content: <RowCell>{description}</RowCell>,
      },
      {
        key: 'publishTime',
        // new website structure does not have an easy way to get date of last
        // release, so we are skipping it for now.
        content: (
          <RowCell>
            <a
              href={`https://www.npmjs.com/package/${packageName}`}
              target="_new"
            >
              {version}
            </a>
            {null}

            {/* {publishTime ? (
                  <Time dateTime={component.publishedDate}>
                    {' '}({component.publishedDate && new Date(component.publishedDate).toLocaleDateString()})
                  </Time>
                ) : null} */}
          </RowCell>
        ),
      },
      {
        key: groupId,
        content: <RowCell>{fs.titleize(groupId)}</RowCell>,
      },
      {
        content: (
          <RowCell>
            {maintainers && maintainers.map(val => val.name || val).join(', ')}
          </RowCell>
        ),
      },
    ],
  };
};

const renderTable = packages => (
  <Table
    head={head}
    rows={packages.map(pkg => renderRow(...pkg))}
    isFixedSize
    defaultSortKey="name"
    defaultSortOrder="ASC"
  />
);

const getPackages = () =>
  fs.getDirectories(packages.children).map(team => {
    return {
      id: team.id,
      packages: fs.getDirectories(team.children).map(pkg => {
        const pkgJSON = getConfig(team.id, pkg.id).config;
        return [pkgJSON, pkg, team.id];
      }),
    };
  });

const getTabs = packages => {
  const allPackages = [];
  const tabs = packages.map(group => {
    allPackages.push(...group.packages);
    return {
      label: fs.titleize(group.id),
      content: renderTable(group.packages),
      to: `/packages/${group.id}`,
      id: group.id,
    };
  });
  tabs.unshift({
    label: 'All',
    content: renderTable(allPackages),
    to: '/packages',
    id: 'all',
  });

  return tabs;
};

export default class PackagesList extends React.Component<{
  match: RouterMatch,
}> {
  tabs: *;

  constructor(props: *) {
    super(props);
    this.tabs = getTabs(getPackages());
  }
  render() {
    const {
      match: {
        params: { groupId },
      },
    } = this.props;
    const selectedTab = this.tabs.find(t => t.id === groupId) || this.tabs[0];
    return (
      <Page width="large">
        <Helmet>
          <title>
            Browse {selectedTab.id} packages - {BASE_TITLE}
          </title>
        </Helmet>
        <Title>All Packages</Title>
        <Section>
          <Tabs
            tabs={this.tabs}
            components={{ Item: LinkTabItem }}
            selected={selectedTab}
          />
        </Section>
      </Page>
    );
  }
}

// Tabular data
const RowCell = styled.div`
  padding-bottom: ${gridSize}px;
  padding-top: ${gridSize}px;
`;
