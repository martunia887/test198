import * as React from 'react';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next/types';
import {
  createPortal,
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from 'react-dom';
import { EventDispatcher } from '../../event-dispatcher';
import {
  fireAnalyticsEvent,
  FireAnalyticsCallback,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
} from '../../plugins/analytics';

export type PortalProviderProps = {
  render: (
    portalProviderAPI: PortalProviderAPI,
  ) => React.ReactChild | JSX.Element | null;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
};

export type Portals = Map<HTMLElement, React.ReactChild>;

export type PortalRendererState = {
  portals: Portals;
};

type MountedPortal = {
  children: () => React.ReactChild | null;
  hasReactContext: boolean;
};

export class PortalProviderAPI extends EventDispatcher {
  portals: Map<HTMLElement, MountedPortal> = new Map();
  context: any;
  fireAnalyticsEvent: FireAnalyticsCallback;

  constructor(createAnalyticsEvent?: CreateUIAnalyticsEvent) {
    super();
    this.fireAnalyticsEvent = fireAnalyticsEvent(createAnalyticsEvent);
  }

  setContext = (context: any) => {
    this.context = context;
  };

  render(
    children: () => React.ReactChild | JSX.Element | null,
    container: HTMLElement,
    hasReactContext: boolean = false,
  ) {
    this.portals.set(container, { children, hasReactContext });
    unstable_renderSubtreeIntoContainer(
      this.context,
      children() as React.ReactElement<any>,
      container,
    );
  }

  // TODO: until https://product-fabric.atlassian.net/browse/ED-5013
  // we (unfortunately) need to re-render to pass down any updated context.
  // selectively do this for nodeviews that opt-in via `hasReactContext`
  forceUpdate() {
    this.portals.forEach((portal, container) => {
      if (!portal.hasReactContext) {
        return;
      }

      unstable_renderSubtreeIntoContainer(
        this.context,
        portal.children() as React.ReactElement<any>,
        container,
      );
    });
  }

  remove(container: HTMLElement) {
    this.portals.delete(container);

    // There is a race condition that can happen caused by Prosemirror vs React,
    // where Prosemirror removes the container from the DOM before React gets
    // around to removing the child from the container
    // This will throw a NotFoundError: The node to be removed is not a child of this node
    // Both Prosemirror and React remove the elements asynchronously, and in edge
    // cases Prosemirror beats React
    try {
      unmountComponentAtNode(container);
    } catch (error) {
      this.fireAnalyticsEvent({
        payload: {
          action: ACTION.FAILED_TO_UNMOUNT,
          actionSubject: ACTION_SUBJECT.EDITOR,
          actionSubjectId: ACTION_SUBJECT_ID.REACT_NODE_VIEW,
          attributes: {
            error,
            domNodes: {
              container: container ? container.className : undefined,
              child: container.firstElementChild
                ? container.firstElementChild.className
                : undefined,
            },
          },
          eventType: EVENT_TYPE.OPERATIONAL,
        },
      });
    }
  }
}

export class PortalProvider extends React.Component<PortalProviderProps> {
  portalProviderAPI: PortalProviderAPI;

  constructor(props: PortalProviderProps) {
    super(props);
    this.portalProviderAPI = new PortalProviderAPI(props.createAnalyticsEvent);
  }

  render() {
    return this.props.render(this.portalProviderAPI);
  }

  componentDidUpdate() {
    this.portalProviderAPI.forceUpdate();
  }
}

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

  handleUpdate = (portals: Portals) => this.setState({ portals });

  render() {
    const { portals } = this.state;
    return (
      <>
        {Array.from(portals.entries()).map(([container, children]) =>
          createPortal(children, container),
        )}
      </>
    );
  }
}
