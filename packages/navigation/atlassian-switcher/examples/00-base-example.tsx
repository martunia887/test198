import * as React from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import { Switcher, withAnalyticsLogger, withIntlProvider } from './helpers';
import ErrorBoundary from '../src/components/error-boundary';

class SwitcherExample extends React.Component {
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
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <ErrorBoundary messages={{}}>
            <Switcher />
          </ErrorBoundary>
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(SwitcherExample));
