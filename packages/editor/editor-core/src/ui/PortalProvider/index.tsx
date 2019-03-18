import * as React from 'react';
import {
  createPortal,
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from 'react-dom';
import { EventDispatcher } from '../../event-dispatcher';

export type PortalProviderProps = {
  render: (
    portalProviderAPI: PortalProviderAPI,
  ) => React.ReactChild | JSX.Element | null;
};

type RenderFunction = () => React.ReactChild | JSX.Element | null;
type Portal = {
  render: RenderFunction;
  container: HTMLElement;
};
export type Portals = Map<string, Portal>;

export type PortalRendererState = {
  portals: Portals;
};

type MountedPortal = {
  children: () => React.ReactChild | null;
  hasReactContext: boolean;
};

export class PortalProviderAPI extends EventDispatcher {
  portals: Portals = new Map();
  context: any;

  setContext = (context: any) => {
    this.context = context;
  };

  render = (renderFn: RenderFunction, container: HTMLElement, id: string) => {
    this.portals.set(id, { render: renderFn, container });
    this.emit('update', { portals: this.portals });
  };

  // TODO: until https://product-fabric.atlassian.net/browse/ED-5013
  // we (unfortunately) need to re-render to pass down any updated context.
  // selectively do this for nodeviews that opt-in via `hasReactContext`
  forceUpdate() {
    // this.portals.forEach((portal, container) => {
    //   if (!portal.hasReactContext) {
    //     return;
    //   }
    //   unstable_renderSubtreeIntoContainer(
    //     this.context,
    //     portal.children() as React.ReactElement<any>,
    //     container,
    //   );
    // });
  }

  remove = (container: HTMLElement, id: string) => {
    this.portals.delete(id);
    this.emit('update', { portals: this.portals });
  };
}

export class PortalProvider extends React.Component<PortalProviderProps> {
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
type RenderPortalProps = { render: RenderFunction; container: HTMLElement };
export const RenderPortal = ({ render, container }: RenderPortalProps) => {
  return createPortal(render(), container);
};

export class PortalRenderer extends React.Component<
  { portalProviderAPI: PortalProviderAPI },
  PortalRendererState
> {
  constructor(props: { portalProviderAPI: PortalProviderAPI }) {
    super(props);
    props.portalProviderAPI.setContext(this);
    props.portalProviderAPI.on('update', this.handleUpdate);
    this.state = { portals: new Map() };
  }

  handleUpdate = ({ portals }: { portals: Portals }) => {
    this.setState({ portals });
  };

  render() {
    const { portals } = this.state;
    return (
      <>
        {Array.from(portals.entries()).map(([id, portal]) => (
          <RenderPortal
            render={portal.render}
            container={portal.container}
            key={id}
          />
        ))}
      </>
    );
  }
}
