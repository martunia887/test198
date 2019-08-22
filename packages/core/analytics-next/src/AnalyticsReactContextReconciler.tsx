import React, { Component, FC } from 'react';
import PropTypes from 'prop-types';
import { AnalyticsReactContext } from './AnalyticsReactContext';

type Props = {
  children?: React.ReactNode;
  getAtlaskitAnalyticsEventHandlers(): any[];
  getAtlaskitAnalyticsContext(): any[];
};

type OuterProps = {
  children?: React.ReactNode;
};

const ContextTypes = {
  getAtlaskitAnalyticsEventHandlers: PropTypes.func,
  getAtlaskitAnalyticsContext: PropTypes.func,
};

class AnalyticsReactContextReconcilerInner extends Component<Props> {
  static contextTypes = ContextTypes;
  static childContextTypes = ContextTypes;

  getChildContext = () => {
    const {
      getAtlaskitAnalyticsEventHandlers,
      getAtlaskitAnalyticsContext,
    } = this.props;
    return {
      getAtlaskitAnalyticsEventHandlers,
      getAtlaskitAnalyticsContext,
    };
  };

  render() {
    const {
      getAtlaskitAnalyticsEventHandlers,
      getAtlaskitAnalyticsContext,
      children,
    } = this.props;
    return (
      <AnalyticsReactContext.Provider
        value={{
          getAtlaskitAnalyticsContext,
          getAtlaskitAnalyticsEventHandlers,
        }}
      >
        {children}
      </AnalyticsReactContext.Provider>
    );
  }
}

export const AnalyticsReactContextReconciler: FC<OuterProps> = ({
  children,
}) => (
  <AnalyticsReactContext.Consumer>
    {({ getAtlaskitAnalyticsEventHandlers, getAtlaskitAnalyticsContext }) => (
      <AnalyticsReactContextReconcilerInner
        getAtlaskitAnalyticsEventHandlers={getAtlaskitAnalyticsEventHandlers}
        getAtlaskitAnalyticsContext={getAtlaskitAnalyticsContext}
      >
        {children}
      </AnalyticsReactContextReconcilerInner>
    )}
  </AnalyticsReactContext.Consumer>
);
