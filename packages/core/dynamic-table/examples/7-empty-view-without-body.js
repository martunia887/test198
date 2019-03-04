// @flow
import React, { Component } from 'react';
import { DynamicTableStateless } from '../';
import { head } from './content/sample-data';

export default class extends Component<{}, {}> {
  render() {
    return <DynamicTableStateless head={head} />;
  }
}
