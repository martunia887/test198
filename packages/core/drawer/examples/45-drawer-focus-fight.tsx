import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '../src';

interface State {
  loadIframe: boolean;
  isDrawerOpen: boolean;
}
export default class DrawersExample extends Component<{}, State> {
  state = {
    loadIframe: false,
    isDrawerOpen: false,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  openIframe = () => {
    this.setState({
      loadIframe: true,
    });
  };

  render() {
    return (
      <div css={{ padding: '2rem' }}>
        <Drawer
          isOpen={this.state.isDrawerOpen}
          autoFocusFirstElem
          width="medium"
        >
          <Button id="open-modal" type="button" onClick={this.openIframe}>
            Open modal in iframe
          </Button>
        </Drawer>
        {this.state.loadIframe && (
          <iframe
            src="/examples.html?groupId=core&packageId=drawer&exampleId=drawer-focus-fight-iframe"
            style={{
              position: 'absolute',
              right: 0,
              backgroundColor: 'red',
              zIndex: 501,
            }}
          />
        )}
        <Button id="open-drawer" type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
