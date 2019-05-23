import React, { Component, Fragment } from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import { AsyncCreatableSelect as AsyncCreatable } from '../src';

import { cities } from './common/data';

interface State {
  allowCreateWhileLoading: boolean;
  options: Array<any>;
  [key: string]: any;
}

const createOption = (inputValue: string) => ({
  label: inputValue,
  value: inputValue.toLowerCase().replace(/\W/g, ''),
});

export default class AsyncCreatableExample extends Component<{}, State> {
  state = {
    allowCreateWhileLoading: false,
    options: cities,
  };

  handleCreateOption = (inputValue: string) => {
    console.log('handleCreateOption here');
    this.setState({
      options: [createOption(inputValue), ...this.state.options],
    });
  };

  // you control how the options are filtered
  filterOptions = (inputValue: string) => {
    return this.state.options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  // async load function using callback (promises also supported)
  loadOptions = (
    inputValue: string,
    callback: (value: Array<any> | undefined) => void,
  ) => {
    setTimeout(() => {
      callback(this.filterOptions(inputValue));
    }, 1000);
  };

  toggleValue = ({ value }: { value: string }) => {
    this.setState(state => ({ ...state, [value]: !state[value] }));
  };

  render() {
    const { allowCreateWhileLoading } = this.state;
    return (
      <Fragment>
        <AsyncCreatable
          loadOptions={this.loadOptions}
          allowCreateWhileLoading={allowCreateWhileLoading}
          onCreateOption={this.handleCreateOption}
          placeholder="Choose a City"
        />
        <Checkbox
          value="allowCreateWhileLoading"
          label="Allow create while loading"
          name="allowCreateWhileLoading"
          onChange={this.toggleValue}
        />
      </Fragment>
    );
  }
}
