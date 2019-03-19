import * as React from 'react';
import PortalProviderAPI from './PortalProviderAPI';
import { PortalProviderProps } from './types';

export default class PortalProvider extends React.Component<
  PortalProviderProps
> {
  portalProviderAPI: PortalProviderAPI;

  constructor(props: PortalProviderProps) {
    super(props);
    this.portalProviderAPI = new PortalProviderAPI();
  }

  render() {
    return this.props.render(this.portalProviderAPI);
  }

  componentDidUpdate() {
    this.portalProviderAPI.forceUpdate();
  }
}
