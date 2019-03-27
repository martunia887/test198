// @flow

import React, { Component, type ComponentType, type Node } from 'react';

import { diffArr, objectMap } from '../utils';

export const RefinementBarContext = React.createContext({});

type FieldType = {
  label: string,
  type: ComponentType<*>,
};
type FieldConfigType = { [key: string]: FieldType };
type Keys = Array<string>;
type Meta = {
  type: 'add' | 'remove' | 'update',
  key: string,
  data?: any,
};

type ConfigProps = {
  children?: Node,
  fieldConfig: FieldConfigType,
  irremovableKeys: Keys,
  onChange: (value: Object, meta: Meta) => void,
  value: Object,
};
type State = {
  fieldConfig: FieldConfigType,
};

export class RefinementBarProvider extends Component<ConfigProps, State> {
  static defaultProps = {
    irremovableKeys: [],
  };
  constructor(props: ConfigProps) {
    super(props);
    const { fieldConfig } = this.props;

    const initializedFields = objectMap(fieldConfig, (field, key) => {
      const Controller = field.type.controller;
      return new Controller({ key, ...field });
    });

    this.state = {
      fieldConfig: initializedFields,
    };
  }

  get removeableKeys() {
    const all = Object.keys(this.props.fieldConfig);
    const irremovable = this.props.irremovableKeys;
    return diffArr(all, irremovable);
  }

  get selectedKeys() {
    const values = Object.keys(this.props.value);
    const irremovable = this.props.irremovableKeys;
    return diffArr(values, irremovable);
  }

  render() {
    const context = {
      fieldConfig: this.state.fieldConfig,
      irremovableKeys: this.props.irremovableKeys,
      onChange: this.props.onChange,
      removeableKeys: this.removeableKeys,
      selectedKeys: this.selectedKeys,
      value: this.props.value,
    };

    return (
      <RefinementBarContext.Provider value={context}>
        {this.props.children}
      </RefinementBarContext.Provider>
    );
  }
}

export const RefinementBarConsumer = ({
  children,
}: {
  children: Object => Node,
}) => (
  <RefinementBarContext.Consumer>
    {ctx => children(ctx)}
  </RefinementBarContext.Consumer>
);

// Required until atlaskit upgrades to react >= 16.6 😞
export const withRefinementBarContext = (Comp: ComponentType<*>) => (
  props: *,
) => (
  <RefinementBarContext.Consumer>
    {c => <Comp {...props} tempContextFromProps={c} />}
  </RefinementBarContext.Consumer>
);
