// @flow

import React from 'react';
import { JiraWordmark as JiraWordmarkLogo } from '@atlaskit/logo';
import { LinkItem } from '../../components';

import ViewRegistrar from '../common/view-registrar';

const logToConsole = () => console.log('item clicked');

const getItems = () => [
  {
    id: 'root/issues:header',
    items: [
      { type: 'Wordmark', wordmark: JiraWordmarkLogo, id: 'jira-wordmark' },
    ],
    type: 'HeaderSection',
  },
  {
    id: 'root/issues:menu',
    nestedGroupKey: 'menu',
    parentId: 'root/index:menu',
    type: 'MenuSectionWithNestedScroll',
    shouldGrow: false,
    alwaysShowScrollHint: true,
    allowNestedScroll: true,
    items: [
      {
        type: 'BackItem',
        goTo: 'root/index',
        id: 'back',
        text: 'Back to Jira',
      },
      {
        nestedGroupKey: 'menu',
        parentId: 'root/index:menu',
        type: 'Section',
        alwaysShowScrollHint: true,
        shouldGrow: true,
        items: [
          {
            type: 'SectionHeading',
            id: 'section-heading',
            text: 'Issues and filters',
          },
          {
            type: 'InlineComponent',
            component: LinkItem,
            id: 'search-issues',
            text: 'Search issues',
            to: '/issues/search',
          },
          {
            type: 'GroupHeading',
            id: 'heading-starred-filters',
            text: 'Starred filters',
          },
          {
            type: 'Item',
            id: 'older-than-90-days',
            text: 'Older than 90 days',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'critical-bugs',
            text: 'Critical bugs',
            onClick: logToConsole,
          },
          {
            type: 'GroupHeading',
            id: 'heading-other-filters',
            text: 'Other filters',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'my-open-issues',
            text: 'My open issues',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'reported-by-me',
            text: 'Reported by me',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'all-issues',
            text: 'All issues',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'open-issues',
            text: 'Open issues',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'done-issues',
            text: 'Done issues',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'viewed-recently',
            text: 'Viewed recently',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'created-recently',
            text: 'Created recently',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'resolved-recently',
            text: 'Resolved recently',
            onClick: logToConsole,
          },
          {
            type: 'Item',
            id: 'updated-recently',
            text: 'Updated recently',
            onClick: logToConsole,
          },
        ],
      },
    ],
  },
];

const HomeView = () => (
  <ViewRegistrar
    getItemsFactory={() => getItems}
    type="product"
    viewId="root/issues"
  />
);

export default HomeView;
