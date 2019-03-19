export type PortalProviderProps = {
  render: (
    portalProviderAPI: PortalProviderAPI,
  ) => React.ReactChild | JSX.Element | null;
};

export type RenderFunction = () => React.ReactChild | JSX.Element | null;
export type Portal = {
  id: string;
  render: RenderFunction;
  container: HTMLElement;
};
export type Portals = Map<string, Portal>;

export type PortalRendererState = {
  buckets: string[];
};
