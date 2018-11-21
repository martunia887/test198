// @flow
import React, { type Node } from 'react';
import { type FormApi } from 'final-form';
import { FormContext } from './Form';
import FieldWrapper, { Label, RequiredIndicator } from './styled/Field';
import translateEvent from './utils/translateEvent';

type FieldProps = {
  isRequired: boolean,
  isInvalid: boolean,
  onChange: any => any,
  onBlur: () => any,
  onFocus: () => any,
  value: any,
};

type Meta = {
  dirty: boolean,
  touched: boolean,
  valid: boolean,
  error: any,
  submitError: any,
};

type Props = {
  /* Children to render in the field. Called with form information. */
  children: ({ fieldProps: FieldProps, error: any, meta: Meta }) => Node,
  /* Whether the field is required for submission */
  isRequired?: boolean,
  /* Label displayed above the field */
  label?: Node,
  /* The name of the field */
  name: string,
  /* Ignore this prop. It gets set internally from context. */
  register: $PropertyType<FormApi, 'registerField'>,
  /* validates the current value of field */
  validate?: any => string | void | Promise<string | void>,
};

type State = {
  onChange: any => any,
  onBlur: () => any,
  onFocus: () => any,
  dirty: boolean,
  touched: boolean,
  valid: boolean,
  value: any,
  error: any,
  submitError: any,
  registered: boolean,
};

class FieldInner extends React.Component<Props, State> {
  unregister = () => {};
  state = {
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    dirty: false,
    touched: false,
    valid: true,
    value: undefined,
    error: undefined,
    submitError: undefined,
    registered: false,
  };

  componentDidMount() {
    const { name, register, isRequired, validate } = this.props;
    this.unregister = register(
      name,
      ({
        change,
        blur,
        focus,
        dirty,
        touched,
        valid,
        value,
        error,
        submitError,
      }) => {
        this.setState({
          registered: true,
          onChange: translateEvent(change),
          onBlur: blur,
          onFocus: focus,
          dirty,
          touched,
          valid,
          value,
          error,
          submitError,
        });
      },
      {
        dirty: true,
        touched: true,
        valid: true,
        value: true,
        error: true,
        submitError: true,
      },
      {
        getValidator: () => validate,
      },
    );
  }

  componentWillUnmount() {
    this.unregister();
  }

  render() {
    const { children, isRequired, label, name } = this.props;
    const {
      registered,
      onChange,
      onBlur,
      onFocus,
      value,
      ...rest
    } = this.state;
    const error =
      rest.submitError || ((rest.touched || rest.dirty) && rest.error);
    const fieldProps = {
      onChange,
      onBlur,
      onFocus,
      value,
      name,
      isInvalid: Boolean(error),
      isRequired: Boolean(isRequired),
    };
    return (
      <FieldWrapper>
        <Label htmlFor={name}>
          {label}
          {isRequired && (
            <RequiredIndicator role="presentation">*</RequiredIndicator>
          )}
        </Label>
        {registered && children({ fieldProps, error, meta: rest })}
      </FieldWrapper>
    );
  }
}

// Make it easier to reference context value in lifecycle methods
const Field = (props: Props) => (
  <FormContext.Consumer>
    {form => form && <FieldInner {...props} register={form.registerField} />}
  </FormContext.Consumer>
);

Field.defaultProps = {
  defaultValue: undefined,
  register: () => () => {},
};

export default Field;
