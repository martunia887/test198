// @flow

import React from 'react';
import StatusSelect from '../'; // TODO use @atlaskit/jira/status-select
import * as statusCategories from '../model';

export default function Example() {
  const { TODO, IN_PROGRESS, DONE } = statusCategories;

  const transitions = [
    {
      id: 1,
      toStatusName: 'To do',
      toStatusCategory: TODO,
    },
    {
      id: 2,
      toStatusName: 'In progress',
      toStatusCategory: IN_PROGRESS,
    },
    {
      id: 3,
      toStatusName: 'Done',
      toStatusCategory: DONE,
    },
  ];

  const defaults = {
    name: 'testing????',
    options: transitions,
    selectedOption: transitions[2],
    statusCategories,
    onChange: console.log,
    animateTransition: true,
  };

  return <StatusSelect {...defaults} />;
}
