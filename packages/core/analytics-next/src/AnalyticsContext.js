// @flow

import React, { createContext, Component, type Node } from 'react';

type Props = {
  /** Children! */
  children: Node,
  /** Arbitrary data. Any events created below this component in the tree will
   * have this added as an item in their context array. */
  data: {},
};

const { Consumer: AnalyticsContextConsumer, Provider } = createContext(
  (): Object[] => [],
);

export { AnalyticsContextConsumer };

class AnalyticsContext extends Component<{
  ...Props,
  getParentContext: Function,
}> {
  static defaultProps = {
    getParentContext: () => [],
  };

  getAnalyticsContext = () => {
    return [...this.props.getParentContext(), this.props.data];
  };

  render() {
    return (
      <Provider value={this.getAnalyticsContext}>
        {this.props.children}
      </Provider>
    );
  }
}

export default (props: Props) => (
  <AnalyticsContextConsumer>
    {getParentContext => (
      <AnalyticsContext {...props} getParentContext={getParentContext} />
    )}
  </AnalyticsContextConsumer>
);
