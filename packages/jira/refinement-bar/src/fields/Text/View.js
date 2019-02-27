// @flow

import React, { Fragment } from 'react';
import Input from '@atlaskit/textfield';

import Dropdown from '../../components/Dropdown';
import { FilterButton } from '../../components/FilterButton';
import { Group, Note, Radio } from '../../components/InputGroup';

type Props = {
  applyChanges: (*) => void,
  storedValue: Object,
  field: Object,
  invalidMessage: string,
  isRemovable: boolean,
  onChange: (*) => void,
  onRemove: (*) => void,
};
type State = {
  type: string,
  value: string,
};

class TextView extends React.Component<Props, State> {
  state = this.props.storedValue;
  dropdownRef = React.createRef();
  handleSubmit = (e: *) => {
    e.preventDefault();
    if (this.props.invalidMessage) return;
    if (this.dropdownRef.current) {
      this.dropdownRef.current.close(); // HACK? (imperative)
    }
  };

  onChangeCheckbox = ({ target }: *) => {
    const { onChange } = this.props;
    const type = target.value;

    this.setState({ type });
    const value = type === 'is_not_set' ? null : this.state.value;
    onChange({ type, value });
  };

  onChangeInput = ({ target }: *) => {
    const { onChange } = this.props;
    const { type } = this.state;

    this.setState({ value: target.value });
    const value = type === 'is_not_set' ? null : target.value;
    onChange({ type, value });
  };

  // TODO: Move to field controller???
  get filterTypes() {
    return this.props.field.getFilterTypes();
  }
  render() {
    const {
      applyChanges,
      storedValue,
      field,
      invalidMessage,
      isRemovable,
      onRemove,
    } = this.props;
    const { type } = this.state;
    const isInvalid = Boolean(invalidMessage);

    return (
      <Dropdown
        allowClose={!isInvalid}
        ref={this.dropdownRef}
        onClose={applyChanges}
        target={({ isOpen, onClick, ref }) => (
          <FilterButton
            field={field}
            isRemovable={isRemovable}
            isInvalid={isInvalid}
            isSelected={isOpen}
            onClick={onClick}
            onRemove={onRemove}
            ref={ref}
            value={storedValue.value}
          >
            {field.formatFilter(storedValue)}
          </FilterButton>
        )}
      >
        <>
          <Group onSubmit={this.handleSubmit}>
            {this.filterTypes.map(m => {
              const isCurrent = m.type === type;
              return (
                <Fragment key={m.type}>
                  <Radio
                    checked={isCurrent}
                    name="mode"
                    onChange={this.onChangeCheckbox}
                    type="radio"
                    value={m.type}
                  >
                    {m.label}
                  </Radio>
                  {isCurrent && m.hasInput ? (
                    <>
                      <Input
                        autoFocus
                        isInvalid={isInvalid}
                        onChange={this.onChangeInput}
                        value={this.state.value}
                      />
                      {invalidMessage && <Note>{invalidMessage}</Note>}
                    </>
                  ) : null}
                </Fragment>
              );
            })}
          </Group>
          {field.note && <Note>{field.note}</Note>}
        </>
      </Dropdown>
    );
  }
}

export default TextView;
