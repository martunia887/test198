// @flow
import React, { PureComponent, Fragment } from 'react';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import Form, { Field, ErrorMessage, HelperMessage } from '../src';

const colors = [
  { label: 'blue', value: 'blue' },
  { label: 'red', value: 'red' },
  { label: 'purple', value: 'purple' },
  { label: 'black', value: 'black' },
  { label: 'white', value: 'white' },
  { label: 'gray', value: 'gray' },
  { label: 'yellow', value: 'yellow' },
  { label: 'orange', value: 'orange' },
  { label: 'teal', value: 'teal' },
  { label: 'dog', value: 'dog' },
];

const flavors = [
  { label: 'vanilla', value: 'vanilla' },
  { label: 'strawberry', value: 'strawberry' },
  { label: 'chocolate', value: 'chocolate' },
  { label: 'mango', value: 'mango' },
  { label: 'rum', value: 'rum' },
  { label: 'hazelnut', value: 'hazelnut' },
  { label: 'durian', value: 'durian' },
];
const validateOnSubmit = data => {
  let errors;
  errors = colorsValidation(data, errors);
  errors = flavorValidation(data, errors);
  console.log(errors);
  return errors;
};

const colorsValidation = (data, errors) => {
  if (data.colors) {
    return data.colors.value === 'dog'
      ? {
          ...errors,
          colors: `${data.colors.value} is not a color`,
        }
      : errors;
  }
  return errors;
};

const flavorValidation = (data, errors) => {
  if (data.icecream && data.icecream.length >= 3) {
    return {
      ...errors,
      icecream: `${
        data.icecream.length
      } is too many flavors, don't be greedy, you get to pick 2.`,
    };
  }

  return errors;
};

export default class extends PureComponent<*> {
  render() {
    return (
      <Form
        onSubmit={data => {
          console.log('form data', data);
          return Promise.resolve(validateOnSubmit(data));
        }}
      >
        {({ formProps }) => (
          <form {...formProps}>
            <Field name="colors" label="Select a colour">
              {({ fieldProps, error, meta }) => (
                <Fragment>
                  <Select
                    validationState={error ? 'error' : 'none'}
                    {...fieldProps}
                    options={colors}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </Fragment>
              )}
            </Field>
            <Field name="icecream" label="Select a flavor">
              {({ fieldProps, error, meta }) => (
                <Fragment>
                  <Select
                    validationState={error ? 'error' : 'none'}
                    {...fieldProps}
                    options={flavors}
                    isMulti
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </Fragment>
              )}
            </Field>
            <Button type="submit" appearance="primary">
              Submit Form
            </Button>
          </form>
        )}
      </Form>
    );
  }
}
