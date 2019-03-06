// @flow
import React, { Component } from 'react';
import DynamicTable from '..';
import { rows } from './content/sample-data';

export default class extends Component<{}, {}> {
  render() {
    return <DynamicTable rows={rows} />;
  }
}
