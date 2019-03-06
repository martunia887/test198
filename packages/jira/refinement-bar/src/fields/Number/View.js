// @flow

import React, { Fragment } from 'react';
import Input from '@atlaskit/textfield';

import { Note } from '../../components/common';
import { Group, Radio } from '../../components/InputGroup';
import { DialogInner } from '../../components/Popup';
import { isObject, isEmptyString, objectMap } from '../../utils';

type Props = {
  storedValue: Object,
  field: Object,
  invalidMessage: Object,
  onChange: (*) => void,
};
type State = {
  single: string,
  type: string,
  gt: string,
  lt: string,
};

const getInitialState = (storedValue: *) => {
  const { type, value } = storedValue;
  const base = { gt: '', lt: '', type, single: '' };

  return typeof value === 'number'
    ? { ...base, single: value }
    : { ...base, ...value };
};

class NumberView extends React.Component<Props, State> {
  state = getInitialState(this.props.storedValue);
  nextInputRef = React.createRef();
  componentDidMount() {
    this.focusNextInput();
  }

  get isBetween() {
    return this.state.type === 'between';
  }
  get filterTypes() {
    return this.props.field.getFilterTypes();
  }

  handleSubmit = (e: *) => {
    e.preventDefault();
    if (this.props.invalidMessage) return;

    if (typeof this.props.closePopup === 'function') {
      this.props.closePopup(); // HACK? (imperative)
    }
  };
  onChangeCheckbox = ({ target }: *) => {
    const { onChange } = this.props;
    const type = target.value;

    this.setState({ type }, () => {
      // avoid creating an invalid state where '' === NaN
      if (isEmptyString(this.state.single)) {
        return;
      }

      this.focusNextInput();

      const { gt, lt } = this.state;
      const value = this.isBetween
        ? makeValue({ gt, lt })
        : makeValue(this.state.single);
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
  // NOTE: resist the urge to use `autoFocus` on the text input; it will break
  // programmatic focus used elsewhere
  focusNextInput = () => {
    const el = this.nextInputRef.current;

    if (el && typeof el.focus === 'function') {
      // wait for the focus trap (Popup) to grab the node that envoked the
      // dialog, before assigning focus within
      setTimeout(() => {
        el.focus();
      }, 10);
    }
  };

  render() {
    const { field, invalidMessage } = this.props;
    const { type } = this.state;
    const isInvalid = Boolean(invalidMessage);

    return (
      <DialogInner isPadded maxWidth={160}>
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
                      <InputRow>
                        <Input
                          ref={this.nextInputRef}
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
                      </InputRow>
                    ) : (
                      <Input
                        ref={this.nextInputRef}
                        isInvalid={isInvalid}
                        name="single"
                        onChange={this.onChangeInput}
                        type="number"
                        value={this.state.single}
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
      </DialogInner>
    );
  }
}

// ==============================
// Helpers
// ==============================

const makeValue = value => {
  if (isObject(value)) {
    // $FlowFixMe
    return objectMap(value, v => parseFloat(v)); // TODO: should this be `parseInt()`?
  }

  return parseFloat(value);
};

// ==============================
// Styled Components
// ==============================

const InputRow = ({ children, ...props }: *) => (
  <div
    {...props}
    style={{
      display: 'flex',
      marginLeft: -4,
      marginRight: -4,
    }}
  >
    {React.Children.map(children, c => (
      <div style={{ marginLeft: 4, marginRight: 4 }}>{c}</div>
    ))}
  </div>
);

export default NumberView;
