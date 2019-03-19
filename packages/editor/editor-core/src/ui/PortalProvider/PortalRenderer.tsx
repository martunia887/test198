import React from 'react';
import { createPortal } from 'react-dom';
import { RenderFunction, PortalRendererState, Portals, Portal } from './types';
import PortalProviderAPI from './PortalProviderApi';

type RenderPortalProps = { render: RenderFunction; container: HTMLElement };
const RenderPortal = ({ render, container }: RenderPortalProps) => {
  return createPortal(render(), container);
};

type RenderBucketState = {
  portals: Portal[];
};
type RenderBucketProps = {
  id: string;
  subscribe: (id: string, handler: (portals: Portal[]) => void) => Portal[];
};

class RenderBucket extends React.Component<
  RenderBucketProps,
  RenderBucketState
> {
  constructor(props: RenderBucketProps) {
    super(props);

    const portals = props.subscribe(props.id, this.handleUpdate);

    this.state = {
      portals,
    };
  }

  handleUpdate = (portals: Portal[]) => {
    this.setState({ portals });
  };

  render() {
    const { portals } = this.state;
    return (
      <>
        {portals.map(({ id, render, container }) => (
          <RenderPortal render={render} container={container} key={id} />
        ))}
      </>
    );
  }
}

export default class PortalRenderer extends React.Component<
  { portalProviderAPI: PortalProviderAPI },
  PortalRendererState
> {
  constructor(props: { portalProviderAPI: PortalProviderAPI }) {
    super(props);
    props.portalProviderAPI.setContext(this);
    props.portalProviderAPI.on('new:bucket', this.handleNewBucket);
    this.state = { buckets: [] };
  }

  handleNewBucket = (id: string) => {
    this.setState(({ buckets }) => ({ buckets: [...buckets, id] }));
  };

  handleSubscribe = (
    id: string,
    handler: (portals: Portal[]) => void,
  ): Portal[] => {
    const { portalProviderAPI } = this.props;
    const bucket = this.props.portalProviderAPI.getBucketById(id);
    if (bucket) {
      portalProviderAPI.on(`update:bucket:${id}`, handler);
      return bucket.toArray();
    }
    return [];
  };

  render() {
    const { buckets } = this.state;
    return (
      <>
        {buckets.map(id => (
          <RenderBucket id={id} key={id} subscribe={this.handleSubscribe} />
        ))}
      </>
    );
  }
}
