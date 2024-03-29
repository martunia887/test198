import * as React from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import { mockEndpoints, REQUEST_FAST } from './helpers/mock-endpoints';
import { withAnalyticsLogger } from './helpers';
import AtlassianSwitcher from '../src';
import { addLocaleData, IntlProvider } from 'react-intl';
import es from 'react-intl/locale-data/es';

addLocaleData([...es]);

class JiraSwitcherExample extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    this.openDrawer();
  }

  openDrawer = () => {
    mockEndpoints('jira', undefined, REQUEST_FAST);
    this.setState({
      isDrawerOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  onTriggerXFlow = (productKey: string, sourceComponent: string) => {
    console.log(
      `Triggering xflow for => ${productKey} from ${sourceComponent}`,
    );
  };

  render() {
    return (
      <IntlProvider locale="es">
        <div style={{ padding: '2rem' }}>
          <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
            <AtlassianSwitcher
              product="jira"
              cloudId="some-cloud-id"
              triggerXFlow={this.onTriggerXFlow}
            />
          </Drawer>
          <Button type="button" onClick={this.openDrawer}>
            Open drawer
          </Button>
        </div>
      </IntlProvider>
    );
  }
}

export default withAnalyticsLogger(JiraSwitcherExample);
