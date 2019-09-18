// @flow
/** @jsx jsx */

import React from 'react';
import memoizeOne from 'memoize-one';
import { jsx } from '@emotion/core';

import {
  SELECT_CLEAR_OPTION,
  BaseSelect,
  selectComponents,
} from '../../components/Select';
import { DialogInner } from '../../components/Popup';

import { getOptions } from '../Select/utils';

type State = {
  defaultOptions?: OptionsType,
  inputValue: string,
  isLoading: boolean,
  loadedInputValue?: string,
  loadedOptions: OptionsType,
};

export default class AsyncSelectView extends React.Component<
  AsyncProps,
  State,
> {
  constructor(props: AsyncProps) {
    super(props);

    const { field, storedValue } = props;

    this.state = {
      complexValue: field.toObjectValue(storedValue) || [],
      defaultOptions: defineDefaultOptions(field.defaultOptions),
      inputValue: field.inputValue !== undefined ? field.inputValue : '',
      isLoading: field.defaultOptions === true,
      loadedInputValue: '',
      loadedOptions: [],
      passEmptyOptions: false,
    };
  }

  static defaultProps = {
    cacheOptions: false,
    defaultOptions: false,
    filterOption: null,
  };

  lastRequest: {};

  mounted: boolean = false;

  optionsCache: { [string]: OptionsType } = {};

  componentDidMount() {
    this.mounted = true;

    const { field } = this.props;
    const { inputValue } = this.state;

    if (field.defaultOptions === true) {
      this.loadOptions(inputValue, options => {
        if (!this.mounted) return;

        this.setState({
          defaultOptions: options || [],
          isLoading: !!this.lastRequest,
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: C & AsyncProps) {
    // if the cacheOptions prop changes, clear the cache
    if (nextProps.field.cacheOptions !== this.props.field.cacheOptions) {
      this.optionsCache = {};
    }
    if (nextProps.field.defaultOptions !== this.props.field.defaultOptions) {
      this.setState({
        defaultOptions: defineDefaultOptions(nextProps.field.defaultOptions),
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadOptions(inputValue: string, callback: (?Array<*>) => void) {
    const { field } = this.props;

    if (!field.loadOptions) return callback();

    const loader = field.loadOptions(inputValue, callback);

    if (loader && typeof loader.then === 'function') {
      loader.then(callback, () => callback());
    }

    return undefined; // consistent return...
  }

  handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    const { field } = this.props;

    const inputValue = inputChangeHelper(
      newValue,
      actionMeta,
      field.onInputChange,
    );

    if (!inputValue) {
      delete this.lastRequest;

      this.setState({
        inputValue: '',
        isLoading: false,
        loadedInputValue: '',
        loadedOptions: [],
        passEmptyOptions: false,
      });

      return undefined;
    }

    if (field.cacheOptions && this.optionsCache[inputValue]) {
      this.setState({
        inputValue,
        isLoading: false,
        loadedInputValue: inputValue,
        loadedOptions: this.optionsCache[inputValue],
        passEmptyOptions: false,
      });
    } else {
      const request = {};

      this.lastRequest = request;

      this.setState(
        {
          inputValue,
          isLoading: true,
          passEmptyOptions: !this.state.loadedInputValue,
        },
        () => {
          this.loadOptions(inputValue, options => {
            if (!this.mounted) {
              return;
            }

            if (options) {
              this.optionsCache[inputValue] = options;
            }

            if (request !== this.lastRequest) {
              return;
            }

            delete this.lastRequest;

            this.setState({
              isLoading: false,
              loadedInputValue: inputValue,
              loadedOptions: options || [],
              passEmptyOptions: false,
            });
          });
        },
      );
    }

    return inputValue;
  };

  handleChange = (value: *) => {
    const { field, onChange } = this.props;

    if (value && value.includes(SELECT_CLEAR_OPTION)) {
      this.setState({ complexValue: [] });
      onChange([]);
    } else {
      this.setState({ complexValue: value });
      field.setOptions(value); // NOTE: the Controller needs access to the options to build the value label
      onChange(field.toStringValue(value));
    }
  };

  getOptionsOverTime = () => {
    const { field, storedValue } = this.props;
    const {
      complexValue,
      defaultOptions,
      inputValue,
      loadedInputValue,
      loadedOptions,
      passEmptyOptions,
    } = this.state;

    let options = defaultOptions || [];
    if (inputValue && loadedInputValue) options = loadedOptions;

    // NOTE: `getOptions` will "pin" selected options to the top of the list.
    // The value must be spread in before the other options here so the don't
    // reorder as the user types.
    return passEmptyOptions
      ? [] // react-select will render options if it has them, kill options to display the loading or no-results message
      : getOptions({
          options: loadedInputValue ? options : [...complexValue, ...options], // combine value and options when there's no input
          pluck: field.getOptionValue,
          selected: storedValue,
        });
  };

  render() {
    const { components, field, onChange, storedValue, ...props } = this.props;
    const { complexValue, isLoading } = this.state;

    return (
      <DialogInner minWidth={220}>
        <BaseSelect
          cacheOptions={field.cacheOptions}
          components={mergeComponents(components)}
          getOptionLabel={field.getOptionLabel}
          getOptionValue={field.getOptionValue}
          inputValue={field.inputValue}
          isLoading={isLoading}
          loadOptions={field.loadOptions}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onMenuScrollToBottom={field.onMenuScrollToBottom}
          onMenuScrollToTop={field.onMenuScrollToTop}
          options={this.getOptionsOverTime()}
          placeholder={field.placeholder}
          {...props}
          value={complexValue}
        />
      </DialogInner>
    );
  }
}

// Utils
// ------------------------------

function defineDefaultOptions(value) {
  return Array.isArray(value) ? value : undefined;
}

function inputChangeHelper(
  inputValue: string,
  actionMeta: InputActionMeta,
  onInputChange?: (string, InputActionMeta) => string | void,
) {
  if (onInputChange) {
    const newValue = onInputChange(inputValue, actionMeta);
    if (typeof newValue === 'string') return newValue;
  }

  return inputValue;
}

// Components
// ------------------------------

const mergeComponents = memoizeOne(consumerComponents => ({
  ...selectComponents,
  ...consumerComponents,
}));

// Types
// ------------------------------

type AsyncProps = {
  /*
    If cacheOptions is truthy, then the loaded data will be cached. The cache
    will remain until `cacheOptions` changes value.
  */
  cacheOptions: any,
  /*
    When true, the results for `loadOptions` will be loaded on mount. When
    array, the default set of options to show before the user starts searching.
  */
  defaultOptions: OptionsType | boolean,
  inputValue?: string,
  /*
    Function that returns a promise, which is the set of options to be used once
    the promise resolves.
  */
  loadOptions: (string, (OptionsType) => void) => Promise<*> | void,
  onInputChange: (string, InputActionMeta) => void,
};

type InputActionTypes =
  | 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close';

type InputActionMeta = {|
  action: InputActionTypes,
|};

type OptionsType = Array<Object>;
