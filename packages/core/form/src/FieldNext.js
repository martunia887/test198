// @flow
import React, { type Node } from 'react';
import * as Formik from 'formik';
import { ValidatorMessage } from './';
import FieldWrapper, {
  HelperText,
  Label,
  RequiredIndicator,
} from './styled/Field';

type Props = {
  children: ({ field: Object, form: Object }) => Node,
  isRequired?: boolean,
  label: Node,
  helperText?: Node,
  name: string,
  validate?: any => string | Promise<string>,
  validateOn?: 'both' | 'blur' | 'change',
};

const required = validator => value => {
  if (value === undefined || String(value).length === 0) {
    return 'This field is required';
  }
  return validator ? validator(value) : undefined;
};

const adapt = (validateOn, { field, form }) => {
  return {
    field: {
      ...field,
      onChange: (...args) => {
        field.onChange(...args);
        if (validateOn !== 'blur') {
          form.validateField(field.name);
        }
      },
      onBlur: (...args) => {
        field.onBlur(...args);
        if (validateOn !== 'changed') {
          form.validateField(field.name);
        }
      },
    },
    form,
  };
};

const Field = ({
  children,
  helperText,
  isRequired = false,
  label,
  name,
  validate = () => {},
  validateOn = 'both',
}: Props) => (
  <FieldWrapper>
    <Label htmlFor={name}>
      {label}
      {isRequired && (
        <RequiredIndicator role="presentation">*</RequiredIndicator>
      )}
    </Label>
    <Formik.Field
      name={name}
      id={name}
      validate={isRequired ? required(validate) : validate}
    >
      {args => children(adapt(validateOn, args))}
    </Formik.Field>
    {helperText && <HelperText>{helperText}</HelperText>}
    <Formik.ErrorMessage name={name}>
      {message => <ValidatorMessage isInvalid invalidMessage={message} />}
    </Formik.ErrorMessage>
  </FieldWrapper>
);

export default Field;
