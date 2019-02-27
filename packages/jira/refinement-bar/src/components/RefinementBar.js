// @flow
/** @jsx jsx */

import { Component, Children } from 'react';
import { jsx } from '@emotion/core';
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';
import { CheckboxOption, PopupSelect } from '@atlaskit/select';

import {
  RefinementBarProvider,
  withRefinementBarContext,
} from './ContextProvider';
import { cloneObj } from '../utils';

type Props = {
  tempContextFromProps: Object,
};
type State = {
  invalid: Object,
  isExpanded: boolean,
  values: Object,
};

class ActualRefinementBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.ctx = props.tempContextFromProps;

    this.state = {
      invalid: {},
      isExpanded: true,
      values: this.ctx.value,
    };
  }

  componentDidMount() {
    // TODO: irremovable field values
    this.ctx.irremovableKeys.forEach(key => {
      this.handleFieldAdd(key);
    });
  }

  // Required until atlaskit upgrades to react >= 16.6 😞
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.ctx = nextProps.tempContextFromProps;
  }
  handleFieldAdd = async (key: string) => {
    const field = await this.ctx.fieldConfig[key];
    const data = field.getInitialValue();
    const meta = { action: 'add', key, data };
    const values = cloneObj(this.state.values, { add: { [key]: data } });

    this.setState({ values }, () => {
      this.ctx.onChange(values, meta);
    });
  };
  handleFieldRemove = (key: string, event?: Event) => {
    if (event) {
      event.preventDefault();
    }

    const values = cloneObj(this.state.values, { remove: key });

    this.setState({ values }, () => {
      this.ctx.onChange(values, { action: 'remove', key });
    });
  };
  handleFieldChange = (key: string) => (value: *) => {
    const { fieldConfig } = this.ctx;
    const oldInvalid = this.state.invalid;
    const values = {
      ...this.state.values,
      [key]: value,
    };

    const field = fieldConfig[key];
    const { message, isInvalid } = field.validateValue(value);

    let invalid = oldInvalid;

    if (isInvalid) {
      invalid = cloneObj(oldInvalid, { add: { [key]: message } });
    } else if (oldInvalid[key]) {
      invalid = cloneObj(oldInvalid, { remove: key });
    }

    this.setState({ invalid, values });
  };
  handleFieldSubmit = (key: string) => () => {
    const { invalid, values } = this.state;

    // don't commit changes to context if there's invalid keys
    if (invalid[key]) {
      return;
    }

    const data = values[key];
    const meta = { action: 'update', key, data };

    this.ctx.onChange(values, meta);
  };

  // TODO: memoize this method; it gets called too often!
  makeField = (config: Object) => (key: string) => {
    const { type, ...field } = this.ctx.fieldConfig[key];
    const Field = type.view;
    const storedValue = this.ctx.value[key];
    const value = this.state.values[key];
    const invalidMessage = this.state.invalid[key];

    // this shouldn't be possible, but better to be safe
    if (!Field) {
      throw new Error(
        `There's something wrong with the renderer (${type.type}) for ${key}.`,
      );
    }

    // wait for values to safely render the field
    if (storedValue == null || value == null) {
      return null;
    }

    return (
      <Field
        applyChanges={this.handleFieldSubmit(key)}
        storedValue={storedValue}
        refinementBarValue={this.ctx.value}
        invalidMessage={invalidMessage}
        field={field}
        key={key}
        onChange={this.handleFieldChange(key)}
        onRemove={event => this.handleFieldRemove(key, event)}
        value={value}
        {...config}
      />
    );
  };
  onChangeFilter = (options: *, meta) => {
    switch (meta.action) {
      case 'select-option':
        this.handleFieldAdd(meta.option.value);
        break;
      case 'deselect-option':
        this.handleFieldRemove(meta.option.value);
        break;
      default:
    }
  };
  toggleSelectedVisibility = () => {
    this.setState(s => ({
      isExpanded: !s.isExpanded,
    }));
  };

  mapKeyToOption = value => {
    const field = this.ctx.fieldConfig[value];
    const label = field.label || value;
    return { label, value };
  };

  render() {
    const { irremovableKeys, removeableKeys, selectedKeys } = this.ctx;
    const { isExpanded } = this.state;

    return (
      <Group>
        {irremovableKeys.map(this.makeField({ isRemovable: false }))}
        {isExpanded && selectedKeys.map(this.makeField({ isRemovable: true }))}

        {/* Add Filter Popup */}
        <PopupSelect
          isMulti
          options={removeableKeys.map(this.mapKeyToOption)}
          value={selectedKeys.map(this.mapKeyToOption)}
          onChange={this.onChangeFilter}
          components={{
            IndicatorSeparator: null,
            Option: CheckboxOption,
          }}
          searchThreshold={-1}
          closeMenuOnSelect={false} // TODO why isn't this respected?
          hideSelectedOptions={false}
          target={({ ref, isOpen }) => (
            <Button
              appearance="link"
              iconBefore={<AddIcon />}
              innerRef={ref}
              isSelected={isOpen}
            >
              Add Filter
            </Button>
          )}
        />

        {/* Show More/Less Control */}
        {selectedKeys.length ? (
          <Button
            appearance="subtle-link"
            onClick={this.toggleSelectedVisibility}
            iconAfter={
              isExpanded ? null : (
                <Badge appearance="important">{selectedKeys.length}</Badge>
              )
            }
          >
            Show {isExpanded ? 'Less' : 'More'}
          </Button>
        ) : null}
      </Group>
    );
  }
}

// ==============================
// Styled Components
// ==============================

const Group = ({ children }: *) => {
  const gutter = 4;
  const childArray = Children.toArray(children).filter(Boolean); // filter out null and undefined children
  return (
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        margin: -gutter,
      }}
    >
      {childArray.map((child, idx) => (
        <div css={{ margin: gutter }} key={child.key || idx}>
          {child}
        </div>
      ))}
    </div>
  );
};

// ==============================
// Main Export
// ==============================

export const RefinementBarUI = withRefinementBarContext(ActualRefinementBar);

// ==============================
// Put it together
// ==============================

export const RefinementBar = props => (
  <RefinementBarProvider {...props}>
    <RefinementBarUI />
  </RefinementBarProvider>
);
