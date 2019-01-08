// @flow

import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Spinner from '../src';

type State = {
  isCompleting: boolean,
};

class StatefulSpinnerExample extends Component<{}, State> {
  state = {
    isCompleting: true,
  };

  completeSpinner = () =>
    this.setState({ isCompleting: !this.state.isCompleting });

  render() {
    const { isCompleting } = this.state;
    return (
      <div>
        <div>
          <Button onClick={this.completeSpinner}>Toggle Spinners</Button>
        </div>
        <Spinner size="xlarge" delay={2900} isCompleting={isCompleting} />
        <Spinner size="xlarge" isCompleting={isCompleting} />
      </div>
    );
  }
}

export default StatefulSpinnerExample;
