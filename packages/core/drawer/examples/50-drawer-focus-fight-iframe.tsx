import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Modal from '@atlaskit/modal-dialog';

interface State {
  isModalOpen: boolean;
}
export default class DrawersExample extends Component<{}, State> {
  state = {
    isModalOpen: false,
  };
  componentDidMount = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  render() {
    return (
      <div css={{ padding: '2rem' }}>
        {this.state.isModalOpen && (
          <Modal autoFocus>
            <Button>Hello</Button>
          </Modal>
        )}
      </div>
    );
  }
}
