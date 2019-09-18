// @flow
/** @jsx jsx */

import { Children, Fragment } from 'react';
import { jsx } from '@emotion/core';

import FieldController from '../Controller';

import { flattenByKey } from './utils';

type Options = Array<Object>;

const defaultGetOptionLabel = opt => opt.label;
const defaultGetOptionValue = opt => opt.value;

export default class SelectController extends FieldController {
  constructor(...args: *) {
    super(...args);

    this.getOptionLabel = this.config.getOptionLabel || defaultGetOptionLabel;
    this.getOptionValue = this.config.getOptionValue || defaultGetOptionValue;
    this.onMenuScrollToBottom = this.config.onMenuScrollToBottom;
    this.onMenuScrollToTop = this.config.onMenuScrollToTop;
    this.options = this.config.options || [];
    this.placeholder = this.config.placeholder;
  }

  getOptionValue: ?Function;

  options: Options;

  onMenuScrollToBottom: ?Function;

  onMenuScrollToTop: ?Function;

  placeholder: ?string;

  // used by async variant
  setOptions = (options: *) => {
    this.options = options;
  };

  hasValue = (value: *) => {
    return Array.isArray(value) && value.length > 0;
  };

  getInitialValue = () => {
    return [];
  };

  /*
    In: ['one', 'two']
    Out: [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }]
  */
  toObjectValue = value => {
    if (value === undefined) {
      return undefined;
    }
    if (!value.length) {
      return value;
    }

    const flattenedOptions = flattenByKey(this.options, 'options');
    const hasValue = opt => value.includes(this.getOptionValue(opt));

    return flattenedOptions.filter(hasValue);
  };

  /*
    In: [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }]
    Out: ['one', 'two']
  */
  toStringValue = value => {
    if (value === undefined) {
      return undefined;
    }
    if (!value.length) {
      return value;
    }

    return value.map(opt => this.getOptionValue(opt));
  };

  formatLabel = (stringValue: Array<Object>) => {
    // no value, just display the label
    if (!this.hasValue(stringValue)) return this.label;

    // build complex options
    const value = this.toObjectValue(stringValue);
    const max = 3;

    // create a comma separated list of values
    const valueLabels = value.map(opt => (
      <Crop>{this.getOptionLabel(opt)}</Crop>
    ));
    const valueLen = value.length;
    const afterElement =
      value.length > max ? <Crop> +{valueLen - max} more</Crop> : null;

    return (
      <Fragment>
        <strong>{this.label}: </strong>
        <Map after={afterElement} max={max}>
          {valueLabels}
        </Map>
      </Fragment>
    );
  };
}

// Styled Components
// ------------------------------

const Crop = props => (
  <span
    css={{
      marginLeft: '0.5ex', // circumvent spaces getting collapsed
      maxWidth: 180,
      minWidth: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
    {...props}
  />
);
const Map = ({ after, children, max }: *) => {
  const arr = Children.toArray(children).slice(0, max);

  return (
    <Fragment>
      {arr.map((label, idx) => (
        <Fragment>
          {idx ? ', ' : null}
          {label}
        </Fragment>
      ))}
      {after}
    </Fragment>
  );
};
