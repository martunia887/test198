// @flow

import React, { Component, type ComponentType, type Node } from 'react';

import { cloneObj, objectMap } from '../utils';

export const RefinementBarContext = React.createContext({});

type ValueType = {
  label: string,
  type: ComponentType<*>,
};
type FieldsType = { [key: string]: ValueType };

type ConfigProps = {
  children: Node,
  fields: FieldsType,
  initialValues: Object,
  values: Object,

  addValue?: (*) => void,
  removeValue?: (*) => void,
  updateValue?: (*) => void,
};
type State = {
  fields: FieldsType,
  values: Object,
};

export class RefinementBarConfig extends Component<ConfigProps, State> {
  static defaultProps = {
    fields: {},
    initialValues: {},
  };

  static getDerivedStateFromProps(props: ConfigProps, state: State) {
    if (props.values && props.values !== state.values) {
      return { values: props.values };
    }

    return null;
  }

  constructor(props: ConfigProps) {
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
  addValue = (add: Object) => {
    const values = cloneObj(this.state.values, { add });
    this.setState({ values });
  };
  removeValue = (remove: string) => {
    const values = cloneObj(this.state.values, { remove });
    this.setState({ values });
  };
  updateValue = (add: Object) => {
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

type consumerProps = {
  children: Object => Node,
};
export const RefinementBarConsumer = ({ children }: consumerProps) => (
  <RefinementBarContext.Consumer>
    {({ state }) => children(state.values)}
  </RefinementBarContext.Consumer>
);

// Required until atlaskit upgrades to react >= 16.6 😞
export const withRefinementBarContext = (Comp: ComponentType<*>) => (
  props: *,
) => (
  <RefinementBarContext.Consumer>
    {rbctx => <Comp {...props} rbctx={rbctx} />}
  </RefinementBarContext.Consumer>
);
