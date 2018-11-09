// @flow

import React, { Component } from 'react';
import { AtlassianIcon } from '@atlaskit/logo';
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next';

import GlobalNavigation from '../src';

const DrawerContent = ({
  drawerTitle,
  drawerBody,
}: {
  drawerTitle: string,
  drawerBody: string,
}) => (
  <div>
    <h1>{drawerTitle}</h1>
    <div>{drawerBody}</div>
    <label htmlFor="textbox" css={{ display: 'block' }}>
      Type something in the textarea below and see if it is retained
    </label>
    <textarea input="textbox" type="text" rows="50" cols="50" />
  </div>
);

type State = {
  isStarredDrawerOpen: boolean,
};

export default class GlobalNavWithDrawers extends Component<{||}, State> {
  state = {
    isStarredDrawerOpen: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboardShortcut);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboardShortcut);
  }

  handleKeyboardShortcut = (e: any) => {
    if (e.key === '\\') {
      if (this.state.isStarredDrawerOpen) return this.closeStarredDrawer();

      return this.openStarredDrawer();
    }
    return null;
  };

  openStarredDrawer = () => this.setState({ isStarredDrawerOpen: true });

  closeStarredDrawer = () => {
    this.setState({ isStarredDrawerOpen: false });
  };

  renderStarredDrawerContents = () => (
    <DrawerContent
      drawerTitle="Controlled Starred drawer"
      drawerBody="Can be controlled by passing the onStarredClick prop"
    />
  );

  renderGlobalNavigation = () => (
    <GlobalNavigation
      // Product
      productIcon={() => <AtlassianIcon label="Atlassian" size="medium" />}
      onProductClick={() => console.log('product clicked')}
      // Starred
      onStarredClick={this.openStarredDrawer}
      onStarredDrawerClose={this.closeStarredDrawer}
      isStarredDrawerOpen={this.state.isStarredDrawerOpen}
      starredDrawerContents={this.renderStarredDrawerContents}
      shouldStarredDrawerUnmountOnExit
    />
  );

  render() {
    return (
      <NavigationProvider>
        <LayoutManager
          globalNavigation={this.renderGlobalNavigation}
          productNavigation={() => null}
          containerNavigation={() => null}
        >
          <div css={{ padding: '32px 40px' }}>Page contents</div>
        </LayoutManager>
      </NavigationProvider>
    );
  }
}
