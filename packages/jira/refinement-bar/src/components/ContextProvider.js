// @flow

import React from 'react';

import { cloneObj, objectMap } from '../utils';

export const RefinementBarContext = React.createContext();

export class RefinementBarConfig extends React.Component {
  static defaultProps = {
    fields: {},
    initialValues: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.values && props.values !== state.values) {
      return { values: props.values };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { fields, initialValues, values } = this.props;

    // initialize field controllers
    const initializedFields = objectMap(fields, (value, key) => {
      const Controller = value.type.controller;
      return new Controller({ key, ...value });
    });

    this.state = {
      fields: initializedFields,
      values: values !== undefined ? values : initialValues,
    };
  }

  // Value Interface
  addValue = add => {
    const values = cloneObj(this.state.values, { add });
    this.setState({ values });
  };
  removeValue = remove => {
    const values = cloneObj(this.state.values, { remove });
    this.setState({ values });
  };
  updateValue = add => {
    const values = cloneObj(this.state.values, { add });
    this.setState({ values });
  };

  render() {
    const addValue = this.props.addValue || this.addValue;
    const removeValue = this.props.removeValue || this.removeValue;
    const updateValue = this.props.updateValue || this.updateValue;
    const state = this.state;

    return (
      <RefinementBarContext.Provider
        value={{ addValue, removeValue, updateValue, state }}
      >
        {this.props.children}
      </RefinementBarContext.Provider>
    );
  }
}

export const RefinementBarConsumer = ({ children }) => (
  <RefinementBarContext.Consumer>
    {({ state }) => children(state.values)}
  </RefinementBarContext.Consumer>
);

// Required until atlaskit upgrades to react >= 16.6 😞
export const withRefinementBarContext = Component => props => (
  <RefinementBarContext.Consumer>
    {rbctx => <Component {...props} rbctx={rbctx} />}
  </RefinementBarContext.Consumer>
);
