// @flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';
import InlineDialog from '../src';

type State = {
  dialogOpen: boolean,
};

const content = <div>Hello!</div>;

const CustomContainer = () => (
  <div style={{ backgroundColor: 'red', minWidth: 800, height: 90 }} />
);

export default class InlineDialogExample extends Component<{}, State> {
  state = {
    dialogOpen: true,
  };

  toggleDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen });

  render() {
    return (
      <div style={{ minHeight: '120px' }}>
        <InlineDialog
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          isOpen={this.state.dialogOpen}
          content={content}
          components={{
            Container: CustomContainer,
          }}
        >
          <Button
            isSelected={this.state.dialogOpen}
            onClick={this.toggleDialog}
          >
            Click me!
          </Button>
        </InlineDialog>
      </div>
    );
  }
}
