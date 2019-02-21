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

class ActualRefinementBar extends Component {
  static defaultProps = {
    available: [],
    constant: [],
    invalid: {},
    selected: [],
  };

  constructor(props) {
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
  handleFieldRemove = key => event => {
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
  handleFieldChange = key => value => {
    const { fields } = this.props.rbctx.state;
    const oldInvalid = this.state.invalid;
    const values = {
      ...this.state.values,
      [key]: value,
    };

    const field = fields[key];
    const { message, isInvalid } = field.validateValue(value);
    const invalid = isInvalid
      ? cloneObj(oldInvalid, { add: { [key]: message } })
      : oldInvalid[key]
      ? cloneObj(oldInvalid, { remove: key })
      : oldInvalid;

    this.setState({ invalid, values });
  };
  handleFieldSubmit = key => () => {
    // don't commit changes to context if there's invalid keys
    if (this.state.invalid[key]) {
      return;
    }

    this.props.rbctx.updateValue(this.state.values);
  };

  makeField = listProps => key => {
    const { fields } = this.props.rbctx.state;
    const { type, ...field } = fields[key];
    const Field = type.view;
    const currentValue =
      this.props.rbctx.state.values[key] || field.getInitialValue();

    const invalidMessage = this.state.invalid[key]; // message

    return (
      <Field
        applyChanges={this.handleFieldSubmit(key)}
        currentValue={currentValue}
        currentValues={this.props.rbctx.state.values}
        invalidMessage={invalidMessage}
        field={field} // label, loadOptions
        key={key}
        onChange={this.handleFieldChange(key)}
        onRemove={this.handleFieldRemove(key)}
        value={this.state.values[key]}
        {...listProps}
      />
    );
  };
  onChangeFilter = options => {
    const selected = options.map(o => o.value);
    this.setState({ selected });
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
              innerRef={ref}
              appearance="link"
              iconBefore={<AddIcon />}
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
            onClick={() =>
              this.setState(s => ({
                selectedIsExpanded: !s.selectedIsExpanded,
              }))
            }
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
