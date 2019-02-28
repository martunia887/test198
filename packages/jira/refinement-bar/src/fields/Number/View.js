// @flow

import React, { Fragment } from 'react';
import Input from '@atlaskit/textfield';

import Dropdown from '../../components/Dropdown';
import { FilterButton } from '../../components/FilterButton';
import { Group, Note, Radio } from '../../components/InputGroup';
import { isObject, isEmptyString, objectMap } from '../../utils';

type Props = {
  applyChanges: () => void,
  storedValue: Object,
  field: Object,
  invalidMessage: Object,
  isRemovable: boolean,
  onChange: (*) => void,
  onRemove: (*) => void,
};
type State = {
  value: string,
  type: string,
  gt: string,
  lt: string,
};

class NumberView extends React.Component<Props, State> {
  state = { ...this.props.storedValue, gt: '', lt: '' };
  dropdownRef = React.createRef();
  get isBetween() {
    return this.state.type === 'between';
  }
  handleSubmit = (e: *) => {
    e.preventDefault();
    if (this.props.invalidMessage) return;
    if (this.dropdownRef.current) {
      this.dropdownRef.current.close();
    }
  };

  onChangeCheckbox = ({ target }: *) => {
    const { onChange } = this.props;
    const type = target.value;

    this.setState({ type }, () => {
      // avoid creating an invalid state where '' === NaN
      if (isEmptyString(this.state.value)) {
        return;
      }

      const { gt, lt } = this.state;
      const value = this.isBetween
        ? makeValue({ gt, lt })
        : makeValue(this.state.value);
      onChange({ type, value });
    });
  };

  onChangeInput = ({ target: { name, value: val } }: *) => {
    const { onChange } = this.props;
    const { type } = this.state;

    this.setState({ [name]: val }, () => {
      const { gt, lt } = this.state;
      const value = this.isBetween ? makeValue({ gt, lt }) : makeValue(val);
      onChange({ type, value });
    });
  };

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
            isInvalid={isInvalid}
            isRemovable={isRemovable}
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
                      {m.type === 'between' ? (
                        <Row>
                          <Input
                            autoFocus
                            name="gt"
                            isInvalid={isInvalid}
                            onChange={this.onChangeInput}
                            type="number"
                            value={this.state.gt}
                          />
                          <Input
                            name="lt"
                            isInvalid={isInvalid}
                            onChange={this.onChangeInput}
                            type="number"
                            value={this.state.lt}
                          />
                        </Row>
                      ) : (
                        <Input
                          autoFocus
                          isInvalid={isInvalid}
                          name="value"
                          onChange={this.onChangeInput}
                          type="number"
                          value={this.state.value}
                        />
                      )}
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

// ==============================
// Helpers
// ==============================

const makeValue = value => {
  if (isObject(value)) {
    // $FlowFixMe
    return objectMap(value, v => parseFloat(v));
  }

  return parseFloat(value);
};

// ==============================
// Styled Components
// ==============================

const Row = ({ children, ...props }: *) => (
  <div {...props} style={{ display: 'flex', marginLeft: -4, marginRight: -4 }}>
    {React.Children.map(children, c => (
      <div style={{ marginLeft: 4, marginRight: 4 }}>{c}</div>
    ))}
  </div>
);

export default NumberView;
