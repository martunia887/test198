import * as React from 'react';
import { JiraSoftwareWordmark } from '@atlaskit/logo';
import GlobalNavigation from '../src';

export default class BaseExample extends React.Component {
  state = {
    isDrawerOpen: true,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  render() {
    return <GlobalNavigation productWordmark={JiraSoftwareWordmark} />;
  }
}
