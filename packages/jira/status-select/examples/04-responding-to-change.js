// @flow

import React from 'react';
import StatusSelect from '../'; // TODO use @atlaskit/jira/status-select
import * as statusCategories from '../model';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    const { TODO, IN_PROGRESS, DONE } = statusCategories;

    this.transitions = [
      {
        id: 1,
        toStatusName: 'To do',
        toStatusCategory: TODO,
        isGlobal: true,
      },
      {
        id: 2,
        toStatusName: 'In progress',
        toStatusCategory: IN_PROGRESS,
        isGlobal: true,
      },
      {
        id: 3,
        toStatusName: 'Done',
        toStatusCategory: DONE,
        isGlobal: true,
      },
    ];

    this.state = {
      selectedOption: this.transitions[1],
    };
  }

  onChange(option) {
    this.setState({ selectedOption: option.transition });
  }

  render() {
    const defaults = {
      name: 'testing????',
      options: this.transitions,
      selectedOption: this.state.selectedOption,
      statusCategories,
      onChange: option => this.onChange(option),
    };

    return <StatusSelect {...defaults} />;
  }
}
