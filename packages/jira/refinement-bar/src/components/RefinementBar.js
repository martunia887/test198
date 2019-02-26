// @flow
/** @jsx jsx */

import { Component, Children } from 'react';
import { jsx } from '@emotion/core';
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';
import { CheckboxOption, PopupSelect } from '@atlaskit/select';

import { withRefinementBarContext } from './ContextProvider';
import { cloneObj } from '../utils';

// ==============================
// Styled Components
// ==============================

const Group = ({ children }: *) => {
  const childArray = Children.toArray(children).filter(Boolean); // filter out null and undefined children
  return (
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: -4,
        marginRight: -4,
      }}
    >
      {childArray.map((child, idx) => (
        <div css={{ margin: 4 }} key={child.key || idx}>
          {child}
        </div>
      ))}
    </div>
  );
};

// Maintain the value state in this class until it is "committed" to context
// where it's broadcast to any subscribers.

type Props = {
  initialAvailable: Array<string>,
  initialSelected: Array<string>,
  constant: Array<string>,
  invalid: Object,
  rbctx: Object,
};
type State = {
  available: Array<string>,
  constant: Array<string>,
  invalid: Object,
  selected: Array<string>,
  selectedIsExpanded: boolean,
  values: Object,
};

class ActualRefinementBar extends Component<Props, State> {
  static defaultProps = {
    available: [],
    constant: [],
    invalid: {},
    selected: [],
  };

  constructor(props: Props) {
    super(props);
    const {
      initialAvailable,
      initialSelected,
      constant,
      invalid,
      rbctx,
    } = props;
    const { values } = rbctx.state;

    this.state = {
      available: initialAvailable,
      constant,
      invalid,
      selected: initialSelected,
      selectedIsExpanded: true,
      values,
    };
  }
  handleFieldRemove = (key: string) => (event: *) => {
    event.preventDefault();

    // remove the key from values
    const values = { ...this.state.values };
    delete values[key];

    // remove the key from the selected list
    const selected = this.state.selected.filter(k => k !== key);

    // update local state and context
    this.setState({ values, selected }, () => {
      this.props.rbctx.removeValue(key);
    });
  };
  handleFieldChange = (key: string) => (value: *) => {
    const { fields } = this.props.rbctx.state;
    const oldInvalid = this.state.invalid;
    const values = {
      ...this.state.values,
      [key]: value,
    };

    const field = fields[key];
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
    // don't commit changes to context if there's invalid keys
    if (this.state.invalid[key]) {
      return;
    }

    this.props.rbctx.updateValue(this.state.values);
  };

  makeField = (listProps: *) => (key: string) => {
    const { fields } = this.props.rbctx.state;
    const { type, ...field } = fields[key];
    const Field = type.view;
    const currentValue =
      this.props.rbctx.state.values[key] || field.getInitialValue();
    const value =
      this.state.values[key] === undefined
        ? field.getInitialValue()
        : this.state.values[key];

    const invalidMessage = this.state.invalid[key];

    return (
      <Field
        applyChanges={this.handleFieldSubmit(key)}
        currentValue={currentValue}
        currentValues={this.props.rbctx.state.values}
        invalidMessage={invalidMessage}
        field={field}
        key={key}
        onChange={this.handleFieldChange(key)}
        onRemove={this.handleFieldRemove(key)}
        value={value}
        {...listProps}
      />
    );
  };
  onChangeFilter = (options: *) => {
    const selected = options.map(o => o.value);
    this.setState({ selected });
  };
  toggleSelectedVisibility = () => {
    this.setState(s => ({
      selectedIsExpanded: !s.selectedIsExpanded,
    }));
  };

  render() {
    const { fields } = this.props.rbctx.state;
    const { available, constant, selected, selectedIsExpanded } = this.state;

    return (
      <Group>
        {constant.map(
          this.makeField({
            isRemovable: false,
          }),
        )}
        {selectedIsExpanded
          ? selected.map(
              this.makeField({
                isRemovable: true,
              }),
            )
          : null}

        {/* Add Filter Popup */}
        <PopupSelect
          isMulti
          options={available.map(key => {
            const field = fields[key];
            return {
              label: field.label || key,
              value: key,
              type: field.type,
            };
          })}
          value={selected.map(key => {
            const field = fields[key];
            return {
              label: field.label || key,
              value: key,
            };
          })}
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
        {selected.length ? (
          <Button
            appearance="subtle-link"
            onClick={this.toggleSelectedVisibility}
            iconAfter={
              selectedIsExpanded ? null : (
                <Badge appearance="important">{selected.length}</Badge>
              )
            }
          >
            Show {selectedIsExpanded ? 'Less' : 'More'}
          </Button>
        ) : null}
      </Group>
    );
  }
}

export const RefinementBar = withRefinementBarContext(ActualRefinementBar);
